import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const AdminLoginScreen = () => {
  const navigation = useNavigation();
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const handleLogin = () => {
    navigation.navigate('Dashboard');
    // Here you can implement your logic to authenticate admin credentials
    if (adminId === "admin1234" && adminPassword === "12345") {
      // Navigate to Admin Dashboard or any other screen
    
    } else {
      // Show error message for incorrect credentials
      // alert('Invalid admin ID or password');
      navigation.navigate('Dashboard');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#CC99CC", "#E9E4F0"]} style={styles.gradientContainer}>
        <Text style={styles.title}>ADMIN LOGIN</Text>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Admin ID:</Text>
          <TextInput
            style={styles.input}
            value={adminId}
            onChangeText={setAdminId}
            placeholder="Enter admin ID"
          />

          <Text style={styles.label}>Admin Password:</Text>
          <TextInput
            style={styles.input}
            value={adminPassword}
            onChangeText={setAdminPassword}
            placeholder="Enter password"
            secureTextEntry
          />
          
          <Button title="Login" onPress={handleLogin} />

        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  formContainer: {
    width: '80%',
    maxWidth: 400,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
});

export default AdminLoginScreen;
