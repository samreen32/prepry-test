import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../../assets/styles/globalStyles';

function Section5() {
    const services = [
        {
            title: 'Dating',
            image: require('../../../assets/img/more1.jpg'),
            color: '#C8A2C8'
        },
        {
            title: 'Lets be Friends',
            image: require('../../../assets/img/more5.jpg'),
            color: '#F08080'
        },
        {
            title: 'Life Partner',
            image: require('../../../assets/img/banner-03.jpg'),
            color: '#87CEEB'
        },
        {
            title: 'Get Engaged',
            image: require('../../../assets/img/service.jpg'),
            color: '#FFC0CB'
        },
    ];

    return (
        <View style={{ padding: 16, marginTop: -15 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={globalStyles.servicesText}>Discover Top Services</Text>
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
                        }
                    ]}>
                        <Image source={service.image} style={globalStyles.serviceImg} />
                        <Text style={globalStyles.serviceTitle}>{service.title}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

export default Section5;