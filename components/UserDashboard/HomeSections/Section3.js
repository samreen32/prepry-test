import React, { useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import profile1 from '../../../assets/img/third_member.jpg';
import profile2 from '../../../assets/img/two_member.jpg';
import profile3 from '../../../assets/img/michael-dam-mEZ3PoFGs_k-unsplash.jpg';
import profile4 from '../../../assets/img/ali-morshedlou-WMD64tMfc4k-unsplash.jpg';

const { width } = Dimensions.get('window');

function Section3() {
    const animationStar = useRef(null);
    const animationThumbsUp = useRef(null);

    const handleIconPress = (iconName, profileId) => {
        console.log(`${iconName} icon pressed for profile ${profileId}`);
    };

    return (
        <View style={{ padding: 16, marginTop: -15, alignItems: 'center' }}>
            <Swiper
                showsPagination={false}
                loop={true}
                width={width - 32}
                autoplay
                autoplayTimeout={5}
                style={{ height: 130 }}
            >
                {[profile1, profile2, profile3, profile4].map((profile, index) => (
                    <View key={index} style={{
                        flexDirection: 'row',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        backgroundColor: '#F08080',
                        margin: 5,
                        borderRadius: 10,
                        padding: 10,
                    }}>
                        <TouchableOpacity
                            onPress={() => handleIconPress('close', index + 1)}
                            style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}
                        >
                            <Ionicons name="close" size={24} color="black" />
                        </TouchableOpacity>
                        <Image source={profile} style={{ width: 85, height: 85, borderRadius: 50 }} />
                        <Text style={{ fontWeight: '500' }}>
                            Hi, {"\n"}
                            I'm Tinder User{"\n"}
                            <Text style={{ fontWeight: '400', fontStyle: "italic" }}>Liking/Dislikings</Text>
                        </Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => handleIconPress('star', index + 1)}>
                                <LottieView
                                    autoPlay
                                    ref={animationStar}
                                    style={{ width: 30, height: 30 }}
                                    source={require('../../../assets/animation/Animation - 1710863494504.json')}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleIconPress('thumbs-up', index + 1)} style={{ marginLeft: 10 }}>
                                <LottieView
                                    autoPlay
                                    ref={animationThumbsUp}
                                    style={{ width: 30, height: 30 }}
                                    source={require('../../../assets/animation/Animation - 1710864522882.json')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </Swiper>
        </View>
    );
}

export default Section3;
