import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

import AuthHeader from "@/components/common/AuthHeader";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/hooks/useAuth";
import { styles } from "../../styles/signup.style";
const Signup = () => {
  const router = useRouter();

  const { signup } = useAuth();

  const [name, setName] = useState("Nikhil");
  const [email, setEmail] = useState("nikhillodhi143@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [confirmPassword, setConfirmPassword] = useState("12345678");
  const [phone, setPhone] = useState("1234567890");

  const [loading, setLoading] = useState(false);
  const handleSignup = async () => {
    if (!name.trim()) {
      return Alert.alert("Error", "Please enter your full name.");
    }

    if (!email.trim()) {
      return Alert.alert("Error", "Please enter your email.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return Alert.alert("Error", "Please enter a valid email.");
    }

    if (password.length < 6) {
      return Alert.alert(
        "Error",
        "Password must be at least 6 characters."
      );
    }

    if (password !== confirmPassword) {
      return Alert.alert(
        "Error",
        "Passwords do not match."
      );
    }

    if (phone.trim().length < 10) {
      return Alert.alert(
        "Error",
        "Please enter a valid phone number."
      );
    }

    try {
      setLoading(true);

      await signup(
        name.trim(),
        email.trim().toLowerCase(),
        password,
        phone.trim()
      );

      Alert.alert("Success", "Account created successfully.");

      router.replace("/(tabs)/home");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <LinearGradient
      colors={[
        Colors.background,
        Colors.brandDark,
        Colors.brandPrimary,
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <AuthHeader
            showBack
            onBack={() => router.back()}
          />

          <View style={styles.header}>
            <Text style={styles.hello}>Create Account</Text>

            <Text style={styles.welcome}>
              Join XChat today
            </Text>

            <Text style={styles.plant}>🪴</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Sign Up</Text>
            <Input
              placeholder="Full Name"
              icon="person-outline"
              value={name}
              onChangeText={setName}
            />
            <Input
              placeholder="Email"
              icon="mail-outline"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Input
              placeholder="Password"
              icon="lock-closed-outline"
              isPassword
              value={password}
              onChangeText={setPassword}
            />

            <Input
              placeholder="Confirm Password"
              icon="shield-checkmark-outline"
              isPassword
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <Input
              placeholder="Phone Number"
              icon="call-outline"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            <Button
              title="Create Account"
              loading={loading}
              onPress={handleSignup}
            />

            <View style={styles.bottomRow}>
              <Text style={styles.bottomText}>
                Already have an account?
              </Text>

              <TouchableOpacity
                onPress={() => router.push("/login")}
              >
                <Text style={styles.login}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Signup;