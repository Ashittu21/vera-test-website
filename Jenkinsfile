pipeline {
    agent  {
        'any'
    }

    stages {
        stage('Clone or Pull') {
            steps {
                // Checkout the code from your GitHub repository or copy it from a source
                // Replace 'your-username' and 'your-repo' with your GitHub username and repository name
                git credentialsId: 'git-token-user', url: 'https://github.com/Ashittu21/vera-test-website'
            }
        }
        stage('Sonar Build') {
            steps {
                withSonarQubeEnv('sonarqube') {
                    sh '''
                        ARTIFACTORY_URL=http://44.217.150.130:8081/repository/nexus-repo/
                        cd $WORKSPACE
                        mvn clean verify test sonar:sonarqube
                    '''
                }
            }
        }
        stage('Sonar quality check') {
            steps {
                script {
                    def qg = waitForQualityGate abortPipeline: true, credentialsId: 'sonarqube'
                    if (qg.status != 'OK') {
                        error("Pipeline aborted due to Quality Gate failure: ${qg.status}")
                    }
                }
            }
        }
        stage('Deploy Project') {
            steps {
                // Go to the specified directory
                sh 'cd ${WORKSPACE}'
                sh 'ls -lrt'
                // Perform some action in the directory
                sh '''
                    cp -r * /var/www/html/
                '''
            }
        }
        stage('Upload to Nexus') {
            steps {
                // Upload the project artifact to Nexus
                nexusPublisher nexusInstanceId: 'nexus', nexusRepositoryId: 'nexus-repo', packages: [
                    [ 
                        artifacts: [
                            [artifactId: '1', classifier: '', file: '/var/www/html/**', type: 'zip']
                        ],
                        repositoryId: 'nexus-repo', // Replace with your Nexus repository ID
                        credentialsId: 'nexus-user' // Replace with the credentials ID to access Nexus (configured in Jenkins)
                    ]
                ]
            }
        }
    }
}
