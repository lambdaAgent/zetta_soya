def getCommitHash() {
    sh "git rev-parse --short HEAD > .git/commit-id"
    def COMMIT_HASH = readFile('.git/commit-id').trim()
    return COMMIT_HASH
}

def preBuild() {
  sh "npm install"
}

def postBuild() {

}

def archive(COMMIT_HASH, S3_PREFIX) {
    def BUILD_VERSION = "jenkins-$env.BUILD_NUMBER-" + COMMIT_HASH
    def FILE_NAME = "${S3_PREFIX}-${BUILD_VERSION}"
    sh "tar -czvf ${FILE_NAME}" + ".tar.gz" +
       " build/" +
       " src/" +
       " config/" +
       " node_modules/" +
       " config.js" +
       " package.json" +
       " routes.yml" +
       " webpack.config.js"

    sh "pwd > artifact_path.tmp"
    def artifact_path = readFile('artifact_path.tmp').trim()
    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'traveloka-builds-credential-s3']]) {
       sh "aws s3 cp --sse AES256 \"" + artifact_path + "/${FILE_NAME}.tar.gz\" \"s3://traveloka-builds/$S3_PREFIX/bin/\""
    }
    sh "echo \"SERVICE_NAME IS: ${S3_PREFIX}\""
    sh "echo \"BUILD_VERSION IS: ${BUILD_VERSION}\""
}

def succeed(PHID) {
    if (PHID != '') {
        sh "curl https://codereview.traveloka.com/api/harbormaster.sendmessage -d api.token=$env.CONDUIT_TOKEN -d buildTargetPHID=$PHID -d type=pass"
    }
}

def failed(PHID) {
    if (PHID != '') {
        sh "curl https://codereview.traveloka.com/api/harbormaster.sendmessage -d api.token=$env.CONDUIT_TOKEN -d buildTargetPHID=$PHID -d type=fail"
    }
}

return this;