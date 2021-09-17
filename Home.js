import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getAllDeals, getSearchDeals } from "./api";

function Home(props) {
  const [allDeals, setAllDeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllDeals = async () => {
      const allDeals = await getAllDeals();
      setAllDeals(allDeals);
      setLoading(false);
    };
    fetchAllDeals();
  }, []);

  const DealsItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("Profile", {
            key: item.key,
          });
        }}
        style={{
          margin: 10,
          borderWidth: 1,
          borderColor: "grey",
          borderRadius: 5,
        }}
      >
        <Image style={styles.image} source={{ uri: item.media[0] }} />

        <View style={{ margin: 10 }}>
          <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{item.cause.name}</Text>
            <Text style={{ fontWeight: "bold" }}>{item.price + "Rs"}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginLeft: 10,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "grey",
            height: 50,
          }}
          onPress={async () => {
            setSearchTerm("");
            setLoading(true);
            setAllDeals([]);
            const allDeals = await getAllDeals();
            setAllDeals(allDeals);
            setLoading(false);
          }}
        >
          <Text
            style={{
              height: 50,
              textAlign: "center",
              textAlignVertical: "center",
            }}
          >
            Clear
          </Text>
        </TouchableOpacity>
        <TextInput
          style={{
            margin: 10,
            borderWidth: 1,
            borderColor: "black",
            height: 50,
            padding: 10,
            flex: 2,
            borderRadius: 5,
          }}
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
          onEndEditing={async () => {
            setLoading(true);
            setAllDeals([]);
            const allDeals = await getSearchDeals(searchTerm);
            setAllDeals(allDeals);
            setLoading(false);
          }}
        ></TextInput>
        <TouchableOpacity
          style={{
            flex: 1,
            marginRight: 10,
            backgroundColor: "grey",
            height: 50,
          }}
          onPress={async () => {
            setLoading(true);
            setAllDeals([]);
            const allDeals = await getSearchDeals(searchTerm);
            setAllDeals(allDeals);
            setLoading(false);
          }}
        >
          <Text
            style={{
              height: 50,
              textAlign: "center",
              textAlignVertical: "center",
            }}
          >
            Search
          </Text>
        </TouchableOpacity>
      </View>
      {allDeals.length ? (
        <FlatList
          data={allDeals}
          renderItem={({ item }) => <DealsItem item={item} />}
          keyExtractor={(item) => item.key}
        ></FlatList>
      ) : (
        <Text style={{ fontWeight: "bold", textAlign: "center" }}>
          {loading ? "Loading..." : "No Data Found!!"}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  image: {
    width: "100%",
    height: 150,
  },
});
export default Home;
