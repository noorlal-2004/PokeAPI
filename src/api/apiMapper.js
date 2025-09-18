import Constants from "expo-constants";

const { API_FLAVOR } = Constants.expoConfig.extra;
export function mapResponse(data) {
  if (API_FLAVOR === "poke") {
    return data.results.map((item) => {
      const id = item.url.split("/").filter(Boolean).pop();
      return {
        id,
        name: item.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      };
    });
  }

  if (API_FLAVOR === "rick") {
    return data.results.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.image,
    }));
  }

  return [];
}
