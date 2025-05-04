pipeline {
    agent any  // Ejecutar el pipeline en cualquier agente disponible

    environment {
        // Variables de entorno que se obtienen desde las credenciales almacenadas en Jenkins
        NETLIFY_TOKEN = credentials('netlify-token')  // Token de autenticación para la API de Netlify
        GITHUB_TOKEN = credentials('github-token')    // Token de acceso para clonar el repositorio de GitHub
    }

    stages {
        stage('Checkout') {
            steps {
                // Clonamos el repositorio de GitHub usando el token de acceso
                // IMPORTANTE: Se indica explícitamente la rama 'main' (GitHub ya no usa 'master' por defecto)
                git credentialsId: 'github-token', url: 'https://github.com/Mabarea/TFG_MiguelBarea.git', branch: 'main'
            }
        }

        stage('Build') {
            steps {
                // Esta etapa no compila nada porque se trata de una web estática en HTML
                echo "No hay build porque es HTML estático"
            }
        }

        stage('Deploy') {
            steps {
                // Usamos el token de Netlify para hacer una petición POST a su API y subir el archivo index.html
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
