#!/usr/bin/env groovy

properties([[$class: 'ParametersDefinitionProperty', parameterDefinitions: [[$class: 'StringParameterDefinition', defaultValue: '', description: '', name: 'REV_ID'],
        [$class: 'StringParameterDefinition', defaultValue: '', description: '', name: 'ENVIRONMENT'],
        [$class: 'StringParameterDefinition', defaultValue: '', description: '', name: 'PHID']]]])

node("nodejs-builder") {
    wrap([$class: 'TimestamperBuildWrapper']) {
        wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'XTerm', 'defaultFg': 1, 'defaultBg': 2]) {
            def pipeline
            try {
                def COMMIT_HASH
                def REVISION_ID
                def ENV

                stage('Checkout') {
                    REVISION_ID = REV_ID
                    checkout scm
                    sh "git checkout -f ${REVISION_ID}"
                    checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [[$class: 'RelativeTargetDirectory', relativeTargetDir: 'src/components/soya-component']], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'c34e9202-fe7b-4e52-8dce-93c59d2cd5cd', url: 'ssh://git@codereview.traveloka.com:2222/diffusion/SOYACOMP/soya-component.git']]])
                    sh "git submodule init"
                    sh "git submodule update"
                    pipeline = load 'pipeline.groovy'
                    COMMIT_HASH = pipeline.getCommitHash()
                }

                stage('Label') {
                    currentBuild.displayName = "jenkins-$env.BUILD_NUMBER-$COMMIT_HASH"
                    currentBuild.description = ""
                }

                stage('Build') {
                    ENV = ENVIRONMENT
                    pipeline.preBuild()
                    sh "ENVIRONMENT=${ENV} npm run build"
                    pipeline.postBuild()
                }

                stage('Archive') {
                    pipeline.archive(COMMIT_HASH, "toolsfe-conn-${ENV}")
                    withCredentials([[$class: 'StringBinding', credentialsId: 'PHAB_CONDUIT_API_TOKEN', variable: 'CONDUIT_TOKEN']]) {
                        pipeline.succeed(PHID)
                    }
                }
            } catch (Exception e) {
                throw e
                withCredentials([[$class: 'StringBinding', credentialsId: 'PHAB_CONDUIT_API_TOKEN', variable: 'CONDUIT_TOKEN']]) {
                    pipeline.failed(PHID)
                }
            }
        }
    }
}