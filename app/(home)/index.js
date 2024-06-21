
import React from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Entypo, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Index = () => {
  const navigation = useNavigation();
  const handleAdminLogin = () => {
    // Navigate to admin login screen
    navigation.navigate('adminlogin');
  };

  const handleEmployeeLogin = () => {
    // Navigate to employee login screen
    navigation.navigate('employeelogin');
  };

  return (
    <ScrollView>
      <LinearGradient colors={["#FF69B4", "#E9E4F0"]} style={styles.container}>
        <View style={styles.header}>
          <Feather name="bar-chart" size={24} color="black" />
          <Text style={styles.headerText}>EMPLOYEE MANAGEMENT SYSTEM</Text>
          <Entypo name="lock" size={24} color="black" />
        </View>
        <View>
          <Pressable onPress={handleAdminLogin} style={styles.button}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="admin-panel-settings" size={24} color="black" />
            </View>
            <Text style={styles.buttonText}>ADMIN</Text>
          </Pressable>
          <Pressable onPress={handleEmployeeLogin} style={styles.button}>
            <View style={styles.iconContainer}>
              <Ionicons name="people" size={24} color="black" />
            </View>
            <Text style={styles.buttonText}>EMPLOYEE</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    height: 800,
    padding: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#FFB6C1",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    marginTop: 7,
    fontWeight: "600",
  },
});

