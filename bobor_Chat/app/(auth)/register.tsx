import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import BackButton from '@/components/BackButton'
import Input from '@/components/Input'
import { Feather } from '@expo/vector-icons'
import { verticalScale } from '@/utils/styling'
import Button from '@/components/Button'
import { useRouter } from 'expo-router'
import { useAuth } from '@/contexts/authContext'
// import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated'

const register = () => {

    const nameRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [isEmailFocused, setIsEmailFocused] = useState(false);

    const { signUp } = useAuth()
    const handleSubmit = async () => {
        if (!emailRef.current || !passwordRef.current || !nameRef.current) {
            Alert.alert("Sign Up ", "Please fill all the fields❗");
            return;
        }

        try {
            setIsLoading(true);
            await signUp(emailRef.current, passwordRef.current, nameRef.current, "");
        } catch (error: any) {
            Alert.alert("Registration Error", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == "ios" ? "padding" : "height"}>
            <ScreenWrapper showPattern={true}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <BackButton iconSize={28} />
                        <Typo size={17} color={colors.white}>
                            Need some help?
                        </Typo>
                    </View>
                    <View style={styles.content}>
                        <ScrollView contentContainerStyle={styles.form}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={{ gap: spacingY._10, marginBottom: spacingY._15 }} >
                                <Typo size={28} fontWeight={"600"}>
                                    Getting Started
                                </Typo>
                                <Typo color={colors.neutral600}>
                                    Create an account to continue
                                </Typo>
                            </View>

                            <Input
                                placeholder='Enter your name'
                                onChangeText={(value: string) => (nameRef.current = value)}
                                icon={<Feather
                                    name="user"
                                    size={verticalScale(26)}
                                    color={colors.neutral600}
                                />}
                            />
                            {/* <Input
                                placeholder='Enter your email'
                                onChangeText={(value: string) => (emailRef.current = value)}
                                icon={<Feather
                                    name="mail"
                                    size={verticalScale(26)}
                                    color={colors.neutral600}
                                />}
                            /> */}
                            <View style={[
                                styles.emailContainer,
                                isEmailFocused && styles.emailContainerActive
                            ]}>

                                <Feather
                                    name="mail"
                                    size={verticalScale(26)}
                                    color={colors.neutral600}
                                />

                                <TextInput
                                    style={styles.usernameInput}
                                    placeholder="Enter username"
                                    value={username}
                                    onChangeText={(value) => {
                                        setUsername(value);
                                        emailRef.current = value + "@bro.com";
                                    }}
                                    onFocus={() => setIsEmailFocused(true)}
                                    onBlur={() => setIsEmailFocused(false)}
                                />

                                <Text style={styles.domain}>@bro.com</Text>

                            </View>
                            <Input
                                placeholder='Enter your password'
                                secureTextEntry
                                onChangeText={(value: string) => (passwordRef.current = value)}
                                icon={<Feather
                                    name="lock"
                                    size={verticalScale(26)}
                                    color={colors.neutral600}
                                />}
                            />

                            <View style={{ marginTop: spacingY._25, gap: spacingY._15 }}>
                                <Button loading={isLoading} onPress={handleSubmit}>
                                    <Typo fontWeight={'bold'} color={colors.black}
                                        size={20}
                                    >Sign Up</Typo>
                                </Button>

                                <View style={styles.footer}>
                                    <Typo>Already have an account?</Typo>
                                    <Pressable onPress={() => router.push("/(auth)/login")}>
                                        <Typo fontWeight={"bold"} color={colors.primaryDark}>
                                            Login
                                        </Typo>
                                    </Pressable>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </ScreenWrapper>
        </KeyboardAvoidingView>
    );
}

export default register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // gap: spacingY._20,
        // marginHorizontal: spacingX._20
        justifyContent: "space-between"
    },
    header: {
        paddingHorizontal: spacingX._20,
        paddingTop: spacingY._15,
        paddingBottom: spacingY._25,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    content: {
        flex: 1,
        backgroundColor: colors.white,
        borderTopLeftRadius: radius._50,
        borderTopRightRadius: radius._50,
        borderCurve: "continuous",
        paddingHorizontal: spacingX._20,
        paddingTop: spacingY._20,
    },

    form: {
        gap: spacingY._15,
        marginTop: spacingY._20
    },

    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
    },


    emailContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E5E5E5",
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 55,
        gap: 6
    },

    usernameInput: {
        flex: 1,
        fontSize: 16,
    },

    domain: {
        fontSize: 16,
        color: colors.neutral600
    },


    emailContainerActive: {
        borderColor: colors.primaryDark,
        borderWidth: 2,
    },

});