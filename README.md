This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## Required env variables

```
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
# Randomly generated 32 bit string
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.

### `yarn test`

Runs unit tests for rickandmorty api.

### `yarn build`

Creates a production version of the application.

### `yarn start`

Runs the production version.

### `yarn prepare`

Installs Husky git hooks.

## App Structure

### `src/core`

The main place which contains components, hooks, etc that are used throughout app.

### `src/integrations`

Contains third party integrations (facebook/linkedin authentication, rickandmorty api).
