import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../styles/authStyles';
import { ScrollView } from 'react-native';
import MainLayout from '@/components/mainLayout';


export default function NoResultScreen() {
    const router = useRouter();

    return (
        <ImageBackground source={require('../assets/images/PagesImage.jpeg')} style={styles.background}>
            <MainLayout title="Nearby Attractions">
            <View style={styles.noResultContainer}>
                <Text style={styles.attractionTitle}>Nearby Attractions in Location{"\n\n"}</Text>
                <Text style={styles.attractionSubtitle}>OH NOOO!</Text>
                <Text style={styles.attractionSubtitle}>
                    We are sorry that there are no famous tourist spots nearby based on your radius.{"\n\n"}
                    Still wish to make a plan?{"\n"}
                    Please navigate back to the home page and reset your radius.
                </Text>


                <View style={styles.attractionButtonContainer}>
                    <TouchableOpacity onPress={() => router.push('/home')} >
                        <Text style={styles.attractionCancelText}>Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </MainLayout>
        </ImageBackground>
    );
}