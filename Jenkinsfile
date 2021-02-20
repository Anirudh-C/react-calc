node {
  def calculatorDev
  stage('Build') {
    calculatorDev = docker.build("calculator:dev")
  }
  stage ('Test') {
    calculatorDev.inside("-v ${PWD}:/app -v /app/node_modules") {
      sh 'npm run test'
    }
  }
}
      
