# Custom Next.js Template

This template sets up a Next.js project with Material-UI (MUI), Prettier, ESLint, and Axios. Follow the instructions below to get started.

## Getting Started

### Using the Template

To create a new project using this template, run:

```bash
npx create-next-app -e https://github.com/tkadima/custom-next-template your-project-name
```

### Update `package.json`

After creating your project, update the `package.json` file to include your project's specific information:

- **Name**: Change the `"name"` field to your project name.
- **Version**: Update the `"version"` field if necessary.
- **Description**: Add a description for your project.
- **Author**: Add your name or your team's name.
- **Scripts**: Update any scripts or paths to match your project structure if necessary.

### Initial Project Setup

After creating your project, you may need to make the following changes:

1. **Create Initial Database Migration:**

   If your project uses a SQLite database, ensure that the initial migration file `0001_initial.sql` is created in the `src/migrations` folder. You can do this by manually creating the file and including your initial SQL schema.

2. **Delete or Rename Default Files:**

   - **Pages**: Delete or rename `pages/api/test.ts` or any other example API routes that are not needed in your project.
   - **Public Files**: Review and remove any placeholder files or images in the `public` directory.

3. **Update Configuration Files:**

   - **Prettier and ESLint**: Customize `.prettierrc` and `.eslintrc.json` files as per your coding standards.
   - **Dockerfile and Docker Compose**: Ensure the Docker configuration files (`Dockerfile`, `docker-compose.yml`) match your project's needs.

## Running the Project

### With NPM

To run the project locally with npm, use the following commands:

1. **Install Dependencies:**

   ```bash
   npm install
   ```

2. **Run the Development Server:**

   ```bash
   npm run dev
   ```

Your application will be available at [http://localhost:3000](http://localhost:3000).

### With Docker

To run the project using Docker, follow these steps:

1. **Build the Docker Image:**

   ```bash
   docker-compose build
   ```

2. **Run the Docker Container:**

   ```bash
   docker-compose up
   ```

   Your application will be available at [http://localhost:3000](http://localhost:3000).

3. **Stopping the Docker Containers:**

   To stop the running containers, use:

   ```bash
   docker-compose down
   ```

## Additional Notes

### Working with Migrations

When making changes to your database schema, make sure to create and apply new migrations as needed. For SQLite:

1. **Create a New Migration:**

   Create a new SQL migration file in the `src/migrations` folder, naming it sequentially after the previous migration (e.g., `0002_add_new_table.sql`).

2. **Apply the Migration:**

   Ensure the migration is applied to your database by running it through your preferred method, whether through a script, a database client, or during the application start-up process.

### Customizing the Template

This template is a starting point. Feel free to customize the project structure, dependencies, and configurations to suit your specific needs.

For any Next.js specific issues, refer to the [Next.js documentation](https://nextjs.org/docs).

This template aims to provide a solid foundation for your Next.js projects, enabling you to focus on building features rather than setting up the initial project structure.
