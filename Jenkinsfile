pipeline {
    agent any

    tools {
        maven 'M3'
    }
        
    stages {
        /*stage('Clone or Pull') {
            steps {
                // Checkout the code from your GitHub repository or copy it from a source
                // Replace 'your-username' and 'your-repo' with your GitHub username and repository name
                script {
                    // Define the branch name
                    def branchName = 'main' // Replace 'main' with the desired branch name
                    sh "git checkout -b ${branchName}"
                    sh "git credentialsId: 'git', url: 'https://github.com/Ashittu21/vera-test-website.git'"
                }
            }
        }*/
        stage('Sonar Build') {
            steps {
                withSonarQubeEnv('sonarqube') {
                    sh '''
                        mvn sonar:sonar
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
                            [artifactId: '1', classifier: '', file: '/var/www/html/your_artifact.zip', type: 'zip']
                        ],
                        repositoryId: 'nexus-repo', // Replace with your Nexus repository ID
                        credentialsId: 'nexus-user' // Replace with the credentials ID to access Nexus (configured in Jenkins)
                    ]
                ]
            }
        }
    }
}