pipeline {
    agent any

    parameters {
        choice(
            name: 'TEST_ENV',
            choices: ['local', 'qa', 'prod'],
            description: 'Select the environment to test'
        )
    }

    tools {
        nodejs 'NodeJS-20'
    }

    environment {
        CI = 'true'
        PLAYWRIGHT_BROWSERS_PATH = "${WORKSPACE}/.playwright-browsers"
    }

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {
        stage('Set environment') {
            steps {
                script {
                    def urls = [
                        local: 'https://dsportalapp.herokuapp.com',
                        qa: 'https://dsportalapp.herokuapp.com',
                        prod: 'https://dsportalapp.herokuapp.com'
                    ]

                    if (!urls.containsKey(params.TEST_ENV)) {
                        error("Unsupported TEST_ENV: ${params.TEST_ENV}")
                    }

                    env.BASE_URL = urls[params.TEST_ENV]
                }

                echo "Running tests against environment: ${params.TEST_ENV}"
                echo "Base URL: ${env.BASE_URL}"
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Environment') {
            steps {
                sh 'node --version'
                sh 'npm --version'
                sh 'echo TEST_ENV=$TEST_ENV'
                sh 'echo BASE_URL=$BASE_URL'
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
                    sh '''
                        set +x
                        npx playwright test
                    '''
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
            echo "All Playwright BDD tests passed in ${params.TEST_ENV}."
        }

        failure {
            echo "One or more Playwright BDD tests failed in ${params.TEST_ENV}."
        }

        cleanup {
            cleanWs()
        }
    }
}