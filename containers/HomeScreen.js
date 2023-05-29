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
import { AntDesign } from "@expo/vector-icons";

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

  const ratingStar = (Rating) => {
    const tab = [];
    for (let i = 0; i <= 5; i++) {
      if (i <= Rating) {
        tab.push(<AntDesign name="star" size={24} color="#FFB000" key={i} />);
      } else {
        tab.push(<AntDesign name="star" size={24} color="#BBBBBB" key={i} />);
      }
    }
    return tab;
  };

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
          // console.log(data.item._id);
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Profile", { id: data.item._id });
              }}
            >
              <ImageBackground
                source={{ uri: data.item.photos[0].url }}
                style={styles.ImgRoom}
              >
                <Text style={styles.price}>{data.item.price} €</Text>
              </ImageBackground>
              <View style={styles.roomDescription}>
                <View style={styles.roomResume}>
                  <Text style={styles.h2} numberOfLines={1}>
                    {data.item.title}
                  </Text>
                  <View style={styles.ratingStar}>
                    {ratingStar(data.item.ratingValue)}
                    <Text style={styles.reviews}>
                      {data.item.reviews} reviews
                    </Text>
                  </View>
                </View>
                <View>
                  <Image
                    source={{ uri: data.item.user.account.photo.url }}
                    style={styles.avatar}
                  />
                </View>
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
  container: {
    paddingHorizontal: 30,
  },
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
    height: 2,
    marginVertical: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  roomDescription: {
    flexDirection: "row",
    paddingVertical: 20,
    alignItems: "center",
  },
  roomResume: {
    width: "80%",
    justifyContent: "space-between",
    gap: 15,
  },
  h2: {
    fontSize: 18,
    fontWeight: "bold",
  },
  ratingStar: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: 5,
    gap: 5,
    alignItems: "center",
  },
  reviews: {
    marginLeft: 10,
    color: "grey",
  },
});
