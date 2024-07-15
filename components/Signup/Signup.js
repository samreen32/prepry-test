import React, { useState, useEffect } from 'react';
import {
  View, Text, ImageBackground,
  TouchableOpacity, LayoutAnimation,
  Animated, Platform, UIManager
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../assets/styles/globalStyles';
import { Button, TextInput, Checkbox } from 'react-native-paper';
import axios from 'axios';
import config from '../../frontend/config';
import AppLoader from '../../frontend/Loader/AppLoader';
import { useAuth } from '../../frontend/context/AuthContext';

// Enable LayoutAnimation for iOS and Android
if (Platform.OS === 'android' || Platform.OS === 'ios') {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function Signup() {
  const navigation = useNavigation();
  const [isPassSecure, setIsPassSecure] = useState(true);
  const [currentField, setCurrentField] = useState('Occupation');
  const [formOpacity] = useState(new Animated.Value(1));
  const [selectedOccupations, setSelectedOccupations] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useAuth(); 

  useEffect(() => {
    Animated.timing(formOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [currentField]);

  const handleSubmit = async () => {
    setLoading(true);
    const selectedOccupation = Object.keys(selectedOccupations).find(key => selectedOccupations[key]);
    const userData = {
      fullName: name,
      email: email,
      password: password,
      occupation: selectedOccupation,
      role: "GUEST",
      profileImage: ""
    };
    console.log(userData, "fsfjs");

    try {
      const response = await axios.post(`${config.urls.AUTH_API}/userRegister`, userData);
      console.log(response.data, "response");
      if (response.data.success) {
        showToast('Registration Successful. You can Login now');
        navigation.replace('Login');
      } else {
        showToast(response.data.message);
      }
    } catch (error) {
      console.error(error);
      showToast('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    switch (currentField) {
      case 'Occupation':
        setCurrentField('Name');
        break;
      case 'Name':
        setCurrentField('Email');
        break;
      case 'Email':
        setCurrentField('Password');
        break;
      case 'Password':
        handleSubmit();
        break;
      default:
        break;
    }
  };

  const handleCheckboxChange = (value) => {
    setSelectedOccupations({
      ...selectedOccupations,
      [value]: !selectedOccupations[value],
    });
  };

  if (loading) {
    return <AppLoader />;
  }

  return (
    <Animated.View style={[globalStyles.container, { opacity: formOpacity }]}>
      <ImageBackground
        source={require('../../assets/img/wave.png')} resizeMode="cover"
        style={globalStyles.image}
      >
        <View style={globalStyles.form}>
          <View style={globalStyles.logoContainer}>
            <Text style={globalStyles.loginText}>Sign Up</Text>
          </View>

          {currentField === 'Occupation' && (
            <>
              <Text style={{ color: 'white', marginBottom: 6 }}>Select Your Occupation</Text>
              {['Sonologist', 'Sonographer', 'Student'].map((occupation, index) => (
                <Checkbox.Item
                  key={index}
                  label={occupation}
                  labelStyle={{ color: 'white' }}
                  status={selectedOccupations[occupation] ? 'checked' : 'unchecked'}
                  onPress={() => handleCheckboxChange(occupation)}
                />
              ))}
            </>
          )}

          {currentField === 'Name' && (
            <TextInput
              placeholder="Name"
              type="outlined"
              selectionColor='#fe3c72'
              activeUnderlineColor='#fe3c72'
              style={[globalStyles.input, { height: 40 }]}
              value={name}
              onChangeText={setName}
            />
          )}

          {currentField === 'Email' && (
            <TextInput
              placeholder="Email"
              type="outlined"
              selectionColor='#fe3c72'
              activeUnderlineColor='#fe3c72'
              style={[globalStyles.input, { height: 40 }]}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          )}

          {currentField === 'Password' && (
            <TextInput
              placeholder="Set your Password"
              type="outlined"
              selectionColor='#fe3c72'
              activeUnderlineColor='#fe3c72'
              style={[globalStyles.input, { height: 40 }]}
              secureTextEntry={isPassSecure}
              right={
                <TextInput.Icon
                  icon={isPassSecure ? "eye" : "eye-off"}
                  onPress={() => setIsPassSecure(prev => !prev)}
                />
              }
              value={password}
              onChangeText={setPassword}
            />
          )}

          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            {currentField !== 'Password' && (
              <Button
                mode="contained"
                style={{ backgroundColor: "gray", marginBottom: 30, marginTop: 10, width: 120 }}
                onPress={handleNext}
              >
                <Text style={globalStyles.buttonText}>Skip</Text>
              </Button>
            )}
            <Button
              mode="contained"
              loading={loading}
              disabled={loading}
              style={{ backgroundColor: "#f39c12", marginBottom: 30, marginTop: 10, width: 120 }}
              onPress={handleNext}
            >
              <Text style={globalStyles.buttonText}>{currentField === 'Password' ? 'Sign Up' : 'Next'}</Text>
            </Button>
          </View>

          <View style={globalStyles.footer}>
            <Text style={globalStyles.footerText}>Already a member? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={globalStyles.footerActionText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </Animated.View>
  );
}
