pipeline {
  agent {
    dockerfile {
      args '--rm -v ${PWD}:/app -v /app/node_modules'
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
