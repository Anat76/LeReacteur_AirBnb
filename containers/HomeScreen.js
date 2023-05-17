import { useNavigation } from "@react-navigation/core";
import { Button, Text, View } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        );
        console.log("importé");
        setData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <View></View>
    // <View>
    //   <Text>Welcome home!</Text>
    //   <Button
    //     title="Go to Profile"
    //     onPress={() => {
    //       navigation.navigate("Profile", { userId: 123 });
    //     }}
    //   />
    // </View>
  );
}
