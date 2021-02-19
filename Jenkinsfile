pipeline {
  agent {
    dockerfile {
      args '--rm --user $(id -u):$(id -g) -v ${PWD}:/app -v /app/node_modules'
    }
  }
  stages {
    stage('Test') {
      steps {
        sh 'npm run test'
      }
    }
  }
}
