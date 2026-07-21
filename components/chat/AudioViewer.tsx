import { Audio } from "expo-av";
import { useEffect } from "react";
import { Modal, Pressable, Text, View } from "react-native";

interface Props{
    visible:boolean;
    audio?:{
        uri:string;
        name:string;
    };
    onClose:()=>void;
}

export default function AudioViewer({
    visible,
    audio,
    onClose,
}:Props){

    useEffect(()=>{

        let sound:Audio.Sound;

        (async()=>{

            if(audio){

                const result=await Audio.Sound.createAsync({
                    uri:audio.uri,
                });

                sound=result.sound;

                await sound.playAsync();

            }

        })();

        return()=>{
            sound?.unloadAsync();
        }

    },[audio]);

    return(

        <Modal visible={visible} transparent>

            <View
                style={{
                    flex:1,
                    justifyContent:"center",
                    alignItems:"center",
                    backgroundColor:"rgba(0,0,0,.75)"
                }}
            >

                <Text
                    style={{
                        color:"#fff",
                        fontSize:18,
                        marginBottom:20
                    }}
                >
                    {audio?.name}
                </Text>

                <Pressable
                    onPress={onClose}
                    style={{
                        backgroundColor:"#20A090",
                        padding:15,
                        borderRadius:12
                    }}
                >
                    <Text style={{color:"#fff"}}>
                        Close
                    </Text>
                </Pressable>

            </View>

        </Modal>

    );

}