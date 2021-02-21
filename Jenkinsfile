pipeline {
  environment {
    calculatorImg = ''
    SSH_KEY = credentials('SSH_KEY_ANSIBLE')
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
        script {
          sh 'ansible-playbook --private-key ${SSH_KEY} -i ./deploy/hosts ./deploy/deploy-container.yml'
        }
      }
    }
  }
}