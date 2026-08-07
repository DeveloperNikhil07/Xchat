import React, { useEffect, useRef } from "react";
import {
    Animated,
    StyleSheet,
    View,
} from "react-native";


export default function TypingIndicator() {

    const dot1 = useRef(new Animated.Value(0)).current;
    const dot2 = useRef(new Animated.Value(0)).current;
    const dot3 = useRef(new Animated.Value(0)).current;


    const animate = (
        value: Animated.Value,
        delay:number
    ) => {

        Animated.loop(

            Animated.sequence([

                Animated.delay(delay),

                Animated.timing(value,{
                    toValue:-4,
                    duration:300,
                    useNativeDriver:true,
                }),

                Animated.timing(value,{
                    toValue:0,
                    duration:300,
                    useNativeDriver:true,
                })

            ])

        ).start();

    };


    useEffect(()=>{

        animate(dot1,0);
        animate(dot2,150);
        animate(dot3,300);

    },[]);



    return (

        <View style={styles.container}>

            <Animated.View
                style={[
                    styles.dot,
                    {
                        transform:[
                            {
                                translateY:dot1
                            }
                        ]
                    }
                ]}
            />


            <Animated.View
                style={[
                    styles.dot,
                    {
                        transform:[
                            {
                                translateY:dot2
                            }
                        ]
                    }
                ]}
            />


            <Animated.View
                style={[
                    styles.dot,
                    {
                        transform:[
                            {
                                translateY:dot3
                            }
                        ]
                    }
                ]}
            />


        </View>

    );

}



const styles = StyleSheet.create({

    container:{


        flexDirection:"row",

        alignItems:"center",

        justifyContent:"center",


        backgroundColor:"#FFFFFF",


        width:58,

        height:38,


        borderRadius:20,


        borderBottomLeftRadius:5,


        marginVertical:6,


        shadowColor:"#000",

        shadowOpacity:0.08,

        shadowRadius:5,

        shadowOffset:{
            width:0,
            height:2
        },


        elevation:3,

    },


    dot:{


        width:7,

        height:7,


        borderRadius:10,


        backgroundColor:"#8E8E93",


        marginHorizontal:3,


    },


});