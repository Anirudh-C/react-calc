pipeline {
  environment {
    calculatorImg = ''
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
          calculatorImg = docker.build "strangeloop1710/react-calc:latest"
        }
      }
    }
    stage ('Cleanup') {
      steps {
        sh './scripts/cleanup-docker.sh'
      }
    }
    stage ('Push Container') {
      steps {
        script {
          docker.withRegistry('', 'docker-hub-jenkins') {
            calculatorImg.push()
          }
        }
      }
    }
    stage ('Deploy Container') {
      steps {
        sh 'ansible-playbook -i ./deploy/hosts ./deploy/deploy-container.yml'
      }
    }
  }
}