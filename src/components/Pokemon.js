import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Pokemon(){
    const[pokemon, setPokemon] = useState([])
    const[loading, setLoading] = useState(false)
    const[error, setError] = useState(null)
    const[offset, setOffset] = useState(0)
    const[more, setMore] = useState(true)

    const LIMIT = 30

    const fetchPokemon = async(refresh = false) =>{
        if(loading) return

        setLoading(true)
        setError(null)

        try {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${refresh ? 0 : offset}&limit=${LIMIT}`)
            const data = res.data.results.map(item => {
                const id = item.url.split("/").filter(Boolean).pop()
                return{
                    name: item.name,
                    id,
                    image:  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
                }
            })
            setPokemon((prev) => (refresh ? data : [...prev, ...data]));
            setOffset((prev) => (refresh ? LIMIT : prev + LIMIT));
            setMore(data.length === LIMIT)
        } catch (error) {
            setError("Failed to load Pokemon");

        } finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        fetchPokemon()
    }, [])

    const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>
        {item.id}. {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
      </Text>
    </View>
    );

    return (
        <View style={styles.container}>
      {error && (
        <TouchableOpacity style={styles.errorBox} onPress={() => fetchPokemon()}>
          <Text style={{ color: "white" }}>{error} Tap to retry</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={pokemon}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        initialNumToRender={10}
        windowSize={5}
        refreshing={loading}
        onRefresh={() => fetchPokemon(true)}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="red" /> : null
        }
        onEndReached={() => {
          if (more && !loading) fetchPokemon();
        }}
        onEndReachedThreshold={0.5}
      />
    </View>
    )
  
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", paddingTop: 20 },
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
  image: { width: 60, height: 60, marginRight: 15 },
  name: { fontSize: 16, fontWeight: "bold" },
  errorBox: {
    backgroundColor: "tomato",
    padding: 10,
    margin: 10,
    borderRadius: 8,
    alignItems: "center",
  },
});