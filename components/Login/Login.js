import React, { useRef, useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../assets/styles/globalStyles';
import LottieView from "lottie-react-native";
import { Button, TextInput } from 'react-native-paper';

export default function Login() {
  const navigation = useNavigation();
  const animation = useRef(null);
  const [isPassSecure, setIsPassSecure] = useState(true);

  return (
    <View style={globalStyles.container}>
      <ImageBackground source={require('../../assets/img/register-main.webp')} resizeMode="cover" style={globalStyles.image}>
        <View style={globalStyles.form}>
          <View style={[globalStyles.logo, { resizeMode: "cover", alignSelf: "center" }]}>
            <LottieView
              autoPlay
              ref={animation}
              style={{
                width: 80,
                height: 80,
                marginTop: -20
              }}
              source={require('../../assets/animation/Animation - 1710132860264.json')}
            />
          </View>
          <View style={globalStyles.logoContainer}>
            <Image
              style={[globalStyles.logo, { resizeMode: "cover", marginBottom: 20 }]}
              source={require("../../assets/img/logo.png")}
            />
            <Text style={globalStyles.loginText}>Login</Text>
          </View>

          <TextInput
            placeholder="Email"
            type="outlined"
            selectionColor='#fe3c72'
            activeUnderlineColor='#fe3c72'
            style={[globalStyles.input, {
              height: 40, borderTopRightRadius: 30, borderTopLeftRadius: 30, borderRadius: 30
            }]}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Password"
            selectionColor='#fe3c72'
            activeUnderlineColor='#fe3c72'
            style={[globalStyles.input, {
              height: 40, borderTopRightRadius: 30, borderTopLeftRadius: 30, borderRadius: 30
            }]}
            secureTextEntry={isPassSecure}
            right={
              <TextInput.Icon
                icon={isPassSecure ? "eye" : "eye-off"}
                onPress={() => {
                  setIsPassSecure((prev) => !prev);
                }}
                style={{ marginTop: 30 }}
              />
            }
          />
          <Button mode="contained" style={{ backgroundColor: "#fe3c72", marginBottom: 20, marginTop: 10 }}
            onPress={() => navigation.navigate("UserDrawer")}>
            <Text style={globalStyles.buttonText}>Login</Text>
          </Button>
          <View style={globalStyles.footer}>
            <Text style={globalStyles.footerText}>New member? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={globalStyles.footerActionText}>Sign up</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={globalStyles.animationContainer}>
            <LottieView
              autoPlay
              ref={animation}
              style={{
                width: 165,
                height: 165,
              }}
              source={require('../../assets/animation/Animation - 1710132860264.json')}
            />
          </View> */}
        </View>
      </ImageBackground>
    </View>
  );
}
