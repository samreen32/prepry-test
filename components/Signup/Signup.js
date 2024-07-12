import React, { useState, useEffect } from 'react';
import {
    View, Text, ImageBackground, TouchableOpacity, LayoutAnimation, Animated, Platform, UIManager
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../assets/styles/globalStyles';
import { Button, TextInput, Checkbox } from 'react-native-paper';

// Enable LayoutAnimation for iOS and Android
if (Platform.OS === 'android' || Platform.OS === 'ios') {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function Signup() {
    const navigation = useNavigation();
    const [isPassSecure, setIsPassSecure] = useState(true);
    const [currentField, setCurrentField] = useState('Learning Path');
    const [formOpacity] = useState(new Animated.Value(1));
    const [selectedExams, setSelectedExams] = useState({});
    const [selectedOccupations, setSelectedOccupations] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        Animated.timing(formOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [currentField]);

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
            default:
                break;
        }
    };

    const handleCheckboxChange = (type, value) => {
        if (type === 'occupation') {
            setSelectedOccupations({
                ...selectedOccupations,
                [value]: !selectedOccupations[value],
            });
        }
    };

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
                                    onPress={() => handleCheckboxChange('occupation', occupation)}
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
                            style={[globalStyles.input, {
                                height: 40,
                            }]}
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
                            style={[globalStyles.input, {
                                height: 40,
                            }]}
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
                            style={[globalStyles.input, {
                                height: 40,
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
                            value={password}
                            onChangeText={setPassword}
                        />
                    )}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        {currentField !== 'Password' && (
                            <Button mode="contained"
                                style={{ backgroundColor: "gray", marginBottom: 30, marginTop: 10, width: 120 }}
                                onPress={handleNext}>
                                <Text style={globalStyles.buttonText}>Skip</Text>
                            </Button>
                        )}
                        {currentField !== 'Password' && (
                            <Button mode="contained"
                                style={{ backgroundColor: "#f39c12", marginBottom: 30, marginTop: 10, width: 120 }}
                                onPress={handleNext}>
                                <Text style={globalStyles.buttonText}>Next</Text>
                            </Button>
                        )}
                    </View>

                    {currentField === 'Password' && (
                        <Button mode="contained"
                            style={globalStyles.getStartedButton}
                            labelStyle={globalStyles.buttonLabel}
                            onPress={() => navigation.navigate('UserDrawer')}
                        > <Text
                            style={[globalStyles.buttonText, { color: "black" }]}
                        >
                                Sign Up
                            </Text>
                        </Button>
                    )}

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
