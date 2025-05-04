pipeline {
    agent any
    environment {
        NETLIFY_TOKEN = credentials('netlify-token')
        GITHUB_TOKEN = credentials('github-token')
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'github-token', url: 'https://github.com/Mabarea/TFG_MiguelBarea.git'
            }
        }
        stage('Build') {
            steps {
                echo "No hay build porque es HTML estático"
            }
        }
        stage('Deploy') {
            steps {
                withCredentials([string(credentialsId: 'netlify-token', variable: 'NETLIFY_TOKEN')]) {
                    sh '''
                    curl -H "Authorization: Bearer ${NETLIFY_TOKEN}" \
                         -F "file=@index.html" \
                         https://api.netlify.com/api/v1/sites/TU_SITE_ID/deploys
                    '''
                }
            }
        }
    }
}
