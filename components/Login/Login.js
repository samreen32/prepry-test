import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../assets/styles/globalStyles';
import { Button, TextInput } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPassSecure, setIsPassSecure] = useState(true);

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
          />
          <Button
            mode="contained"
            onPress={() => navigation.navigate("Signup")}
            style={[globalStyles.getStartedButton, { backgroundColor: "#f39c12", marginBottom: 20 }]}
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
