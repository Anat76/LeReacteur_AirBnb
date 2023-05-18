import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        );
        // console.log("importé");
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator size="large" />
  ) : (
    <View style={StyleSheet.container}>
      <FlatList
        data={data}
        keyExtractor={(data) => data._id}
        renderItem={(data) => {
          // console.log(data.item);
          // console.log(data.item.photos[0].url);
          // console.log(data.item.user.account.photo.url);
          return (
            <TouchableOpacity
              onPress={() => {
                console.log("Room offer");
              }}
            >
              <ImageBackground
                source={{ uri: data.item.photos[0].url }}
                style={styles.ImgRoom}
              >
                <Text style={styles.price}>{data.item.price} €</Text>
              </ImageBackground>
              <View>
                <Text>{data.item.title}</Text>
                <View>
                  <Text>{data.item.reviews}</Text>
                </View>
                <Image
                  source={{ uri: data.item.user.account.photo.url }}
                  style={styles.avatar}
                />
              </View>
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => <Text style={styles.separator}></Text>}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { padding: 10 },
  ImgRoom: {
    width: "100%",
    height: 150,
    justifyContent: "flex-end",
  },
  price: {
    color: "white",
    padding: 10,
    backgroundColor: "#1E1E1E",
    width: 70,
    marginBottom: 10,
    fontWeight: "bold",
  },
  separator: {
    backgroundColor: "grey",
    height: 1,
    marginVertical: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
