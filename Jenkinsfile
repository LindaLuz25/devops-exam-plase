pipeline {
    agent any

    environment {
        ACTIVE_ENV = 'blue'
        TARGET = ''
    }

    stages {

        stage('Build') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Read state from a persistent file
                    def current = readFile('active_env.txt').trim()
                    env.TARGET = (current == 'blue') ? 'green' : 'blue'
                    
                    echo "Deploying to ${env.TARGET}..."
                    sh "docker compose up -d app-${env.TARGET}"
                }
            }
        }

        stage('Health Check') {
            steps {
                script {
                    def status = sh(
                        script: "curl -s http://app-${env.TARGET}:3000/health",
                        returnStatus: true
                    )
                    if (status != 0) {
                        error("Health check failed!")
                    }
                }
            }
        }

        stage('Switch Traffic') {
            steps {
                script {
                    sh "sed -i 's/app-${current}/app-${env.TARGET}/g' nginx/nginx.conf"
                    sh "docker compose restart nginx"
                    // Persist the new state
                    writeFile(file: 'active_env.txt', text: env.TARGET)
                }
            }
        }
    }

    post {
        failure {
            echo "Rollback: keeping ${env.ACTIVE_ENV}"
        }
    }
}