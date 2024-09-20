# Star Wars API

This project uses the [SWAPI (Star Wars API)](https://swapi.dev/api/) to display information about films, characters, vehicles, planets, starships, and species from the Star Wars universe.

## Prerequisites

Ensure that you have the following installed before proceeding:

- **Node.js** (version 14 or higher recommended)
- **NPM** (Node Package Manager)
- **Docker** (if running the project with Docker)

## Running the Project

You can run the project locally using either NPM or Docker.

### Running with NPM

To run the project locally with npm, follow these steps:

1. **Install Dependencies:**

   Run the following command to install all necessary packages:

   ```bash
   npm install
   ```

2. **Start the Development Server:**

   Run the following command to start the server:

   ```bash
   npm run dev
   ```

3. **Access the Application:**

   Once the server is running, open your browser and navigate to:

   ```
   http://localhost:3000
   ```

### Running with Docker

Alternatively, you can run the project using Docker. Follow these steps:

1. **Build the Docker Image:**

   Run the following command to build the Docker image for the project:

   ```bash
   npm run docker:build
   ```

2. **Run the Docker Container:**

   After building the image, run the Docker container with the following command:

   ```bash
   npm run docker:run
   ```

3. **Access the Application:**

   Once the container is up and running, open your browser and navigate to:

   ```
   http://localhost:3000
   ```

## Additional Information

- For any issues or questions, refer to the official [SWAPI documentation](https://swapi.dev/documentation) to understand how the API functions.
- This project is set up to automatically restart the development server if any changes are made to the source files during local development.
