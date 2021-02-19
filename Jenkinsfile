pipeline {
    agent {
        docker { dockerfile true }
    }
    stages {
        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }
}