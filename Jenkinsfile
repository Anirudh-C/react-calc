pipeline {
  environment {
    CI = 'true'
  }
  agent {
    docker {
      image 'calculator:dev'
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
        sh './jenkins/test.sh'
      }
    }
  }
}

      
