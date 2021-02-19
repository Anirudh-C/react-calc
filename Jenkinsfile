pipeline {
  agent {
    dockerfile {
      additionalBuildArgs '-t calculator:dev'
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
