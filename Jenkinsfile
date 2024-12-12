pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'slimjemaidocker'
        FRONTEND_IMAGE = "${DOCKER_REGISTRY}/portfolio-frontend"
        BACKEND_IMAGE = "${DOCKER_REGISTRY}/portfolio-backend"
    }

    stages {
        stage('Build Frontend') {
            when {
                changeset pattern:"**/frontend/**"
            }
            steps {
                script {
                    echo 'Building frontend Docker image...'
                    sh 'docker build -t ${FRONTEND_IMAGE}:latest -f frontend/Dockerfile ./frontend'
                    sh 'docker push ${FRONTEND_IMAGE}:latest'
                }
            }
        }

        stage('Build Backend') {
            when {
                changeset pattern:"**/backend/**"
            }
            steps {
                script {
                    echo 'Building backend Docker image...'
                    sh 'docker build -t ${BACKEND_IMAGE}:latest -f backend/Dockerfile ./backend'
                    sh 'docker push ${BACKEND_IMAGE}:latest'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            when {
                changeset pattern:"**/frontend/**", pattern:"**/backend/**", pattern:"**/kubernetes/**"
            }
            steps {
                script {
                    echo 'Deploying to Kubernetes...'
                    
                    // Apply Kubernetes configurations
                    sh 'kubectl apply -f kubernetes/backend-deployment.yaml'
                    sh 'kubectl apply -f kubernetes/frontend-deployment.yaml'
                    sh 'kubectl apply -f kubernetes/backend-secrets.yaml'
                    
                    // Force rollout to update pods with the latest images
                    sh '''
                        kubectl rollout restart deployment/backend-deployment
                        kubectl rollout restart deployment/frontend-deployment
                        kubectl rollout restart deployment/backend-secrets
                    '''
                    
                    // Automatically activate port forwarding if required
                    echo 'Setting up port forwarding...'
                    sh '''
                        kubectl port-forward svc/portfolio-backend-service 3000:3000 &
                        kubectl port-forward svc/portfolio-frontend-service 5000:5000 &
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs for details.'
        }
    }
}
