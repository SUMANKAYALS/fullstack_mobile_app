import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors } from '@/constants/theme';
import { BackButtonProps } from '@/types';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { verticalScale } from '@/utils/styling';

const BackButton = ({
    style,
    iconSize = 26,
    color = colors.white,
}: BackButtonProps) => {
    const router = useRouter();

    return (
        // <TouchableOpacity
        //     onPress={() => router.back()}
        //     style={[styles.button, style]}
        //     activeOpacity={0.7}
        // >
        //     <Ionicons
        //         name="chevron-back"
        //         size={verticalScale(iconSize)}
        //         color={color}
        //     />
        // </TouchableOpacity>
        <TouchableOpacity
            onPress={() => {
                if (router.canGoBack()) router.back();
            }}
            style={[styles.button, style]}
            activeOpacity={0.7}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
            <Ionicons
                name="chevron-back"
                size={verticalScale(iconSize)}
                color={color}
            />
        </TouchableOpacity>
    );
};

export default BackButton;

const styles = StyleSheet.create({
    // button: {
    //     padding: 10,
    //     borderRadius: 50,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    button: {
        padding: 10,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },
});