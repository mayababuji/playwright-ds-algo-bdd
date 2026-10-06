pipeline {
    agent any

    tools {
        nodejs 'NodeJS-20'
    }

    environment {
        CI = 'true'
        BASE_URL = 'https://dsportalapp.herokuapp.com'
        PLAYWRIGHT_BROWSERS_PATH = "${WORKSPACE}/.playwright-browsers"
    }

    options {
        timestamps()
        skipDefaultCheckout(false)
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Environment') {
            steps {
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright browsers') {
            steps {
                sh '''
                    npx playwright install --with-deps \
                        chromium \
                        firefox \
                        webkit
                '''
            }
        }

        stage('Generate BDD tests') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'ds-algo-login',
                        usernameVariable: 'LOGIN_USERNAME',
                        passwordVariable: 'LOGIN_PASSWORD'
                    )
                ]) {
                    sh '''
                        set +x
                        npx bddgen
                    '''
                }
            }
        }

        stage('Run all BDD tests on all browsers') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'ds-algo-login',
                        usernameVariable: 'LOGIN_USERNAME',
                        passwordVariable: 'LOGIN_PASSWORD'
                    )
                ]) {
                    catchError(
                        buildResult: 'FAILURE',
                        stageResult: 'FAILURE'
                    ) {
                        sh '''
                            set +x
                            npx playwright test
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                if (fileExists('allure-results')) {
                    allure([
                        results: [
                            [path: 'allure-results']
                        ],
                        reportBuildPolicy: 'ALWAYS'
                    ])
                }
            }

            archiveArtifacts(
                artifacts: 'playwright-report/**,test-results/**,allure-results/**',
                allowEmptyArchive: true,
                fingerprint: true
            )

            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report',
                reportTitles: 'Playwright Test Results'
            ])
        }

        success {
            echo 'All Playwright BDD tests passed on Chromium, Firefox, and WebKit.'
        }

        failure {
            echo 'One or more Playwright BDD tests failed.'
        }

        cleanup {
            cleanWs()
        }
    }
}