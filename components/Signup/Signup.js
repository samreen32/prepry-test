import React, { useRef, useState, useEffect } from 'react';
import {
    View, Text, ImageBackground, TouchableOpacity, LayoutAnimation, Animated, Platform, UIManager
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../assets/styles/globalStyles';
import { Button, TextInput, Checkbox } from 'react-native-paper';
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

// Enable LayoutAnimation for iOS and Android
if (Platform.OS === 'android' || Platform.OS === 'ios') {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function Signup() {
    const navigation = useNavigation();
    const animation = useRef(null);
    const [isPassSecure, setIsPassSecure] = useState(true);
    const [currentField, setCurrentField] = useState('Learning Path');
    const [formOpacity] = useState(new Animated.Value(1));

    const [learningPath, setLearningPath] = useState('');
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
            case 'Learning Path':
                setCurrentField('Exam');
                break;
            case 'Exam':
                setCurrentField('Occupation');
                break;
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
        if (type === 'exam') {
            setSelectedExams({
                ...selectedExams,
                [value]: !selectedExams[value],
            });
        } else if (type === 'occupation') {
            setSelectedOccupations({
                ...selectedOccupations,
                [value]: !selectedOccupations[value],
            });
        }
    };

    return (
        <Animated.View style={[globalStyles.container, { opacity: formOpacity }]}>
            <ImageBackground
                source={require('../../assets/img/wave (2).png')} resizeMode="cover"
                style={globalStyles.image}
            >
                <View style={globalStyles.form}>
                    <View style={globalStyles.logoContainer}>
                        <Text style={globalStyles.loginText}>Sign Up</Text>
                    </View>

                    {currentField === 'Learning Path' && (
                        <>
                            <Text style={{ color: 'white', marginBottom: 10 }}>Choose Your Learning Path</Text>
                            <Picker
                                selectedValue={learningPath}
                                style={globalStyles.input}
                                onValueChange={(itemValue) => setLearningPath(itemValue)}
                            >
                                <Picker.Item label="Select Learning Path" value="" />
                                <Picker.Item label="Path 1" value="path1" />
                                <Picker.Item label="Path 2" value="path2" />
                                <Picker.Item label="Path 3" value="path3" />
                            </Picker>
                        </>
                    )}

                    {currentField === 'Exam' && (
                        <>
                            <Text style={{ color: 'white', marginBottom: 6 }}>Select Your Exam</Text>
                            {['Exam 1', 'Exam 2', 'Exam 3'].map((exam, index) => (
                                <Checkbox.Item
                                    key={index}
                                    label={exam}
                                    labelStyle={{ color: 'white' }}  // Set label color to white
                                    status={selectedExams[exam] ? 'checked' : 'unchecked'}
                                    onPress={() => handleCheckboxChange('exam', exam)}
                                />
                            ))}
                        </>
                    )}

                    {currentField === 'Occupation' && (
                        <>
                            <Text style={{ color: 'white', marginBottom: 6 }}>Select Your Occupation</Text>
                            {['Occupation 1', 'Occupation 2', 'Occupation 3'].map((occupation, index) => (
                                <Checkbox.Item
                                    key={index}
                                    label={occupation}
                                    labelStyle={{ color: 'white' }}  // Set label color to white
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
                                height: 40, borderTopRightRadius: 30, borderTopLeftRadius: 30, borderRadius: 30
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
                                height: 40, borderTopRightRadius: 30, borderTopLeftRadius: 30, borderRadius: 30
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
                                style={{ backgroundColor: "#1C1A5E", marginBottom: 30, marginTop: 10, width: 120 }}
                                onPress={handleNext}>
                                <Text style={globalStyles.buttonText}>Next</Text>
                            </Button>
                        )}
                    </View>

                    {currentField === 'Password' && (
                        <Button mode="contained"
                            style={globalStyles.getStartedButton}
                            labelStyle={globalStyles.buttonLabel}
                            onPress={() => navigation.navigate("UserDrawer")}>
                            <Text
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
