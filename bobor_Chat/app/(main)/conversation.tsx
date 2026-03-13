import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/contexts/authContext';
import { scale, verticalScale } from '@/utils/styling';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import Avatar from '@/components/Avatar';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import MessageItem from '@/components/MessageItem';
import Input from '@/components/Input';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import Loading from '@/components/Loading';
import { uploadFileToCloudinary } from '@/service/imageService';
import { getMessages, newMessage } from '@/socket/socketEvents';
import { MessageProps, ResponseProps } from '@/types';

const Conversation = () => {
    const { user: currentUser } = useAuth();



    // const {
    //     id: coversationId,
    //     name,
    //     participants: stringifiedParticipants,
    //     avatar,
    //     type
    // } = useLocalSearchParams();
    const {
        id: conversationId,
        name,
        participants: stringifiedParticipants,
        avatar,
        type
    } = useLocalSearchParams();



    const [message, setMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState<{ uri: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<MessageProps[]>([])


    const participants = JSON.parse(stringifiedParticipants as string);

    let coversationAvatar = avatar;
    let isDirect = type == "direct";
    const otherParticipant = isDirect ? participants.find((p: any) => p._id != currentUser?.id) : null;

    if (isDirect && otherParticipant) {
        coversationAvatar = otherParticipant.avatar;
    }

    let conversationName = isDirect ? otherParticipant.name : name;

    // console.log("got coversation data: ", data);

    useEffect(() => {
        newMessage(newMessageHandler);
        getMessages(messagesHandler);

        getMessages({ conversationId });

        return () => {
            newMessage(newMessageHandler, true);
            getMessages(messagesHandler, true);
        }
    }, []);

    const messagesHandler = (res: ResponseProps) => {
        if (res.success) setMessages(res.data);
    }

    const newMessageHandler = (res: ResponseProps) => {
        setLoading(false)
        // console.log("got new message response", res);
        if (res.success) {
            if (res.data.conversationId == conversationId) {
                setMessages((prev) => [res.data as MessageProps, ...prev]);

                // ✅ clear input after success
                setMessage("");
                setSelectedFile(null);
            } else {
                Alert.alert("Error", res.msg);
            }
        }
    }

    // const dummyMessages = [
    //     { id: "msg_1", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Hey! How are you doing?", createdAt: "10:00 AM", isMe: false },
    //     { id: "msg_2", sender: { id: "me", name: "Me", avatar: null }, content: "I'm good! Working on my chat app.", createdAt: "10:01 AM", isMe: true },
    //     { id: "msg_3", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Nice! React Native?", createdAt: "10:02 AM", isMe: false },
    //     { id: "msg_4", sender: { id: "me", name: "Me", avatar: null }, content: "Yes, using Expo.", createdAt: "10:03 AM", isMe: true },
    //     { id: "msg_5", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "That sounds cool.", createdAt: "10:04 AM", isMe: false },
    //     { id: "msg_6", sender: { id: "me", name: "Me", avatar: null }, content: "I'm building a chat UI.", createdAt: "10:05 AM", isMe: true },
    //     { id: "msg_7", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Like WhatsApp?", createdAt: "10:06 AM", isMe: false },
    //     { id: "msg_8", sender: { id: "me", name: "Me", avatar: null }, content: "Yes exactly.", createdAt: "10:07 AM", isMe: true },
    //     { id: "msg_9", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "That's awesome!", createdAt: "10:08 AM", isMe: false },
    //     { id: "msg_10", sender: { id: "me", name: "Me", avatar: null }, content: "Still improving the UI.", createdAt: "10:09 AM", isMe: true },

    //     { id: "msg_11", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Did you add avatars?", createdAt: "10:10 AM", isMe: false },
    //     { id: "msg_12", sender: { id: "me", name: "Me", avatar: null }, content: "Yes, working on that.", createdAt: "10:11 AM", isMe: true },
    //     { id: "msg_13", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Great!", createdAt: "10:12 AM", isMe: false },
    //     { id: "msg_14", sender: { id: "me", name: "Me", avatar: null }, content: "Next step is typing indicator.", createdAt: "10:13 AM", isMe: true },
    //     { id: "msg_15", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Nice feature.", createdAt: "10:14 AM", isMe: false },
    //     { id: "msg_16", sender: { id: "me", name: "Me", avatar: null }, content: "Yes it will feel real.", createdAt: "10:15 AM", isMe: true },
    //     { id: "msg_17", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Are you using sockets?", createdAt: "10:16 AM", isMe: false },
    //     { id: "msg_18", sender: { id: "me", name: "Me", avatar: null }, content: "Yes, Socket.IO.", createdAt: "10:17 AM", isMe: true },
    //     { id: "msg_19", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Perfect choice.", createdAt: "10:18 AM", isMe: false },
    //     { id: "msg_20", sender: { id: "me", name: "Me", avatar: null }, content: "Thanks!", createdAt: "10:19 AM", isMe: true },

    //     { id: "msg_21", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "How's the UI looking?", createdAt: "10:20 AM", isMe: false },
    //     { id: "msg_22", sender: { id: "me", name: "Me", avatar: null }, content: "Pretty clean now.", createdAt: "10:21 AM", isMe: true },
    //     { id: "msg_23", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Did you test scrolling?", createdAt: "10:22 AM", isMe: false },
    //     { id: "msg_24", sender: { id: "me", name: "Me", avatar: null }, content: "Yes using FlatList.", createdAt: "10:23 AM", isMe: true },
    //     { id: "msg_25", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Good approach.", createdAt: "10:24 AM", isMe: false },
    //     { id: "msg_26", sender: { id: "me", name: "Me", avatar: null }, content: "Performance looks fine.", createdAt: "10:25 AM", isMe: true },
    //     { id: "msg_27", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Nice!", createdAt: "10:26 AM", isMe: false },
    //     { id: "msg_28", sender: { id: "me", name: "Me", avatar: null }, content: "Still testing messages.", createdAt: "10:27 AM", isMe: true },
    //     { id: "msg_29", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Testing is important.", createdAt: "10:28 AM", isMe: false },
    //     { id: "msg_30", sender: { id: "me", name: "Me", avatar: null }, content: "Absolutely.", createdAt: "10:29 AM", isMe: true },

    //     { id: "msg_31", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Are you adding emojis?", createdAt: "10:30 AM", isMe: false },
    //     { id: "msg_32", sender: { id: "me", name: "Me", avatar: null }, content: "Yes soon 😊", createdAt: "10:31 AM", isMe: true },
    //     { id: "msg_33", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Users love emojis.", createdAt: "10:32 AM", isMe: false },
    //     { id: "msg_34", sender: { id: "me", name: "Me", avatar: null }, content: "True!", createdAt: "10:33 AM", isMe: true },
    //     { id: "msg_35", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Any plans for voice messages?", createdAt: "10:34 AM", isMe: false },
    //     { id: "msg_36", sender: { id: "me", name: "Me", avatar: null }, content: "Maybe later.", createdAt: "10:35 AM", isMe: true },
    //     { id: "msg_37", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "That would be cool.", createdAt: "10:36 AM", isMe: false },
    //     { id: "msg_38", sender: { id: "me", name: "Me", avatar: null }, content: "Yes definitely.", createdAt: "10:37 AM", isMe: true },
    //     { id: "msg_39", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "What about file sharing?", createdAt: "10:38 AM", isMe: false },
    //     { id: "msg_40", sender: { id: "me", name: "Me", avatar: null }, content: "Planning to add that.", createdAt: "10:39 AM", isMe: true },

    //     { id: "msg_41", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Your app name?", createdAt: "10:40 AM", isMe: false },
    //     { id: "msg_42", sender: { id: "me", name: "Me", avatar: null }, content: "Loop Talk.", createdAt: "10:41 AM", isMe: true },
    //     { id: "msg_43", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Nice name!", createdAt: "10:42 AM", isMe: false },
    //     { id: "msg_44", sender: { id: "me", name: "Me", avatar: null }, content: "Thanks.", createdAt: "10:43 AM", isMe: true },
    //     { id: "msg_45", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Will it support group chat?", createdAt: "10:44 AM", isMe: false },
    //     { id: "msg_46", sender: { id: "me", name: "Me", avatar: null }, content: "Yes already working.", createdAt: "10:45 AM", isMe: true },
    //     { id: "msg_47", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "That's great.", createdAt: "10:46 AM", isMe: false },
    //     { id: "msg_48", sender: { id: "me", name: "Me", avatar: null }, content: "Almost ready.", createdAt: "10:47 AM", isMe: true },
    //     { id: "msg_49", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Can't wait to try.", createdAt: "10:48 AM", isMe: false },
    //     { id: "msg_50", sender: { id: "me", name: "Me", avatar: null }, content: "I'll share soon.", createdAt: "10:49 AM", isMe: true },

    //     // continuing pattern until 100
    //     { id: "msg_51", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Testing continues...", createdAt: "10:50 AM", isMe: false },
    //     { id: "msg_52", sender: { id: "me", name: "Me", avatar: null }, content: "Yes lots of testing.", createdAt: "10:51 AM", isMe: true },
    //     { id: "msg_53", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Good practice.", createdAt: "10:52 AM", isMe: false },
    //     { id: "msg_54", sender: { id: "me", name: "Me", avatar: null }, content: "Absolutely.", createdAt: "10:53 AM", isMe: true },
    //     { id: "msg_55", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Any bugs?", createdAt: "10:54 AM", isMe: false },
    //     { id: "msg_56", sender: { id: "me", name: "Me", avatar: null }, content: "Fixed most of them.", createdAt: "10:55 AM", isMe: true },
    //     { id: "msg_57", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Nice progress.", createdAt: "10:56 AM", isMe: false },
    //     { id: "msg_58", sender: { id: "me", name: "Me", avatar: null }, content: "Thanks!", createdAt: "10:57 AM", isMe: true },
    //     { id: "msg_59", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Keep going.", createdAt: "10:58 AM", isMe: false },
    //     { id: "msg_60", sender: { id: "me", name: "Me", avatar: null }, content: "Will do.", createdAt: "10:59 AM", isMe: true },

    //     { id: "msg_61", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "More UI tweaks?", createdAt: "11:00 AM", isMe: false },
    //     { id: "msg_62", sender: { id: "me", name: "Me", avatar: null }, content: "Yes polishing design.", createdAt: "11:01 AM", isMe: true },
    //     { id: "msg_63", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Looks promising.", createdAt: "11:02 AM", isMe: false },
    //     { id: "msg_64", sender: { id: "me", name: "Me", avatar: null }, content: "App is improving.", createdAt: "11:03 AM", isMe: true },
    //     { id: "msg_65", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Great!", createdAt: "11:04 AM", isMe: false },
    //     { id: "msg_66", sender: { id: "me", name: "Me", avatar: null }, content: "Testing more messages.", createdAt: "11:05 AM", isMe: true },
    //     { id: "msg_67", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Scrolling smooth?", createdAt: "11:06 AM", isMe: false },
    //     { id: "msg_68", sender: { id: "me", name: "Me", avatar: null }, content: "Yes very smooth.", createdAt: "11:07 AM", isMe: true },
    //     { id: "msg_69", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Perfect.", createdAt: "11:08 AM", isMe: false },
    //     { id: "msg_70", sender: { id: "me", name: "Me", avatar: null }, content: "Almost finished.", createdAt: "11:09 AM", isMe: true },

    //     { id: "msg_71", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Ready for launch?", createdAt: "11:10 AM", isMe: false },
    //     { id: "msg_72", sender: { id: "me", name: "Me", avatar: null }, content: "Soon.", createdAt: "11:11 AM", isMe: true },
    //     { id: "msg_73", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Good luck!", createdAt: "11:12 AM", isMe: false },
    //     { id: "msg_74", sender: { id: "me", name: "Me", avatar: null }, content: "Thanks!", createdAt: "11:13 AM", isMe: true },
    //     { id: "msg_75", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Keep building.", createdAt: "11:14 AM", isMe: false },
    //     { id: "msg_76", sender: { id: "me", name: "Me", avatar: null }, content: "Always.", createdAt: "11:15 AM", isMe: true },
    //     { id: "msg_77", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Developers never stop.", createdAt: "11:16 AM", isMe: false },
    //     { id: "msg_78", sender: { id: "me", name: "Me", avatar: null }, content: "Exactly.", createdAt: "11:17 AM", isMe: true },
    //     { id: "msg_79", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Almost 100 messages now.", createdAt: "11:18 AM", isMe: false },
    //     { id: "msg_80", sender: { id: "me", name: "Me", avatar: null }, content: "Testing continues.", createdAt: "11:19 AM", isMe: true },

    //     { id: "msg_81", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "More messages incoming.", createdAt: "11:20 AM", isMe: false },
    //     { id: "msg_82", sender: { id: "me", name: "Me", avatar: null }, content: "Still testing.", createdAt: "11:21 AM", isMe: true },
    //     { id: "msg_83", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "UI looks great.", createdAt: "11:22 AM", isMe: false },
    //     { id: "msg_84", sender: { id: "me", name: "Me", avatar: null }, content: "Thanks for feedback.", createdAt: "11:23 AM", isMe: true },
    //     { id: "msg_85", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Almost there.", createdAt: "11:24 AM", isMe: false },
    //     { id: "msg_86", sender: { id: "me", name: "Me", avatar: null }, content: "Yes nearly done.", createdAt: "11:25 AM", isMe: true },
    //     { id: "msg_87", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Good work.", createdAt: "11:26 AM", isMe: false },
    //     { id: "msg_88", sender: { id: "me", name: "Me", avatar: null }, content: "App feels smooth.", createdAt: "11:27 AM", isMe: true },
    //     { id: "msg_89", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Ready for production.", createdAt: "11:28 AM", isMe: false },
    //     { id: "msg_90", sender: { id: "me", name: "Me", avatar: null }, content: "Almost ready.", createdAt: "11:29 AM", isMe: true },

    //     { id: "msg_91", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Final testing.", createdAt: "11:30 AM", isMe: false },
    //     { id: "msg_92", sender: { id: "me", name: "Me", avatar: null }, content: "Everything working.", createdAt: "11:31 AM", isMe: true },
    //     { id: "msg_93", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Great!", createdAt: "11:32 AM", isMe: false },
    //     { id: "msg_94", sender: { id: "me", name: "Me", avatar: null }, content: "Deployment soon.", createdAt: "11:33 AM", isMe: true },
    //     { id: "msg_95", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Looking forward.", createdAt: "11:34 AM", isMe: false },
    //     { id: "msg_96", sender: { id: "me", name: "Me", avatar: null }, content: "Thanks!", createdAt: "11:35 AM", isMe: true },
    //     { id: "msg_97", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Almost 100 messages.", createdAt: "11:36 AM", isMe: false },
    //     { id: "msg_98", sender: { id: "me", name: "Me", avatar: null }, content: "Testing complete soon.", createdAt: "11:37 AM", isMe: true },
    //     { id: "msg_99", sender: { id: "user_2", name: "Jane Smith", avatar: null }, content: "Last few messages.", createdAt: "11:38 AM", isMe: false },
    //     { id: "msg_100", sender: { id: "me", name: "Me", avatar: null }, content: "Message testing finished.", createdAt: "11:39 AM", isMe: true }
    // ];

    const onPickFile = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });

        // console.log(result);

        if (!result.canceled) {
            setSelectedFile(result.assets[0]);
        }
    }

    const onSend = async () => {
        if (!message.trim() && !selectedFile) return;
        if (!currentUser) return;

        setLoading(true);

        try {
            let attachement = null;
            if (selectedFile) {
                const uploadResult = await uploadFileToCloudinary(
                    selectedFile,
                    "message-attachements"
                );

                if (uploadResult.success) {
                    attachement = uploadResult.data;
                } else {
                    setLoading(false);
                    Alert.alert("Error", "Could not send the image!");
                }
            }
            // console.log("attachement: ", attachement);

            // newMessage({
            //     coversationId,
            //     sender: {
            //         id: currentUser?.id,
            //         name: currentUser.name,
            //         avatar: currentUser.avatar,
            //     },
            //     content: message.trim(),
            //     attachement
            // });

            newMessage({
                conversationId,
                sender: {
                    id: currentUser?.id,
                    name: currentUser.name,
                    avatar: currentUser.avatar,
                },
                content: message.trim(),
                attachment: attachement
            });

            // ✅ CLEAR INPUT
            setMessage("");
            setSelectedFile(null);
        } catch (error) {
            console.log("Error sending message: ", error);
            Alert.alert("Error", "Failed to send message");
        } finally {
            setLoading(false);
        }
    }
    return (
        <ScreenWrapper showPattern={true} bgOpacity={0.5}>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.container}
            // style={{ flex: 1 }}
            // behavior={Platform.OS === "ios" ? "padding" : "height"}
            // keyboardVerticalOffset={80}
            >
                <Header
                    style={styles.header}
                    leftIcon={
                        <View style={styles.headerLeft}>
                            <BackButton />
                            <Avatar
                                size={40}
                                uri={coversationAvatar as string}
                                isGroup={type == "group"}
                            />
                            <Typo color={colors.white} fontWeight={"500"} size={22}>
                                {conversationName}
                            </Typo>
                        </View>
                    }
                    rightIcon={
                        <TouchableOpacity style={{ marginBottom: verticalScale(7) }}>
                            <MaterialIcons name="more-vert" size={24} color={colors.white} />
                        </TouchableOpacity>
                    }
                />

                {/* message */}
                <View style={styles.content}>
                    <FlatList
                        data={messages}
                        inverted={true}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.messagesContent}
                        maintainVisibleContentPosition={{ minIndexForVisible: 1 }}
                        keyboardShouldPersistTaps="handled"
                        renderItem={({ item }) => (
                            <MessageItem item={item} isDirect={isDirect} />
                        )}
                        keyExtractor={(item) => item.id}
                    />

                    {/* <View style={{ flex: 1 }}>
                        <FlatList
                            data={dummyMessages}
                            inverted
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.messagesContent}
                            maintainVisibleContentPosition={{ minIndexForVisible: 1 }}
                            renderItem={({ item }) => (
                                <MessageItem item={item} isDirect={isDirect} />
                            )}
                            keyExtractor={(item) => item.id}
                        />
                    </View> */}

                    <View style={styles.footer}>
                        <Input
                            value={message}
                            onChangeText={setMessage}
                            containerStyle={{
                                paddingLeft: spacingX._10,
                                paddingRight: scale(65),
                                borderWidth: 0,
                            }}
                            placeholder='Type message'
                            icon={
                                <TouchableOpacity style={styles.inputIcon} onPress={onPickFile}>
                                    <MaterialIcons name="add" size={24} color="black" />
                                    {
                                        selectedFile && selectedFile.uri && (
                                            <Image
                                                source={selectedFile.uri}
                                                style={styles.selectedFile}
                                            />
                                        )
                                    }
                                </TouchableOpacity>
                            }
                        />

                        <View style={styles.inputRightIcon}>
                            <TouchableOpacity style={styles.inputIcon} onPress={onSend}>
                                {
                                    loading ? (
                                        <Loading size="small" color={colors.black} />
                                    ) : (
                                        <Ionicons name="send" size={20} color="black" />
                                    )
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScreenWrapper >
    )
}

