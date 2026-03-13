import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import React from "react";
import { AuthProvider } from "@/contexts/authContext";

const StackLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            {/* <Stack.Screen
                name="(main)/profileModal"
                options={{ presentation: "modal" }}
            />
            <Stack.Screen
                name="(main)/newConversationMode"
                options={{ presentation: "modal" }}
            /> */}
        </Stack>
    );
};
const RootLayout = () => {
    return (
        <AuthProvider>
            <StackLayout />
        </AuthProvider>
    );
};

export default RootLayout;

const styles = StyleSheet.create({});