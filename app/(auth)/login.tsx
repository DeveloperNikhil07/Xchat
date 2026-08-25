import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";


import { useAuth } from "@/hooks/useAuth";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Colors } from "@/constants/theme";
import { styles } from "../../styles/login.style";

const Login = () => {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("nikhillodhi143@gmail.com");
  const [password, setPassword] = useState("12345678");

  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    if (!email.trim()) {
      return Alert.alert(
        "Error",
        "Please enter your email."
      );
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return Alert.alert(
        "Error",
        "Please enter a valid email."
      );
    }

    if (!password) {
      return Alert.alert(
        "Error",
        "Please enter your password."
      );
    }

    try {
      setLoading(true);

      await login(
        email.trim().toLowerCase(),
        password
      );

      Alert.alert(
        "Success",
        "Login successful."
      );

      router.replace("/(tabs)/home");
    } catch (error: any) {
      let message = "Something went wrong.";

      switch (error.code) {
        case "auth/invalid-credential":
          message =
            "Invalid email or password.";
          break;

        case "auth/user-disabled":
          message =
            "Your account has been disabled.";
          break;

        case "auth/network-request-failed":
          message =
            "Check your internet connection.";
          break;

        default:
          message =
            error.message || message;
      }

      Alert.alert("Login Failed", message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient
        colors={[Colors.background, Colors.brandDark, Colors.brandPrimary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >

        {/* Header */}

        <View style={styles.header}>
          <Text style={styles.hello}>
            Hello!
          </Text>

          <Text style={styles.welcome}>
            Welcome to XChat
          </Text>


          <Text style={styles.plant}>
            🪴
          </Text>

        </View>


        {/* White Card */}

        <View style={styles.card}>

          <Text style={styles.loginTitle}>
            Login
          </Text>


          {/* Email */}

            <Input
              placeholder="Email"
              icon="mail-outline"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />

          {/* Password */}

            <Input
              placeholder="Password"
              icon="lock-closed-outline"
              isPassword
              value={password}
              onChangeText={setPassword}
            />



          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Coming Soon",
                "Forgot Password will be available soon."
              )
            }
          >
            <Text style={styles.forgot}>
              Forgot Password?
            </Text>
          </TouchableOpacity>



          {/* Login Button */}

          <Button
            title="Login"
            loading={loading}
            onPress={handleLogin}
          />



          {/* Divider */}

          <View style={styles.divider}>

            <View style={styles.line} />

            <Text style={styles.orText}>
              Or login with
            </Text>

            <View style={styles.line} />

          </View>




          {/* Social Buttons */}

          <View style={styles.socialContainer}>


            <TouchableOpacity style={styles.socialButton}>

              <FontAwesome
                name="facebook"
                size={24}
                color="#1877F2"
              />

            </TouchableOpacity>



            <TouchableOpacity style={styles.socialButton}>

              <AntDesign
                name="google"
                size={24}
                color="#EA4335"
              />

            </TouchableOpacity>



            <TouchableOpacity style={styles.socialButton}>

              <Ionicons
                name="logo-apple"
                size={26}
                color="#000"
              />

            </TouchableOpacity>


          </View>




          {/* Bottom */}

          <View style={styles.bottomRow}>

            <Text style={styles.bottomText}>
              Don't have an account?
            </Text>


            <TouchableOpacity
              onPress={() => router.push("/signup")}
            >

              <Text style={styles.signup}>
                Sign Up
              </Text>

            </TouchableOpacity>


          </View>


        </View>


      </LinearGradient>


    </SafeAreaView>
  );
};


export default Login;