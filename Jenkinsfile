pipeline {
    agent {
        label 'Vera-Web-Server'
    }

    stages {
         stage('Clone or Pull') {
            steps {
                // Checkout the code from your GitHub repository or copy it from a source
                // Replace 'your-username' and 'your-repo' with your GitHub username and repository name
                git 'https://github.com/Ashittu21/vera-test-website.git'
            }
        }
        stage('Deploy Project') {
            steps {
                // Go to the specified directory
                sh 'cd ${Workspace}'
                sh 'ls -lrt'
                // Perform some action in the directory
                sh '''
                    cp -r * /var/www/html/                
                '''
            }
        }
    }
}