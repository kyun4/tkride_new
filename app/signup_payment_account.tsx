import {Text,Image,View, StyleSheet,TextInput,TouchableOpacity,Dimensions,FlatList} from 'react-native';
import React,{useState} from 'react';
import {useLocalSearchParams, useRouter} from 'expo-router';  
import { FontAwesome5 } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import {db} from './firebase';
import {collection, doc, addDoc} from 'firebase/firestore';

export default function SignUpPaymentAccount(firestore_id: String){

    const router = useRouter();

    const params = useLocalSearchParams();
    const firestore_uid = params.firestore_uid;
    const email = params.email;
    const hashed = params.hashed;
    

    const onSignUpMPin = () =>{
       
        addPaymentLinks(firestore_uid.toString());
    }

    const onSignUp = () => {
        router.navigate("/signup")
    }

    const dataAvailableEWallets = [
        {
            "ewallet_id": "1",
            "ewallet_name":"GCash",
            "ewallet_img": require('@/assets/payment_methods/gcash1.png')
        },
        {
            "ewallet_id": "2",
            "ewallet_name":"Maya",
            "ewallet_img": require('@/assets/payment_methods/maya1.png')
        },
        {
            "ewallet_id": "3",
            "ewallet_name":"SeaBank",
            "ewallet_img": require('@/assets/payment_methods/seabank1.png')
        }
    ];

    const dataAvailableBanks = [
        {
            "ewallet_id": "1",
            "ewallet_name":"CIMB",
            "ewallet_img": require('@/assets/payment_methods/cimb1.png')
        },
        {
            "ewallet_id": "2",
            "ewallet_name":"Maya",
            "ewallet_img": require('@/assets/payment_methods/kanorbank1.png')
        }    
    ];

    const addPaymentLinks = async (firestore_user_id: String) => {

        const fuid = firestore_user_id.toString();
        
        try{

            const payment_links = ({
                gcash: "gcash_firestore_uid_"+firestore_user_id,
                maya: "maya_firestore_uid_"+firestore_user_id,
                seabank: "seabank_firestore_uid_"+firestore_user_id,
                cimb: "cimb_firestore_uid_"+firestore_user_id,
                kanor_bank: "kanor_bank_firestore_uid_"+firestore_user_id
            });
            
            const user_collection = collection(doc(db, "users_list", fuid), "payment_links");
            const docRefPaymentLinks = await addDoc(user_collection, payment_links);

            router.push({ pathname: '/signup_mpin', params: { firestoreuid : fuid, email: email, hashed: hashed } })


        }catch(error){
            console.log("Error: "+error);
        }

    }

    
    

    const x_dimensions = Dimensions.get('window').width;
    const y_dimensions = Dimensions.get('window').height;

    const styler = StyleSheet.create({
        page_title: {
            fontSize: 21,
            fontWeight:"bold",
            color:"#494547",
            textAlign:"left"            
        },
        section_title: { marginLeft: 12, marginBottom: 5, marginTop: 20, fontSize: 14, fontWeight:"300" },
        payment_method_img_signup: { height:55, width: 120, borderRadius: 10, marginVertical: 5 },
        payment_method_box: { shadowColor:"#737373", shadowOffset: {height:-4, width:10}, shadowRadius: 25, shadowOpacity:0.2, elevation: 5, backgroundColor: "#f5f5f4",  borderRadius: 10, paddingHorizontal:10, marginVertical: 5, marginHorizontal: 10, height: 70, width: "95%", flexDirection:"row", justifyContent:"space-between", alignItems:"center" },
        signup_field: {
            borderColor:"#78716c",
            borderWidth: 1,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10,
            marginVertical: 4           
        },
        signup_field_picker: {           
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10,
            marginVertical: 4,
            backgroundColor:"#e7e5e4"
        },
        signup_field_short_address: {
            borderColor:"#78716c",
            borderWidth: 1,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10,
            marginVertical: 4,
            width: x_dimensions -200
        }
    })

    const onLogin = () => {

          router.navigate("/")  

    }

    return(
        <View style = {{ paddingHorizontal: 25,  marginTop: 70 }}>

            <View style = {{ flexDirection:"row", alignItems:"center", marginBottom: 20 }}>

                
                <TouchableOpacity onPress = {onSignUp}>
                    <FontAwesome5 name = "arrow-left" size = {15} style = {{ marginRight: 15 }}></FontAwesome5>
                </TouchableOpacity>                

                <Text style = { styler.page_title }>Link Online Payments</Text>

            </View>

            <View>

            <Text style = {styler.section_title}>Available E-Wallet</Text>
              
              <FlatList data = { dataAvailableEWallets } keyExtractor={(item, index)=>index.toString()}  renderItem = {({item, index})=>{
                return(
                   
                        <View style = {styler.payment_method_box}>
                            <Image style = {styler.payment_method_img_signup} source = {item.ewallet_img}></Image>
                            <Text style = {{ textAlign:"right", width: "40%", fontSize:10 }}>  Link your {item.ewallet_name} here</Text>
                            <FontAwesome5 name = "link" size = {15} style = {{ marginRight:10 }} color = "#525252"></FontAwesome5>
                        </View>
                   
                )
              }}></FlatList>

            </View>

      
            
            <View>

            <Text style = {styler.section_title}>Available Banks</Text>
              
              <FlatList data = { dataAvailableBanks } keyExtractor={(item, index)=>index.toString()}  renderItem = {({item, index})=>{
                return(
                   
                        <View style = {styler.payment_method_box}>
                            <Image style = {styler.payment_method_img_signup} source = {item.ewallet_img}></Image>
                            <Text style = {{ textAlign:"right", width: "40%", fontSize:10 }}>Link</Text>
                            <FontAwesome5 name = "link" size = {15} style = {{ marginRight:10 }} color = "#525252"></FontAwesome5>
                        </View>
                   
                )
              }}></FlatList>

            </View>

            <TouchableOpacity onPress={onSignUpMPin}>
                <View style = {{ flexDirection:"row", justifyContent:"flex-end", marginTop: 10 }}>
                    <View style = {{backgroundColor:"#FD8A02", width: "50%", flexDirection:"row", alignItems:"center", justifyContent: "center", padding:10, borderRadius: 20}}>
                        <Text style = {{color:"#FFF", fontWeight: "bold", fontSize: 16}}>Next</Text>
                        <FontAwesome5 name = "arrow-right" size = {12} style = {{marginLeft: 15}} color ="#FFF"></FontAwesome5>
                    </View>
                </View>
            </TouchableOpacity>
          
        </View>
    );

}