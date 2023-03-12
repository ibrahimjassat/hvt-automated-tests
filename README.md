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

## Adding a new test

### If the test requires a new Page model
Pages where elements are used across multiple tests should be abstracted to a page model, described [here](https://playwright.dev/docs/test-pom).

1. Create a new file in `pages/` named as the page name
1. Create a new class that extends the `BasePage`

*Recommended standards for Page models*:
- All properties _should_ be `readonly` unless there's a good reason.
- Element selectors _must_ follow the Playwright [best practices](https://playwright.dev/docs/selectors#best-practices).

### If the test requires a new test spec
1. Create the test in `tests` file affixed with `*.spec.ts`.
2. If you are covering an area which has not been covered create a folder for these test e.g. if the test been written cover carrying out an MOT test create a folder in `tests` called `motTest`
1. Test format can be found [here](https://playwright.dev/docs/intro#first-test).

*Recommended standards for tests*:
- Tests _should_ be wrapped with a describe.
- `beforeEach` & `afterEach` _could_ be used to reduce code duplication.
- Colloquial language _should_ be used when describing tests.
- Test descriptions _should_ follow "Given", "When", & "Then" formats.
