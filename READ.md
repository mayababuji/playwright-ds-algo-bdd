# Playwright BDD DS Algo Project

## Common commands

Run all tests in the selected environment and all browsers:

```bash
npm run test:qa
```

Run only Chromium:

```bash
npm run test:qa:chromium
```

Run only Firefox:

```bash
npm run test:qa:firefox
```

Run only WebKit:

```bash
npm run test:qa:webkit
```

Run the login scenario:

```bash
npm run test:qa:login
```

Generate and open the Allure report:

```bash
npm run allure:generate
npm run allure:open
```

## Environments

The project supports:

- `local`
- `qa`
- `prod`

Environment files are selected through the `TEST_ENV` variable:

- `TEST_ENV=local` loads `.env.local`
- `TEST_ENV=qa` loads `.env.qa`
- `TEST_ENV=prod` loads `.env.prod`

## Local setup

```bash
npm ci
npx playwright install chromium firefox webkit
```

Create the required local environment file:

```text
.env.local
```

Add the required variables:

```env
BASE_URL=[https://your-environment-url.example.com](https://your-environment-url.example.com)
LOGIN_USERNAME=your_username
LOGIN_PASSWORD=your_password
```

Do not commit environment files containing credentials.

```Meaning
test:qa:chromium
      │   │
      │   └── browser
      └────── environment

      ```


      ```
      package.json
This is the project’s main npm configuration file. It tells Node/npm:

What the project is called.
npm reads the dependencies in package.json and installs them

Which npm packages are required.

Which commands team members can run.

Whether the project uses ES modules or CommonJS.
      ```

      ```
      package-lock.json
      This records the exact versions of the packages installed, including packages used internally by those packages.
      It helps ensure that:

Your computer.

Your colleague’s computer.

Jenkins.

all install the same dependency versions.

That prevents issues such as:
It works on my computer but not on Jenkins.
      ```