export default Conversation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: spacingX._15,
        paddingTop: spacingY._10,
        paddingBottom: spacingY._15,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacingX._12,
    },
    inputRightIcon: {
        position: "absolute",
        right: scale(10),
        top: verticalScale(15),
        paddingLeft: spacingX._12,
        borderLeftWidth: 1.5,
        borderLeftColor: colors.neutral300,
    },
    selectedFile: {
        position: "absolute",
        height: verticalScale(38),
        width: verticalScale(38),
        borderRadius: radius.full,
        alignSelf: "center",
    },
    content: {
        flex: 1,
        backgroundColor: colors.white,
        borderTopLeftRadius: radius._50,
        borderTopRightRadius: radius._50,
        borderCurve: "continuous",
        overflow: "hidden",
        paddingHorizontal: spacingX._15,
    },
    inputIcon: {
        backgroundColor: colors.primary,
        borderRadius: radius.full,
        padding: 8,
    },
    footer: {
        paddingTop: spacingY._7,
        paddingBottom: verticalScale(40),
    },

    // footer: {
    //     paddingTop: spacingY._7,
    //     paddingBottom: verticalScale(10),
    // },
    messagesContainer: {
        flex: 1,
    },
    messagesContent: {
        paddingTop: spacingY._20,
        paddingBottom: spacingY._10,
        gap: spacingY._12,
    },
    plusIcon: {
        backgroundColor: colors.primary,
        borderRadius: radius.full,
        padding: 8,
    }
})