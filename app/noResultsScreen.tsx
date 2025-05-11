import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../styles/authStyles';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainLayout from '../components/mainLayout';


export default function NoResultScreen() {
    const router = useRouter();

    return (
        <ImageBackground source={require('../assets/images/PagesImage.jpeg')} style={styles.background}>
            <SafeAreaView style={{ flex: 1 }}>
                <MainLayout title="No Results">
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
            </SafeAreaView>
        </ImageBackground>
    );
}
