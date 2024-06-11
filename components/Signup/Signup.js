import React, { useRef, useState, useEffect } from 'react';
import {
    View, Text, ImageBackground, TouchableOpacity, Image,
    LayoutAnimation, Animated, Platform, UIManager
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from "lottie-react-native";
import { globalStyles } from '../../assets/styles/globalStyles';
import { Button, IconButton, TextInput, ToggleButton } from 'react-native-paper';
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

// Enable LayoutAnimation for iOS and Android
if (Platform.OS === 'android' || Platform.OS === 'ios') {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function Signup() {
    const navigation = useNavigation();
    const animation = useRef(null);
    const [isPassSecure, setIsPassSecure] = useState(true);
    const [currentField, setCurrentField] = useState('Name');
    const [formOpacity] = useState(new Animated.Value(1));
    const [selectedGender, setSelectedGender] = useState(null);
    const [statusFootball, setStatusFootball] = useState('');
    const [statusSports, setStatusSports] = useState('');
    const [status, setStatus] = useState('');

    const handleSelectGender = (gender) => {
        setSelectedGender(gender);
    };

    useEffect(() => {
        Animated.timing(formOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [currentField]);

    // Function to handle clicking the "Next" button
    const handleNext = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        switch (currentField) {
            case 'Name':
                setCurrentField('Email');
                break;
            case 'Email':
                setCurrentField('Gender');
                break;
            case 'Gender':
                setCurrentField('Phone Number');
                break;
            case 'Phone Number':
                setCurrentField('Likings');
                break;
            case 'Likings':
                setCurrentField('Password');
                break;
            default:
                break;
        }
    };

    const onButtonToggle = (value) => {
        setStatus(status === value ? '' : value);
    };

    const onButtonToggleFootball = (value) => {
        setStatusFootball(value);
    };

    const onButtonToggleSports = (value) => {
        setStatusSports(value);
    };


    return (
        <Animated.View style={[globalStyles.container, { opacity: formOpacity }]}>
            <ImageBackground source={require('../../assets/img/welcome2.webp')} resizeMode="cover" style={globalStyles.image}>
                <View style={globalStyles.form}>
                    <View style={globalStyles.logoContainer}>
                        <Image
                            style={[globalStyles.logo, { resizeMode: "cover", marginBottom: 20 }]}
                            source={require("../../assets/img/logo.png")}
                        />
                        <Text style={globalStyles.loginText}>Sign Up</Text>
                    </View>
                    {currentField === 'Name' && (
                        <TextInput
                            placeholder="Name"
                            type="outlined"
                            selectionColor='#fe3c72'
                            activeUnderlineColor='#fe3c72'
                            style={[globalStyles.input, {
                                height: 40, borderTopRightRadius: 30, borderTopLeftRadius: 30, borderRadius: 30
                            }]}
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
                        />
                    )}
                    {currentField === 'Gender' && (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
                            <ToggleButton.Row onValueChange={onButtonToggle} value={status}>
                                <View>
                                    <Text style={{ color: "white", marginBottom: 6 }}>Male</Text>
                                    <ToggleButton
                                        icon={() => <IconButton icon="gender-male" />}
                                        value="Male"
                                        status={status}
                                        onPress={() => onButtonToggle('Male')}
                                        style={{ backgroundColor: status === 'Male' ? '#fe3c72' : 'white', }}
                                    >
                                        <Text style={{ color: status === 'Male' ? 'white' : 'black' }}>Male</Text>
                                    </ToggleButton>
                                </View>

                                <View style={{ marginLeft: 20 }}>
                                    <Text style={{ color: "white", marginBottom: 6 }}>Female</Text>
                                    <ToggleButton
                                        icon={() => <IconButton icon="gender-female" />}
                                        value="Female"
                                        status={status}
                                        onPress={() => onButtonToggle('Female')}
                                        style={{ backgroundColor: status === 'Female' ? '#fe3c72' : 'white', }}
                                    >
                                        <Text style={{ color: status === 'Female' ? 'white' : 'black' }}>Female</Text>
                                    </ToggleButton>
                                </View>
                            </ToggleButton.Row>
                        </View>
                    )}
                    {currentField === 'Phone Number' && (
                        <TextInput
                            placeholder="Phone Number"
                            type="outlined"
                            selectionColor='#fe3c72'
                            activeUnderlineColor='#fe3c72'
                            style={[globalStyles.input, {
                                height: 40, borderTopRightRadius: 30, borderTopLeftRadius: 30, borderRadius: 30
                            }]}
                            keyboardType="phone-pad"
                        />
                    )}
                    {currentField === 'Likings' && (
                        <>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
                                <ToggleButton.Row onValueChange={onButtonToggleFootball} value={statusFootball}>
                                    <View>
                                        <Text style={{ color: "white", marginBottom: 6 }}>Football</Text>
                                        <ToggleButton
                                            icon={() => <MaterialCommunityIcons name="football" size={24}/>}
                                            value="Football"
                                            status={statusFootball}
                                            onPress={() => onButtonToggleFootball('Football')}
                                            style={{ backgroundColor: statusFootball === 'Football' ? '#fe3c72' : 'white' }}
                                        />
                                    </View>
                                    <View style={{ marginLeft: 20 }}>
                                        <Text style={{ color: "white", marginBottom: 6 }}>Tennis</Text>
                                        <ToggleButton
                                            icon={() => <IconButton icon="soccer" />}
                                            value="Tennis"
                                            status={statusFootball}
                                            onPress={() => onButtonToggleFootball('Tennis')}
                                            style={{ backgroundColor: statusFootball === 'Tennis' ? '#fe3c72' : 'white' }}
                                        />
                                    </View>

                                    <View style={{ marginLeft: 20 }}>
                                        <Text style={{ color: "white", marginBottom: 6 }}>Cricket</Text>
                                        <ToggleButton
                                            icon={() => <FontAwesome6 name="baseball-bat-ball" size={24} />}
                                            value="Cricket"
                                            status={statusFootball}
                                            onPress={() => onButtonToggleFootball('Cricket')}
                                            style={{ backgroundColor: statusFootball === 'Cricket' ? '#fe3c72' : 'white' }}
                                        />
                                    </View>
                                </ToggleButton.Row>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
                                <ToggleButton.Row onValueChange={onButtonToggleSports} value={statusSports}>
                                    <View>
                                        <Text style={{ color: "white", marginBottom: 6 }}>Shopping</Text>
                                        <ToggleButton
                                            icon={() => <MaterialIcons name="shopping-bag" size={24}/>}
                                            value="Shopping"
                                            status={statusSports}
                                            onPress={() => onButtonToggleSports('Shopping')}
                                            style={{ backgroundColor: statusSports === 'Shopping' ? '#fe3c72' : 'white' }}
                                        />
                                    </View>

                                    <View style={{ marginLeft: 20 }}>
                                        <Text style={{ color: "white", marginBottom: 6 }}>Games</Text>
                                        <ToggleButton
                                            icon={() => <MaterialIcons name="games" size={24} />}
                                            value="Games"
                                            status={statusSports}
                                            onPress={() => onButtonToggleSports('Games')}
                                            style={{ backgroundColor: statusSports === 'Games' ? '#fe3c72' : 'white' }}
                                        />
                                    </View>

                                    <View style={{ marginLeft: 20 }}>
                                        <Text style={{ color: "white", marginBottom: 6 }}>Nothing</Text>
                                        <ToggleButton
                                            icon={() => <AntDesign name="questioncircle" size={24}/>}
                                            value="Nothing"
                                            status={statusSports}
                                            onPress={() => onButtonToggleSports('Nothing')}
                                            style={{ backgroundColor: statusSports === 'Nothing' ? '#fe3c72' : 'white' }}
                                        />
                                    </View>
                                </ToggleButton.Row>
                            </View>
                        </>
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
                                style={{ backgroundColor: "#fe3c72", marginBottom: 30, marginTop: 10, width: 120 }}
                                onPress={handleNext}>
                                <Text style={globalStyles.buttonText}>Next</Text>
                            </Button>
                        )}
                    </View>
                    {currentField === 'Password' && (
                        <Button mode="contained"
                            style={{ backgroundColor: "#fe3c72", marginBottom: 20, marginTop: 10 }}
                            onPress={() => navigation.navigate("UserDrawer")}>
                            <Text style={globalStyles.buttonText}>Sign Up</Text>
                        </Button>
                    )}
                    <View style={globalStyles.footer}>
                        <Text style={globalStyles.footerText}>Already a member? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={globalStyles.footerActionText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={globalStyles.singupBackgroundAnimationContainer}>
                        <LottieView
                            autoPlay
                            source={require('../../assets/animation/Animation - 1710731633867.json')}
                            style={{
                                width: 200,
                                height: 200,
                            }}
                            ref={animation}
                        />
                    </View>
                    <View style={globalStyles.animationContainer}>
                        <LottieView
                            autoPlay
                            ref={animation}
                            style={{
                                width: 200,
                                height: 200,
                            }}
                            source={require('../../assets/animation/Animation - 1710132694975.json')}
                        />
                    </View>
                </View>
            </ImageBackground>
        </Animated.View>
    );
}
