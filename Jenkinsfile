pipeline {
    agent any

    tools {
        git 'Git' // Use the name of the Git tool you configured in Global Tool Configuration
        jdk "jdk"
    }

    stages {
        stage('Checkout') {
            steps {
                // Replace the repository URL with your PHP project's Git repository
                git branch: 'main', credentialsId: 'git-token-user', url: 'https://github.com/Ashittu21/vera-test-website/'
            }
        }
        
        stage('Static Code Analysis') {
            
            steps {
                script{
                    def scannerHome = tool 'SonarQubeScanner'
                    withSonarQubeEnv('sonarqube') {
                        withEnv(["SONAR_SCANNER_OPTS=-Xmx512m"]) {
                            sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=vera-test-website -Dsonar.projectName='vera-test-website' -Dsonar.sources=. -Dsonar.host.url=http://23.21.135.171:9000 -Dsonar.login=squ_8e19a655c6bc87e9b402f4537d65571e3bba989b"
                        }
                    }
                }
                
            }
        }
        
        stage('Create Zip Archive') {
            steps {
                sh 'mkdir archivaldir'
                sh 'cd archivaldir'
                dir('archivaldir') {
                    git branch: 'main', credentialsId: 'git-token-user', url: 'https://github.com/Ashittu21/vera-test-website/'
                }
                sh 'tar --exclude=vera-test-website.tar.gz -czf vera-test-website.tar.gz archivaldir'
                sh 'ls'
            }
            post{
                always{
                    sh 'rm -rf archivaldir'
                }
            }
        }
        
        stage('Archive Artifact'){
            steps{
                archiveArtifacts artifacts: '**/*.tar.gz', allowEmptyArchive: true
            }
        }

        

       stage('Upload to Nexus') {
            steps {
                sh 'curl -v -u admin:admin --upload-file vera-test-website.tar.gz http://44.217.150.130:8081/repository/php-raw-repo/vera-test-website.tar.gz'
            }
        }
    
        
        stage('Deploy Project') {
            steps {
                // Replace  '/var/www/html/' with the path to your web server's document root
                sh 'echo "Dummy Deploying" '
            }
        }
    }
}
