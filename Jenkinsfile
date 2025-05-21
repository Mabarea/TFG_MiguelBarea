pipeline {
    agent any  // Ejecutar el pipeline en cualquier agente disponible

    environment {
        NETLIFY_TOKEN = credentials('netlify-token')        // Token para API de Netlify
        GITHUB_CLONE_TOKEN = credentials('github-clone-token')  // Token para clonar repositorio
        GITHUB_WEBHOOK_TOKEN = credentials('github-webhook-token')  // Token para webhook (si lo usas en otro lugar)
    }

    stages {
        stage('Checkout') {
            steps {
                // Clonamos el repositorio usando el token de clonación
                git credentialsId: 'github-clone-token', url: 'https://github.com/Mabarea/TFG_MiguelBarea.git', branch: 'main'
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
                         https://api.netlify.com/api/v1/sites/6091cb2b-154c-407b-bb86-2a32afaf9d2a/deploys
                    '''
                }
            }
        }
    }
}
