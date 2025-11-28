declare namespace NodeJS {
  interface ProcessEnv {
    JWT_SECRET: string;
    PORT: number;
    SALT_ROUNDS: number;
    DB_HOST: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string
    DB_PORT: number;
  }
}