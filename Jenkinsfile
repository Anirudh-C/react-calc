pipeline {
  environment {
    calculatorImg = ''
    SSH_CREDS = credentials('ssh-ansible-password')
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
        sh 'ansible-playbook -e \"ansible_ssh_pass=$SSH_CREDS\" -i ./deploy/hosts ./deploy/deploy-container.yml'
      }
    }
  }
}