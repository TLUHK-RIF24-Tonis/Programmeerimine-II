declare namespace NodeJS {
  interface ProcessEnv {
    JWT_SECRET: string;
    PORT: number;
    SALT_ROUNDS: number;
  }
}