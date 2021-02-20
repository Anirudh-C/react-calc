pipeline {
  agent {
    docker {
      image 'calculator:dev'
      args '-v ${PWD}:/app -v /app/node_modules -p 3000:1234'
    }
  }
  stages {
    stage('Test') {
      steps {
        sh './jenkins/test.sh'
      }
    }
  }
}

      
