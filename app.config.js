import { config as loadEnv } from "dotenv";

export default ({ config }) => {
    const envFile = process.env.ENV_FILE || ".env.poke";
    loadEnv({ path: envFile });
    console.log("ENV FILE:", envFile);
    console.log("APP NAME:", process.env.APP_NAME);
  return {
    ...config,
    name: process.env.APP_NAME || "Pokemon App",
    slug: process.env.APP_SLUG || "pokemon-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: process.env.APP_ICON || "./assets/splash-icon.pn",
    splash: {
      image: process.env.SPLASH_IMAGE || "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      bundleIdentifier: process.env.BUNDLE_ID || "com.example.pokemon",
    },
    android: {
      package: process.env.PACKAGE_NAME || "com.example.pokemon",
    },
    extra: {
      API_FLAVOR: process.env.API_FLAVOR,
      API_BASE_URL: process.env.API_BASE_URL,
    },
  };
};
