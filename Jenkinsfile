pipeline {
    agent any
    environment {
        ACTIVE_ENV = 'blue' // Track via a persistent file or global var
    }
    stages {
        stage('Build & Test') { /* Run npm install and tests */ }
        
        stage('Deploy') {
            steps {
                script {
                    def target = (env.ACTIVE_ENV == 'blue') ? 'green' : 'blue'
                    echo "Deploying to ${target}..."
                    // Start container on specific port
                    sh "docker-compose up -d app-${target}"
                }
            }
        }

        stage('Health Check') {
            steps {
                script {
                    // Logic to curl health endpoint of target container
                    def status = sh(script: "curl -s http://app-${target}:3000/health", returnStatus: true)
                    if (status != 0) {
                        error("Health check failed! Rolling back.")
                    }
                }
            }
        }

        stage('Switch Traffic') {
            steps {
                script {
                    // Update nginx config to point to the new target
                    sh "sed -i 's/app-${env.ACTIVE_ENV}/app-${target}/g' nginx/nginx.conf"
                    sh "docker-compose restart nginx"
                    env.ACTIVE_ENV = target
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