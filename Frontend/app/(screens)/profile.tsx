import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch profile from backend
  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token"); // get saved token
      if (!token) {
        Alert.alert("Error", "No token found. Please log in again.");
        return;
      }

      const res = await fetch("http://192.168.1.3:5000/profile", {
        // ⚠️ use http://localhost:5000 if web, 10.0.2.2 for Android emulator
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data.user); // { id, type, iat, exp }
      } else {
        Alert.alert("Error", data.error || "Failed to load profile");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    Alert.alert("Logged out", "You have been logged out.");
    // TODO: Navigate back to login screen
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#FF4500" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center", marginTop: 50, fontSize: 16 }}>
          No profile data found. Please log in again.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Gradient */}
      <LinearGradient colors={["#FF7E5F", "#FF4500"]} style={styles.header}>
        <Text style={styles.headerText}>My Profile</Text>
      </LinearGradient>

      {/* Profile Card */}
      <View style={styles.card}>
        <Image
          source={{ uri: "https://i.pravatar.cc/300" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>ID: {user.id}</Text>
        <Text style={styles.email}>Role: {user.type}</Text>
      </View>

      {/* Options */}
      <View style={styles.options}>
        <TouchableOpacity style={styles.option}>
          <Ionicons name="person-outline" size={22} color="#FF4500" />
          <Text style={styles.optionText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="settings-outline" size={22} color="#FF4500" />
          <Text style={styles.optionText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="red" />
          <Text style={[styles.optionText, { color: "red" }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fffaf5",
  },
  container: {
    flex: 1,
    backgroundColor: "#fffaf5",
  },
  header: {
    height: 120,
    justifyContent: "flex-end",
    padding: 20,
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    alignItems: "center",
    backgroundColor: "white",
    marginTop: -50,
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  role: {
    fontSize: 14,
    color: "#FF4500",
    fontWeight: "600",
  },
  options: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
});
