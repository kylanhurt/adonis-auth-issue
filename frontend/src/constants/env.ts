export const LOCAL_ENV = {
  API_BASE_URL: "http://localhost:3333",
};

export const PROD_ENV = {
  API_BASE_URL: "http://localhost:3333",
};

console.log("process.env.NODE_ENV", process.env.NODE_ENV);

type EnvVars = {
  API_BASE_URL: string;
};

export const getEnvVars = (): EnvVars => {
  switch (process.env.NODE_ENV) {
    case "production":
      return PROD_ENV;
    case "development":
      return LOCAL_ENV;
    default:
      return LOCAL_ENV;
  }
};
