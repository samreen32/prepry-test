import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../assets/styles/globalStyles';
import { Button, TextInput } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import config from '../../frontend/config';
import { useAuth } from '../../frontend/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const { showToast, login, setIsAuthenticated, setUser } = useAuth();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPassSecure, setIsPassSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${config.urls.AUTH_API}/login`, { email, password });
      const { success, message, token: userToken, user } = response.data;
      if (success) {
        await login(userToken, user);
        fetchData(userToken);
        setIsAuthenticated(true);
        showToast('You have been logged in.');
        navigation.replace('UserDrawer');
      } else {
        showToast('Login Failed: ' + message);
      }
    } catch (error) {
      console.error(error);
      showToast('Login Failed: An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch user info once and save it to AsyncStorage
  const fetchData = async (userToken) => {
    try {
      const response = await axios.get(`${config.urls.AUTH_API}/getUser`, {
        headers: { 'token': userToken },
      });
      const userData = response.data.user;
      setUser(userData);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.loginContainer}>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#fff', marginBottom: 20 }}>
            Sign in now
          </Text>
          <Text style={{ fontSize: 18, color: '#fff', marginBottom: 20 }}>
            Welcome Back!
          </Text>
        </View>
        <ScrollView contentContainerStyle={globalStyles.loginFieldsContainer}>
          <Text>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={{ marginBottom: 20, marginTop: 10 }}
            mode="outlined"
            placeholder="Enter your email"
          />
          <Text>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={isPassSecure}
            style={{ marginBottom: 20, marginTop: 10 }}
            mode="outlined"
            placeholder="Enter your password"
            right={
              <TextInput.Icon
                icon={isPassSecure ? "eye" : "eye-off"}
                onPress={() => setIsPassSecure(prev => !prev)}
              />
            }
          />
          <Button
            mode="contained"
            onPress={handleLogin}
            style={[globalStyles.getStartedButton, { backgroundColor: "#f39c12", marginBottom: 20 }]}
            loading={loading}
            disabled={loading}
          >
            Login
          </Button>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}
            style={{ textAlign: 'center', margin: "auto" }}
          >
            <Text>New Member? Register</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
