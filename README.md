# Homies App

Homies App is a mobile application built with Expo and React Native.

## Getting Started

### Prerequisites

- Node.js
- Expo CLI

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/homies_app.git
    ```
2. Navigate to the project directory:
    ```sh
    cd homies_app
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

### Running the App

To start the app, run:
```sh
npm start
```

To run on a specific platform:
```sh
npm run android
npm run ios
npm run web
```

### Testing

To run tests, use:
```sh
npm test
```

### Linting

To lint the code, use:
```sh
npm run lint
```

## Versioning

For each new build, make sure to increment the version fields in both `app.json` and `package.json`.

- In `app.json`:
    ```json
    {
      "expo": {
        // ...existing code...
        "version": "1.0.6",
        // ...existing code...
      }
    }
    ```

- In `package.json`:
    ```json
    {
      // ...existing code...
      "version": "1.0.6",
      // ...existing code...
    }
    ```

## License

This project is licensed under the MIT License.
