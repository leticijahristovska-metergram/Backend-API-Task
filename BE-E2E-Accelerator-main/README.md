# Metergram API framework

Welcome to the **Metergram Testing Framework**! This project is a custom-built QA testing framework using TypeScript and Jest.

## Features

- **TypeScript**: Leveraging the power of TypeScript for type-safe development.
- **Jest**: Integrated testing framework for unit and integration tests.
- **Database Connection**: Seamlessly interact with your database for testing purposes.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine. You can download them from [Node.js official website](https://nodejs.org/).
- Database credentials and access.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/nnikolikj/API_FRAMEWORK
    cd API_FRAMEWORK
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

## Usage

### Running Tests

To run the tests, use:

```bash
npm test
```
npm test is a command used in Node.js projects to execute automated tests defined within the project. It is typically configured in the package.json file under the "scripts" section. When you run npm test in the terminal, npm looks for a corresponding script command, often associated with a testing framework like Jest, Mocha, or Jasmine.

- **Writing Tests:**

  Add your test cases in the `tests` directory. Follow the Jest documentation for writing effective test cases.

### Example Test

Here is a simple example of how to write a test case using Jest:

```typescript
import { myFunction } from '../src/myModule';

test('myFunction should return true', () => {
  expect(myFunction()).toBe(true);
});
```

## Contributing

Contributions are always welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-foo`).
3. Commit your changes (`git commit -m 'Add some foo'`).
4. Push to the branch (`git push origin feature-foo`).
5. Open a Pull Request.

Please ensure your code follows the project's coding standards and passes all tests.

## Docker 

To run the test on docker first we need to crate an docker image and we can do that but writing 

```bash
docker-compose up
```

after that to start the test we execute

```bash
 docker compose exec -T metergram_be bash -c "npm test"
```
