pipeline {
    agent any
    environment {
        // Variables de entorno para los tokens
        NETLIFY_TOKEN = credentials('netlify-token')  // Se obtiene el token de Netlify desde las credenciales de Jenkins
        GITHUB_TOKEN = credentials('github-token')    // Se obtiene el token de GitHub desde las credenciales de Jenkins
    }
    stages {
        stage('Checkout') {
            steps {
                // Clonamos el repositorio de GitHub usando las credenciales
                git credentialsId: 'github-token', url: 'https://github.com/Mabarea/TFG_MiguelBarea.git'
            }
        }
        stage('Build') {
            steps {
                echo "No hay build porque es HTML estático"
            }
        }
        stage('Deploy') {
            steps {
                // Desplegamos el código a Netlify usando su API
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
