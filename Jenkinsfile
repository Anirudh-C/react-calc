pipeline {
  environment {
    calculatorDev = ''
  }
  agent any
  stages {
    stage('Build') {
      steps {
        script {
          calculatorDev = docker.build "calculator:dev"
        }   
      }
    }
    stage ('Test') {
      steps {
        script {
          calculatorDev.withRun("-v ${PWD}:/app -v /app/node_modules -p 3000:1234") {
            sh 'npm run test'
          }
        }
      }
    }
  }
}
      
