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

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const signUp = async () => {
    if (password === confirmPassword) {
      if (username && email && password && description) {
        setErrorMessage("");
        console.log("pret à l'incription");
        try {
          const result = await axios.post(
            "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
            { email, username, password, description }
          );
          console.log(result.data);
          alert("Votre Compte à bien été créé");
        } catch (error) {
          console.log(error.errorMessage);
          setErrorMessage(
            "l'incription à échouée veuillez recommencer ultérieurement "
          );
        }
      } else {
        setErrorMessage("Merci de remplir tous les champs !");
      }
    } else {
      setErrorMessage("Les mots de passe ne sont pas identiques");
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.content}
      style={styles.container}
    >
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.h1}>Sign Up</Text>

      <TextInput
        placeholder="email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
        }}
        style={styles.input}
      />
      <TextInput
        placeholder="username"
        value={username}
        onChangeText={(text) => {
          setUsername(text);
        }}
        style={styles.input}
      />
      <TextInput
        placeholder="Describe your self in a few words..."
        value={description}
        onChangeText={(text) => {
          setDescription(text);
        }}
        style={[styles.input, styles.description]}
        multiline
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
      <TextInput
        placeholder="confirm password"
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
        }}
        style={styles.input}
        secureTextEntry
      />
      {/* <Text>{password}</Text> */}
      <TouchableOpacity
        onPress={signUp}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.txtbtn}>Sign up</Text>
      </TouchableOpacity>
      {errorMessage && <Text>{errorMessage}</Text>}

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignIn");
        }}
        activeOpacity={0.8}
      >
        <Text style={styles.signin}>Already have an account ? Sign in</Text>
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
  signin: {
    marginBottom: 50,
  },
});
