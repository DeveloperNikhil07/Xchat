import { StyleSheet } from "react-native";
import { Colors } from "../constants/theme";


export const styles = StyleSheet.create({

  container:{
    flex:1,
  },


  gradient:{
    flex:1,
  },


  header:{
    flex:0.32,
    paddingHorizontal:30,
    justifyContent:"center",
  },


  hello:{
    color:Colors.textOnDark,
    fontSize:42,
    fontWeight:"800",
  },


  welcome:{
    color:Colors.textOnDark,
    fontSize:18,
    marginTop:6,
  },


  plant:{
    position:"absolute",
    right:30,
    bottom:0,
    fontSize:90,
  },



  card:{
    flex:0.68,
    backgroundColor:Colors.surface,

    borderTopLeftRadius:40,
    borderTopRightRadius:40,

    paddingHorizontal:28,
    paddingTop:25,

    shadowColor:"#000",
    shadowOpacity:0.15,
    shadowRadius:10,
    elevation:8,
  },



  loginTitle:{
    fontSize:32,
    fontWeight:"800",
    color:Colors.brandPrimary,
    marginBottom:20,
  },



  inputContainer:{

    flexDirection:"row",
    alignItems:"center",

    backgroundColor:Colors.surfaceAlt,

    borderRadius:30,

    paddingHorizontal:18,

    marginBottom:18,

    height:55,
  },



  input:{
    flex:1,

    marginLeft:12,

    fontSize:16,

    color:Colors.textPrimary,
  },



  forgot:{
    alignSelf:"flex-end",

    color:Colors.brandPrimary,

    marginBottom:18,

    fontWeight:"600",
  },



  loginButton:{

    backgroundColor:Colors.brandPrimary,

    borderRadius:30,

    height:55,

    justifyContent:"center",

    alignItems:"center",

  },



  loginButtonText:{
    color:Colors.textOnBrand,
    fontSize:18,
    fontWeight:"700",
  },



  divider:{

    flexDirection:"row",

    alignItems:"center",

    marginVertical:20,

  },



  line:{

    flex:1,

    height:1,

    backgroundColor:Colors.divider,

  },



  orText:{

    marginHorizontal:12,

    color:Colors.textSecondary,

    fontSize:14,

  },



  socialContainer:{

    flexDirection:"row",

    justifyContent:"space-evenly",

  },



  socialButton:{

    width:58,

    height:58,

    borderRadius:16,

    backgroundColor:"#F6F6F6",

    justifyContent:"center",

    alignItems:"center",

    elevation:3,

  },



  bottomRow:{

    flexDirection:"row",

    justifyContent:"center",

    marginTop:20,

  },


  bottomText:{
    color:"#555",
    fontSize:15,
  },


  signup:{

    color:Colors.brandPrimary,

    fontWeight:"800",

    marginLeft:5,

    fontSize:15,

  },


});