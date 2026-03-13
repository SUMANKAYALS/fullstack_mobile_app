import { StyleSheet, View } from 'react-native';
import React from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import { colors, spacingX, spacingY } from '@/constants/theme';
import { verticalScale } from '@/utils/styling';
import Animated, { FadeIn } from 'react-native-reanimated';
import Button from '@/components/Button';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Welcome = () => {
    const router = useRouter();
    return (
        <ScreenWrapper showPattern={true} bgOpacity={0.5}>
            <View style={styles.container}>

                {/* Logo Title */}
                <View style={styles.logoContainer}>
                    <Ionicons name="logo-github" size={38} color={colors.white} />
                    <Typo color={colors.white} size={43} fontWeight="900">
                        Bro Code
                    </Typo>
                </View>

                {/* Image */}
                <Animated.Image
                    entering={FadeIn.duration(700).springify()}
                    source={require("../../assets/images/bg_image.png")}
                    style={styles.welcomeImage}
                    resizeMode="contain"
                />

                {/* Text Section */}
                <View>
                    <Typo color={colors.white} size={33} fontWeight="800">
                        Connect Boldly
                    </Typo>
                    <Typo color={colors.white} size={33} fontWeight="800">
                        Express Freely
                    </Typo>
                    <Typo color={colors.white} size={33} fontWeight="800">
                        Be Unstoppable
                    </Typo>
                </View>

                {/* Button */}
                <Button style={{ backgroundColor: colors.white }} loading={false} onPress={() => router.push("/(auth)/register")}>
                    <Typo size={23} fontWeight={"bold"}>Get Started</Typo>
                </Button>

            </View>
        </ScreenWrapper>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        paddingHorizontal: spacingX._20,
        marginVertical: spacingY._10,
    },
    welcomeImage: {
        height: verticalScale(300),
        aspectRatio: 1,
        alignSelf: "center"
    },
    logoContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10
    },
});