pipeline {
  environment {
    CI = 'true'
    HOME = '.'
  }
  agent any
  stages {
    stage ('Build and Test') {
      steps {
        sh 'npm install'
        sh 'npm test'
      }
    }
    stage ('Build Container') {
      agent { dockerfile true }
      steps {
        script {
          def reactCalcImg = docker.build("calculator:dev")
        }
      }
    }
    stage ('Run Container') {
      agent any
      steps {
        sh 'docker run -it --rm -detach -p 3000:1234 calculator:dev'
      }
    }
  }
}