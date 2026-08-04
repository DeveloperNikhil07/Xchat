import Colors from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    button:{

        height:55,

        borderRadius:30,

        backgroundColor:Colors.brandPrimary,

        flexDirection:"row",

        justifyContent:"center",

        alignItems:"center",

        shadowColor:"#000",

        shadowOffset:{
            width:0,
            height:6,
        },

        shadowOpacity:0.15,

        shadowRadius:10,

        elevation:6,

    },


    buttonText:{

        fontSize:17,

        fontWeight:"700",

        color:Colors.textOnBrand,

        letterSpacing:0.3,

    },


    icon:{

        marginLeft:10,

    },


    disabledButton:{

        opacity:0.5,

    },

});