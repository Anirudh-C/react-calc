pipeline {
  environment {
    CI = 'true'
    HOME = '.'
  }
  agent {
    dockerfile {
      args '-v ${PWD}:/app -v /app/node_modules -p 3000:1234'
    }
  }
  stages {
    stage ('Build') {
      steps {
        sh 'npm install'
      }
    }
    stage('Test') {
      steps {
        sh './scripts/test.sh'
      }
    }
  }
}

      
