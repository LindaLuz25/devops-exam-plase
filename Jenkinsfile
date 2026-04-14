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
                    env.TARGET = (env.ACTIVE_ENV == 'blue') ? 'green' : 'blue'
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
                    sh "sed -i 's/app-${env.ACTIVE_ENV}/app-${env.TARGET}/g' nginx/nginx.conf"
                    sh "docker compose restart nginx"
                    env.ACTIVE_ENV = env.TARGET
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