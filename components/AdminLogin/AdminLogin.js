import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../assets/styles/globalStyles';
import { Button, TextInput } from 'react-native-paper';
import axios from 'axios';
import config from '../../frontend/config';
import { useAuth } from '../../frontend/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AdminLogin() {
    const { adminLogin, showToast, setIsAuthenticated, setAdminInfo } = useAuth();
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPassSecure, setIsPassSecure] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${config.urls.AUTH_API}/adminLogin`, { email, password });
            const { success, message, token: adminToken, admin } = response.data;
            if (success) {
                await adminLogin(adminToken, admin);
                fetchData(adminToken);
                setIsAuthenticated(true);
                showToast('Admin logged in.');
                navigation.replace('AdminDrawer');
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
    const fetchData = async (adminToken) => {
        try {
            const response = await axios.get(`${config.urls.AUTH_API}/getAdmin`, {
                headers: { 'token': adminToken },
            });
            const userData = response.data.admin;
            setAdminInfo(userData);
            await AsyncStorage.setItem("admin", JSON.stringify(userData));
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.loginContainer}>
                <View style={{ padding: 30 }}>
                    <Text
                        style={{
                            fontSize: 30, fontWeight: 'bold',
                            color: '#fff', marginTop: 20,
                            textAlign: "center"
                        }}
                    >
                        Welcome Back!
                    </Text>
                    <Text
                        style={{
                            fontSize: 22, fontWeight: 'bold',
                            color: '#fff', marginBottom: 10,
                            textAlign: "center"
                        }}
                    >
                        Admin Login!
                    </Text>
                </View>
                <ScrollView contentContainerStyle={[globalStyles.loginFieldsContainer, { height: "auto", justifyContent: "center", display: "flex" }]}>
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
                </ScrollView>
            </View>
        </View>
    );
}
