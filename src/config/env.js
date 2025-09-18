import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra || Constants.manifest?.extra || {};

export const { API_FLAVOR, API_BASE_URL } = extra;
