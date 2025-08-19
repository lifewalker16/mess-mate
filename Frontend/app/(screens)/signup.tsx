import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Checkbox from "expo-checkbox"; 

export default function SignupScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("student");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const router = useRouter();

  const handleSignup = async () => {
    if (!agreeTerms) {
      alert("You must agree to the Terms and Conditions.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.3:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          email,
          password,
          user_type: userType,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.error || "Signup failed");
        return;
      }

      alert("Signup successful!");
      router.push("/(screens)/login");
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Join our hostel mess management system
        </Text>

        {/* Full Name */}
        <View
          style={[
            styles.inputContainer,
            focusedInput === "fullName" && styles.inputFocused,
          ]}
        >
          <Ionicons name="person-outline" size={20} color="gray" />
          <TextInput
            style={styles.inputField}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
            onFocus={() => setFocusedInput("fullName")}
            onBlur={() => setFocusedInput(null)}
          />
        </View>

        {/* Email */}
        <View
          style={[
            styles.inputContainer,
            focusedInput === "email" && styles.inputFocused,
          ]}
        >
          <Ionicons name="mail-outline" size={20} color="gray" />
          <TextInput
            style={styles.inputField}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            onFocus={() => setFocusedInput("email")}
            onBlur={() => setFocusedInput(null)}
          />
        </View>

        {/* Picker */}
        <View style={styles.pickerWrapper}>
          <Ionicons name="people-outline" size={20} color="gray" style={{ marginLeft: 8 }} />
          <Picker
            selectedValue={userType}
            onValueChange={(value) => setUserType(value)}
            style={styles.picker}
          >
            <Picker.Item label="Student" value="student" />
            <Picker.Item label="Admin" value="admin" />
          </Picker>
        </View>

        {/* Password */}
        <View
          style={[
            styles.inputContainer,
            focusedInput === "password" && styles.inputFocused,
          ]}
        >
          <Ionicons name="lock-closed-outline" size={20} color="gray" />
          <TextInput
            style={styles.inputField}
            placeholder="Create password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            onFocus={() => setFocusedInput("password")}
            onBlur={() => setFocusedInput(null)}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={22}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <View
          style={[
            styles.inputContainer,
            focusedInput === "confirmPassword" && styles.inputFocused,
          ]}
        >
          <Ionicons name="checkmark-done-outline" size={20} color="gray" />
          <TextInput
            style={styles.inputField}
            placeholder="Confirm password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onFocus={() => setFocusedInput("confirmPassword")}
            onBlur={() => setFocusedInput(null)}
          />
        </View>

        {/* Terms & Conditions */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={agreeTerms}
            onValueChange={setAgreeTerms}
            color={agreeTerms ? "#FF7E5F" : undefined}
          />
          <Text style={styles.checkboxText}>
            I agree to the{" "}
            <Text style={styles.link}>Terms and Conditions</Text>
          </Text>
        </View>

        {/* Gradient Button */}
        <TouchableOpacity
          onPress={handleSignup}
          style={{ marginTop: 15 }}
          disabled={!agreeTerms}
        >
          <LinearGradient
            colors={["#FF7E5F", "#FF4500"]}
            style={[
              styles.button,
              !agreeTerms && { opacity: 0.5 },
            ]}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footer}>
          Already have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => router.push("/(screens)/login")}
          >
            Sign in here
          </Text>
        </Text>
      </View>

      <Text style={styles.appFooter}>Hostel Mess Management System</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fffaf5",
  },
  card: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 22,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  logo: {
    width: 90,
    height: 90,
  },
  title: { 
    fontSize: 22, 
    fontWeight: "700", 
    textAlign: "center",
    marginBottom: 4
  },
  subtitle: { 
    textAlign: "center", 
    marginBottom: 18, 
    color: "gray",
    fontSize: 14 
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fafafa",
  },
  inputField: {
    flex: 1,
    padding: 12,
  },
  inputFocused: {
    borderColor: "#FF7E5F",
  },
  pickerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
    backgroundColor: "#fafafa",
  },
  picker: {
    flex: 1,
    height: 45,
  },
  button: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkboxText: {
    marginLeft: 8,
    color: "gray",
    fontSize: 13,
  },
  link: { color: "#FF4500", fontWeight: "600" },
  footer: { 
    textAlign: "center", 
    marginTop: 15, 
    color: "gray", 
    fontSize: 14 
  },
  appFooter: { 
    textAlign: "center", 
    marginTop: 12, 
    color: "gray", 
    fontSize: 12 
  },
});
