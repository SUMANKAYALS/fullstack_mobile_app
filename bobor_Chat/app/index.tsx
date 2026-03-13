import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { colors } from '@/constants/theme';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
const BaborChat = () => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={colors.neutral900} />
            <Animated.Image
                source={require('../assets/images/new_app_logo_three.png')}
                entering={FadeInDown.duration(700).springify()}
                style={styles.logo}
                resizeMode={"center"}
            />
        </View>
    )
}

export default BaborChat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.neutral900
    },
    logo: {
        height: "30%",
        aspectRatio: "1",
    },
})