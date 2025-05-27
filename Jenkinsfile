pipeline {
    agent any

    environment {
        NETLIFY_TOKEN = credentials('netlify-token')        // Token para API de Netlify
        GITHUB_CLONE_TOKEN = credentials('github-token')    // Token para clonar repositorio
    }

    stages {
        stage('Checkout') {
            steps {
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
                        echo $GIT_COMMIT > version.txt
                        netlify deploy --dir=. --site=6091cb2b-154c-407b-bb86-2a32afaf9d2a --auth=$NETLIFY_TOKEN --prod
                    '''
                }
            }
        }
    }
}