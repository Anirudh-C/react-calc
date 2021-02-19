pipeline {
  stages {
    stage('Environment') {
      sh 'git --version'
      sh 'docker -v'
    }
    stage('Docker Build') {
      sh 'docker build -t calculator:dev --no-cache .'
    }
    stage('Calculator Tests') {
      sh 'docker run --rm -v ${PWD}:/app -v /app/node_modules calculator:dev'
    }
  }
}
