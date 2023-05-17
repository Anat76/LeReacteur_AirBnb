import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";
import { useState } from "react";
import axios from "axios";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const signIn = async () => {
    if (password && email) {
      setErrorMessage("");
      try {
        const result = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
          { email, password }
        );
        console.log(result.data);
        if (result.data.token) {
          const userToken = result.data.token;
          alert("Vous êtes connecté");
          setToken(userToken);
        }
      } catch (error) {
        // console.log(error);
        setErrorMessage(
          "la connection à échouée veuillez recommencer ultérieurement "
        );
      }
    } else {
      setErrorMessage("Veuillez remplir tous les champs !");
    }
  };
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.content}
      style={styles.container}
    >
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.h1}>Sign In</Text>

      <TextInput
        placeholder="email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
        }}
        style={styles.input}
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
        }}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={signIn}
      >
        <Text style={styles.txtbtn}>Sign in</Text>
      </TouchableOpacity>
      {errorMessage && <Text>{errorMessage}</Text>}

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignUp");
        }}
        activeOpacity={0.8}
      >
        <Text style={styles.signup}>Create an account</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  h1: {
    marginVertical: 30,
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    width: "80%",
    height: 30,
    marginVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#EB5A62",
  },
  description: {
    borderWidth: 2,
    borderColor: "#EB5A62",
    height: 100,
    paddingLeft: 5,
  },
  button: {
    marginVertical: 20,
    height: 40,
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EB5A62",
    borderRadius: 20,
  },
  txtbtn: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E1E1E",
  },
  signup: {
    marginBottom: 50,
  },
});
