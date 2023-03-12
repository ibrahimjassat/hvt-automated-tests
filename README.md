# HVT-automated-tests

Automation tests for the Heavy Vehicle Testing application.

## Prerequisites
1. Clone this repository

    ```shell
   git@github.com:dvsa/HVT-automated-tests.git
    ```

1. Create an `.env` file using `.env.example`

    ```shell
    cp .env.example .env
    ```

1. Populate the `.env` file with the credentials for your local setup
1. Download the dependencies required for this repository

    ```shell
    npm install
    ```

1. Install the support Playwright browsers

    ```shell
    npx playwright install
    ```

## Running tests

### Run all the tests

```shell
npx playwright test
```

### Run a single test file

```shell
npx playwright test tests/<filename>

```
### Run a specific browser
Tests will run in all browsers unless specified. Browsers are listed in playwright.config.ts

```shell
npx playwright test --project=webkit
```

For more advanced options: https://playwright.dev/docs/test-cli

### Viewing the last HTML report run

```shell
npx playwright show-report
```
