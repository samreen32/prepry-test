import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../../assets/styles/globalStyles';
import AntDesign from '@expo/vector-icons/AntDesign';

function Section5() {
    const services = [
        {
            title: 'Questions List',
            icon: <AntDesign name="menu-unfold" size={24} color="black" />,
            color: 'lightblue'
        },
        {
            title: 'Quick 10',
            icon: <AntDesign name="rocket1" size={24} color="white" />,
            color: '#1C1A5E'
        },
        {
            title: 'Tests Reports',
            icon: <AntDesign name="filetext1" size={24} color="black" />,
            color: 'lightblue'
        },
        {
            title: 'Top Questions',
            icon: <AntDesign name="staro" size={24} color="white" />,
            color: '#1C1A5E'
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
                    <View key={index} style={[
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
                    ]}>
                        {service.icon}
                        <Text style={[
                            globalStyles.serviceTitle,
                            { color: service.color === '#1C1A5E' ? 'white' : 'black' }
                        ]}>{service.title}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

export default Section5;
