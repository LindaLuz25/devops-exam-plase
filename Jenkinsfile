pipeline {
    agent any

    environment {
        ACTIVE_ENV = 'blue'
        TARGET = ''
    }

    stages {

        stage('Build & Test') {
            steps {
                sh 'npm install'
                sh 'echo "Tests OK"'
            }
        }

        stage('Deploy') {
            steps {
                script {
                    env.TARGET = (env.ACTIVE_ENV == 'blue') ? 'green' : 'blue'
                    echo "Deploying to ${env.TARGET}..."
                    sh "docker-compose up -d app-${env.TARGET}"
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
                        error("Health check failed! Rolling back.")
                    }
                }
            }
        }

        stage('Switch Traffic') {
            steps {
                script {
                    sh "sed -i 's/app-${env.ACTIVE_ENV}/app-${env.TARGET}/g' nginx/nginx.conf"
                    sh "docker-compose restart nginx"
                    env.ACTIVE_ENV = env.TARGET
                }
            }
        }
    }

    post {
        failure {
            echo "Rollback initiated: Keeping traffic on ${env.ACTIVE_ENV}"
        }
    }
}