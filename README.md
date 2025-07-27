# GitHub Repository Finder

This is a Next.js application that allows users to search for GitHub repositories and view their details.

## Features

- Search for GitHub repositories by name.
- View a list of repositories matching the search query.
- See details for a specific repository, including stars, forks, and open issues.
- Responsive design for both desktop and mobile.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

This project uses Jest for testing. To run the tests, use the following command:

```bash
npm run test
```

## Docker

This project includes a `Dockerfile` and `docker-compose.yml` for building and running the application in a Docker container.

### Build and Run with Docker Compose

To build and run the application using Docker Compose, run the following command:

```bash
docker-compose up -d --build
```

The application will be available at [http://localhost:3000](http://localhost:3000).

To stop the application, run:

```bash
docker-compose down
```

### Build and Run with Docker

To build the Docker image manually, run:

```bash
docker build -t github-repository-finder .
```

To run the container:

```bash
docker run -p 3000:3000 github-repository-finder
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
