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
      steps {
        script {
          docker.build "calculator:dev"
        }
      }
    }
  }
}