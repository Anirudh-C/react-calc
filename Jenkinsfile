pipeline {
  agent { dockerfile true }
  stages {
    stage('Environment') {
      steps {
        sh 'git --version'
        sh 'docker -v'
      }
    }
    stage('Docker Build') {
      steps {
        sh 'docker build -t calculator:dev --no-cache .'
      }
    }
    stage('Docker Test') {
      steps {
        sh 'docker run --rm -v ${PWD}:/app -v /app/node_modules calculator:dev'
      }
    }
  }
}
