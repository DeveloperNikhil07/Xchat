import ImageViewer from "@/components/chat/ImageViewer";
import Header from "@/components/common/Header";
import Avatar from "@/components/profile/Avatar";
import InfoCard from "@/components/profile/InfoCard";
import InfoRow from "@/components/profile/InfoRow";
import MediaPreview from "@/components/profile/MediaPreview";
import QuickActionButton from "@/components/profile/QuickActionButton";
import Colors from "@/constants/theme";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { styles } from "../../styles/profile.style";

export default function ContactInfoScreen() {

    const {
        userId,
        name,
        avatar,
        online,
        messages
    } = useLocalSearchParams<{
        userId:string;
        name?:string;
        avatar?:string;
        online?:string;
        messages?:string;
    }>();

    const [selectedImage,setSelectedImage] = useState<string|null>(null);
    const [showImageViewer,setShowImageViewer] = useState(false);
    const [muted,setMuted] = useState(false);
    const [disappearing,setDisappearing] = useState(false);
    const [chatLock,setChatLock] = useState(false);

    const displayName = name || "Unknown";
    const isOnline = online === "true";

    const chatMessages = useMemo(()=>{

        if(!messages){
            return [];
        }

        return JSON.parse(messages);

    },[messages]);


    const sharedImages = useMemo(()=>{

        return chatMessages.filter(
            (item:any)=>
                item.type==="image" &&
                item.image
        );

    },[chatMessages]);


    const handleAudioCall = ()=>{
        Alert.alert(
            "Audio Call",
            `Calling ${displayName}...`
        );
    };


    const handleVideoCall = ()=>{
        Alert.alert(
            "Video Call",
            `Starting video call with ${displayName}...`
        );
    };


    const handleSearch = ()=>{

        router.replace({
            pathname:"/(chat)/[chatId]",
            params:{
                chatId:userId as string,
                name:displayName,
                openSearch:"true"
            }
        });

    };


    const handleMute = ()=>{

        setMuted(prev=>!prev);

        Alert.alert(
            muted
            ?"Notifications Enabled"
            :"Chat Muted",
            muted
            ?"You will receive notifications"
            :"You won't receive notifications"
        );

    };


    const handleBlock = ()=>{

        Alert.alert(
            `Block ${displayName}`,
            "Are you sure you want to block this user?",
            [
                {
                    text:"Cancel",
                    style:"cancel"
                },
                {
                    text:"Block",
                    style:"destructive",
                    onPress:()=>{
                        console.log("Blocked:",userId);
                    }
                }
            ]
        );

    };


    const handleReport = ()=>{

        Alert.alert(
            `Report ${displayName}`,
            "Report this user?",
            [
                {
                    text:"Cancel",
                    style:"cancel"
                },
                {
                    text:"Report",
                    style:"destructive",
                    onPress:()=>{
                        console.log("Reported:",userId);
                    }
                }
            ]
        );

    };


    const openImage=(uri:string)=>{

        setSelectedImage(uri);
        setShowImageViewer(true);

    };


    const clearChat=()=>{

        Alert.alert(
            "Clear Chat",
            "Delete all messages?",
            [
                {
                    text:"Cancel",
                    style:"cancel"
                },
                {
                    text:"Clear",
                    style:"destructive",
                    onPress:()=>{
                        console.log("Chat cleared");
                    }
                }
            ]
        );

    };


    return(
        <View style={styles.container}>

            <Header
                title=""
                onBack={()=>router.back()}
                iconColor={Colors.surface}
            />


            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >

                <View style={styles.topSection}>

                    <Avatar
                        name={displayName}
                        imageUri={avatar}
                        online={isOnline}
                    />


                    <View style={styles.actionContainer}>

                        <QuickActionButton
                            icon="call"
                            label="Audio"
                            onPress={handleAudioCall}
                        />

                        <QuickActionButton
                            icon="videocam"
                            label="Video"
                            onPress={handleVideoCall}
                        />

                        <QuickActionButton
                            icon="search"
                            label="Search"
                            onPress={handleSearch}
                        />

                        <QuickActionButton
                            icon={
                                muted
                                ?"notifications"
                                :"notifications-off"
                            }
                            label={
                                muted
                                ?"Unmute"
                                :"Mute"
                            }
                            onPress={handleMute}
                        />

                    </View>

                </View>


                <View style={styles.content}>


                    <InfoCard>

                        <View style={styles.aboutContainer}>

                            <Text style={styles.aboutTitle}>
                                About
                            </Text>

                            <Text style={styles.aboutText}>
                                Hey there, I am using Xchat
                            </Text>

                        </View>

                    </InfoCard>


                    <InfoCard>

                        <MediaPreview
                            images={sharedImages}
                            onPress={openImage}
                        />

                    </InfoCard>


                    <InfoCard>

                        <InfoRow
                            icon="star"
                            label="Starred messages"
                            onPress={()=>router.push("/starred")}
                        />

                        <InfoRow
                            icon="timer"
                            label="Disappearing messages"
                            rightText={
                                disappearing
                                ?"On"
                                :"Off"
                            }
                            onPress={()=>{
                                setDisappearing(prev=>!prev);
                            }}
                        />


                        <InfoRow
                            icon="lock-closed"
                            label="Chat lock"
                            rightText={
                                chatLock
                                ?"On"
                                :"Off"
                            }
                            onPress={()=>{
                                setChatLock(prev=>!prev);
                            }}
                        />


                        <InfoRow
                            icon="trash"
                            label="Clear chat"
                            danger
                            showChevron={false}
                            showDivider={false}
                            onPress={clearChat}
                        />

                    </InfoCard>


                    <InfoCard>

                        <InfoRow
                            icon="ban"
                            label={`Block ${displayName}`}
                            showChevron={false}
                            danger
                            onPress={handleBlock}
                        />


                        <InfoRow
                            icon="flag"
                            label={`Report ${displayName}`}
                            showChevron={false}
                            showDivider={false}
                            danger
                            onPress={handleReport}
                        />

                    </InfoCard>


                </View>


                <ImageViewer
                    visible={showImageViewer}
                    image={selectedImage}
                    onClose={()=>{
                        setShowImageViewer(false);
                        setSelectedImage(null);
                    }}
                />


            </ScrollView>


        </View>
    );
}