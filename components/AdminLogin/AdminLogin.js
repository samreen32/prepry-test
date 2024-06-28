import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../assets/styles/globalStyles';
import { Button, TextInput } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function AdminLogin() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPassSecure, setIsPassSecure] = useState(true);

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
                    />
                    <Button
                        mode="contained"
                        onPress={() => navigation.navigate("AdminDrawer")}
                        style={[globalStyles.getStartedButton, { backgroundColor: "#1C1A5E", marginBottom: 20 }]}
                    >
                        Login
                    </Button>
                </ScrollView>
            </View>
        </View>
    );
}
