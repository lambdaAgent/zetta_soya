WHAT TO DO AFTER CLONING
========================

Run these commands:

    npm install
    git submodule init
    git submodule update

RUNNING THE APP
===============

Run this command:

    npm run start


DEPLOYING TO TEST SERVER
========================

Go to this URL:

  http://jenkins.tvlk.dev:8080/job/tools-conn-fe/

Click "Build with Parameters" link on the left sidebar, and enter the revision
hash you wanted to build to `REV_ID`. Fill `ENVIRONMENT` with `staging` and
leave `PHID` empty. Run the job.

Upon completion, look at the logs and search for these strings:

  SERVICE_NAME IS: xxx
  BUILD_VERSION IS: jenkins-xx-xxxx

Go to release dashboard for test servers at:

  https://deploy.test.tvlk.cloud/

Select "Release Staging NodeJS" playbook and fill in SERVICE_NAME to service_name,
BUILD_VERSION to service_version, specify the host that you want to update. Run
the playbook.