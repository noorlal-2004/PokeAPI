import { useEffect, useState } from "react";
import { View, Text, Image, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import api from "../api/api";
import { mapResponse } from "../api/apiMapper";
import { API_FLAVOR, API_BASE_URL } from "../config/env";

console.log("Using Flavor:", API_FLAVOR);
console.log("Base URL:", API_BASE_URL);

export default function Characters() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0); 
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      let endpoint;
      if (API_FLAVOR === "poke") {
        endpoint = `/pokemon?limit=20&offset=${page * 20}`;
      } else {
        endpoint = `/character?page=${page + 1}`;
      }

      const res = await api.get(endpoint);
      const mapped = mapResponse(res.data);

      if (mapped.length === 0) {
        setHasMore(false);
      } else {
        setItems((prev) => [...prev, ...mapped]);
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.text}>{item.name}</Text>
        </View>
      )}
      onEndReached={fetchData}
      onEndReachedThreshold={0.5} 
      ListFooterComponent={
        loading ? <ActivityIndicator size="large" color="red" style={{ marginVertical: 20 }} /> : null
      }
    />
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    marginHorizontal: 10,
    marginBottom: 8,
    borderRadius: 10,
    elevation: 2,
  },
  image: { width: 60, height: 60, marginRight: 15, borderRadius: 30 },
  text: { fontSize: 16, fontWeight: "bold" },
});
