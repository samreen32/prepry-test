import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../../assets/styles/globalStyles';
import AntDesign from '@expo/vector-icons/AntDesign';

function Section5() {
    const navigation = useNavigation();

    const services = [
        {
            title: 'Questions List',
            icon: <AntDesign name="menu-unfold" size={24} color="black" />,
            color: '#f39c12',
            navigateTo: 'QuestionsList'
        },
        {
            title: 'Tests',
            icon: <AntDesign name="rocket1" size={24} color="white" />,
            color: '#3b5998',
            navigateTo: 'TestsList'
        },
        {
            title: 'Tests Reports',
            icon: <AntDesign name="filetext1" size={24} color="black" />,
            color: '#f39c12',
            navigateTo: 'TestReports'
        },
        {
            title: 'Quick 10',
            icon: <AntDesign name="staro" size={24} color="white" />,
            color: '#3b5998',
            navigateTo: 'PracticeQuickQs'
        },
    ];

    return (
        <View style={{ marginTop: 15 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={globalStyles.servicesText}>Top Categories</Text>
                <TouchableOpacity style={globalStyles.seeAllButton}>
                    <Text style={globalStyles.seeAllServices}>See All</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    flexDirection: 'row',
                    flexGrow: 1,
                    flexWrap: 'nowrap',
                }}
            >
                {services.map((service, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            globalStyles.rectangleBox,
                            {
                                width: 150,
                                backgroundColor: service.color,
                                marginRight: 10,
                                height: 120,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,
                            }
                        ]}
                        onPress={() => service.navigateTo && navigation.navigate(service.navigateTo)}
                    >
                        {service.icon}
                        <Text style={[
                            globalStyles.serviceTitle,
                            { color: service.color === '#3b5998' ? 'white' : 'black' }
                        ]}>{service.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

export default Section5;
