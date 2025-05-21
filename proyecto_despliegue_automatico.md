
## Proyecto: Despliegue Automático de Aplicaciones Web con Jenkins y Vercel/Netlify

### 1. Introducción

Este proyecto tiene como objetivo implementar un sistema de despliegue automático de una aplicación web sencilla usando herramientas modernas de integración continua (CI) y despliegue continuo (CD). Para ello, se utilizará Jenkins como servidor de automatización y Netlify o Vercel como plataformas de despliegue en la nube.

### 2. Objetivos

- Automatizar el proceso de despliegue de una aplicación web.
- Configurar Jenkins para detectar cambios en un repositorio GitHub.
- Desplegar automáticamente la aplicación en Netlify o Vercel.
- Aprender el flujo completo de CI/CD en un entorno real.

### 3. Tecnologías usadas

- GitHub (repositorio del código fuente)
- Jenkins (automatización del proceso de CI/CD)
- Netlify / Vercel (despliegue en la nube)
- Docker (contenedorización de Jenkins)
- HTML/CSS/JS (para la app básica)

### 4. Desarrollo paso a paso

#### PASO 1: Crear la aplicación web

Crear una carpeta `mi-app` y dentro un archivo `index.html` con contenido básico HTML.

#### PASO 2: Subir el proyecto a GitHub

Crear un repositorio en GitHub y subir los archivos desde la interfaz web o por línea de comandos con Git.

#### PASO 3: Crear cuenta en Netlify o Vercel

Registrar una cuenta, importar el proyecto desde GitHub y desplegarlo automáticamente. Guardar la URL pública del sitio.

#### PASO 4: Instalar y configurar Jenkins con Docker

1. Instalar Docker si no está instalado.
2. Crear una red Docker:
   ```bash
   docker network create jenkins
   ```
3. Crear un volumen para Jenkins:
   ```bash
   docker volume create jenkins_home
   ```
4. Ejecutar Jenkins:
   ```bash
   docker run -d --name jenkins      -p 8080:8080 -p 50000:50000      --network jenkins      -v jenkins_home:/var/jenkins_home      jenkins/jenkins:lts
   ```
5. Acceder a Jenkins desde el navegador en `http://localhost:8080` y seguir las instrucciones para completar la configuración inicial.

#### PASO 5: Instalar plugins necesarios

Instalar los siguientes plugins desde "Manage Plugins":

- GitHub Integration
- Pipeline
- (Opcional) Netlify o Vercel CLI

#### PASO 6: Configurar credenciales de GitHub y Netlify/Vercel

Crear tokens de acceso personales en GitHub y Netlify/Vercel, y añadirlos a Jenkins como credenciales secretas.

#### PASO 7: Crear archivo Jenkinsfile

Crear un archivo `Jenkinsfile` en el repositorio con la siguiente estructura:

```groovy
pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'github-token', url: 'https://github.com/tu_usuario/mi-app.git'
            }
        }
        stage('Build') {
            steps {
                echo "No hay build porque es HTML estático"
            }
        }
        stage('Deploy') {
            steps {
                sh '''
                curl -H "Authorization: Bearer ${netlify-token}"                      -F "file=@index.html"                      https://api.netlify.com/api/v1/sites/TU_SITE_ID/deploys
                '''
            }
        }
    }
}
```

#### PASO 8: Crear Pipeline en Jenkins

Crear un nuevo Pipeline en Jenkins que apunte al repositorio GitHub y utilice el Jenkinsfile para la configuración.

#### PASO 9: Automatizar con Webhooks (opcional)

En GitHub, configurar un webhook que apunte a `http://TU_IP_PUBLICA:8080/github-webhook/` para que Jenkins se ejecute al hacer push.

#### PASO 10: Prueba final

Modificar el `index.html`, hacer commit y push. Verificar que Jenkins ejecuta el pipeline y que la app se actualiza automáticamente.

### 5. Capturas recomendadas

- Interfaz de la app desplegada
- Pipeline ejecutado en Jenkins
- Configuración del webhook en GitHub
- Código del Jenkinsfile
- Cambios reflejados tras el despliegue

### 6. Conclusiones

- Se ha implementado un flujo CI/CD completo y funcional.
- Jenkins permite automatizar tareas de despliegue eficientemente.
- Netlify/Vercel simplifican el proceso de publicación web.
- El sistema puede escalarse a proyectos más grandes y complejos.

Este proyecto demuestra conocimientos sólidos en administración de sistemas, automatización y despliegue en la nube, siendo perfectamente válido como trabajo final de ciclo.
