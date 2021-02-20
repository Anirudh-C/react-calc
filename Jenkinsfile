node {
  stage('Build') {
    def calculatorDev = docker.build("calculator:dev")
  }
  stage ('Test') {
    steps {
      calculatorDev.inside("--rm -v ${PWD}:/app -v /app/node_modules -p 3000:1234 calculator:dev") {
        sh 'npm run test'
      }
    }
  }
}
      
