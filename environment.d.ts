declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FACEBOOK_CLIENT_ID: string;
      FACEBOOK_CLIENT_SECRET: string;
      LINKEDIN_CLIENT_ID: string;
      LINKEDIN_CLIENT_SECRET: string;
      NODE_ENV: "development" | "production";
      PORT?: string;
    }
  }
}

export {};
