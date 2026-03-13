import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import { useAuth } from '@/contexts/authContext';
import Button from '@/components/Button';
import { getConversations, newConversation, testSocket } from '@/socket/socketEvents';
import { verticalScale } from '@/utils/styling';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ConversationsItem from '@/components/conversationsItem';
import Loading from '@/components/Loading';
import { ConversationProps, ResponseProps } from '@/types';


const Home = () => {
    const { user: currentUser, signOut } = useAuth();
    const router = useRouter();

    const [selectedTab, setSelectedTab] = useState(0);
    const [loading, setLoding] = useState(false);
    const [conversations, setConversations] = useState<ConversationProps[]>([])
    const hsndleLogout = async () => {
        await signOut();
    }


    useEffect(() => {
        getConversations(processConversations);
        newConversation(newConversationHandler);

        getConversations(null);

        return () => {
            getConversations(processConversations, true);
            newConversation(newConversationHandler, true);
        }
    }, []);

    const processConversations = (res: ResponseProps) => {
        console.log("res: ", res);
        if (res.success) {
            setConversations(res.data);
        }
    }

    const newConversationHandler = (res: ResponseProps) => {
        if (res.success && res.data.isNew) {
            setConversations((prev) => [...prev, res.data]);
        }
    }

    // const conversations = [
    //     {
    //         name: "Alice",
    //         type: "direct",
    //         lastMessage: {
    //             senderName: "Alice",
    //             attachement: { image: "url" },
    //             content: "Hey! Are we still on for tonight?",
    //             createdAt: "2025-03-10T18:45:00",
    //         },
    //     },
    //     {
    //         name: "Project Team",
    //         type: "group",
    //         lastMessage: {
    //             senderName: "Sarah",
    //             content: "Meeting rescheduled to 3pm tomorrow.",
    //             createdAt: "2024-03-10T14:10:00",
    //         },
    //     },
    //     {
    //         name: "Bob",
    //         type: "direct",
    //         lastMessage: {
    //             senderName: "Bob",
    //             content: "Let's catch up later!",
    //             createdAt: "2026-03-10T12:05:00",
    //         },
    //     },
    // ];


    let directConversations = conversations.filter((item: ConversationProps) => item.type == "direct")
        .sort((a: ConversationProps, b: ConversationProps) => {
            const aDate = a?.lastMessage?.createdAt || a.createdAt;
            const bDate = b?.lastMessage?.createdAt || b.createdAt;
            return new Date(bDate).getTime() - new Date(aDate).getTime();
        });

    let groupConversations = conversations.filter((item: ConversationProps) => item.type == "group")
        .sort((a: ConversationProps, b: ConversationProps) => {
            const aDate = a?.lastMessage?.createdAt || a.createdAt;
            const bDate = b?.lastMessage?.createdAt || b.createdAt;
            return new Date(bDate).getTime() - new Date(aDate).getTime();
        });

    // let directConversations = [];
    // let groupConversations = [];
    return (
        <ScreenWrapper showPattern={true} bgOpacity={0.4}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{ flex: 1 }}>
                        <Typo color={colors.neutral200}
                            size={19}
                            textProps={{ numberOfLines: 1 }}
                        >Welcome back, <Typo size={20}
                            color={colors.white}
                            fontWeight={"800"}
                        >{currentUser?.name}</Typo>{" "}
                            🫰🏻
                        </Typo>
                    </View>

                    <TouchableOpacity style={styles.settingIcon}
                        onPress={() => router.push("/(main)/profileModal")}
                    >
                        <Ionicons name="settings-outline" size={22} color={colors.white} />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <ScrollView showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingVertical: spacingY._20 }}
                    >
                        <View style={styles.navBar}>
                            <View style={styles.tabs}>
                                <TouchableOpacity
                                    onPress={() => setSelectedTab(0)}
                                    style={[styles.tabStyle, selectedTab == 0 && styles.activeTabStyle]}>
                                    <Typo>Direct Messages</Typo>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setSelectedTab(1)}
                                    style={[styles.tabStyle, selectedTab == 1 && styles.activeTabStyle]}>
                                    <Typo>Groups</Typo>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.conversationList}>
                            {
                                selectedTab == 0 && directConversations.map((item: ConversationProps, index) => {
                                    return (
                                        <ConversationsItem
                                            item={item}
                                            key={index}
                                            router={router}
                                            showDivider={directConversations.length != index + 1}
                                        />
                                    );
                                })
                            }
                            {
                                selectedTab == 1 && groupConversations.map((item: ConversationProps, index) => {
                                    return (
                                        <ConversationsItem
                                            item={item}
                                            key={index}
                                            router={router}
                                            showDivider={directConversations.length != index + 1}
                                        />
                                    );
                                })
                            }
                        </View>

                        {
                            !loading && selectedTab == 0 && directConversations.length == 0 && (
                                <Typo style={{ textAlign: "center" }}>
                                    You don't have any Messages
                                </Typo>
                            )
                        }
                        {
                            !loading && selectedTab == 1 && directConversations.length == 0 && (
                                <Typo style={{ textAlign: "center" }}>
                                    You don't haven't joined any groups yet
                                </Typo>
                            )
                        }
                        {
                            loading && <Loading />
                        }
                    </ScrollView>
                </View>
            </View>

            <Button
                style={styles.floatingButton}
                onPress={() => router.push({
                    pathname: "/(main)/newConversationModal",
                    params: { isGroup: selectedTab }
                })}>
                <Ionicons name="add" size={24} color="black" />
            </Button>
        </ScreenWrapper>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: spacingX._20,
        gap: spacingY._15,
        paddingTop: spacingY._15,
        paddingBottom: spacingY._20,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    content: {
        flex: 1,
        backgroundColor: colors.white,
        borderTopLeftRadius: radius._50,
        borderTopRightRadius: radius._50,
        borderCurve: "continuous",
        overflow: "hidden",
        paddingHorizontal: spacingX._20
    },
    navBar: {
        flexDirection: "row",
        gap: spacingX._15,
        alignItems: "center",
        paddingHorizontal: spacingX._10
    },
    tabs: {
        flexDirection: "row",
        gap: spacingX._10,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    tabStyle: {
        paddingVertical: spacingY._10,
        paddingHorizontal: spacingX._20,
        borderRadius: radius.full,
        backgroundColor: colors.neutral100,
    },
    activeTabStyle: {
        backgroundColor: colors.primaryLight,
    },
    conversationList: {
        paddingVertical: spacingY._20
    },
    settingIcon: {
        padding: spacingY._10,
        backgroundColor: colors.neutral700,
        borderRadius: radius.full,
    },
    floatingButton: {
        height: verticalScale(50),
        width: verticalScale(50),
        borderRadius: 100,
        position: "absolute",
        bottom: verticalScale(30),
        right: verticalScale(30),
    },
});