import {Text,Image,View, StyleSheet,TouchableOpacity,Dimensions,ScrollView} from 'react-native';
import React,{useState} from 'react';
import {useRouter, useLocalSearchParams} from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import {db} from './firebase';
import {updateDoc, doc} from 'firebase/firestore';

export default function SignUpDataPrivacy(){

    const router = useRouter();
    const params = useLocalSearchParams();
    const firestore_uid = params.firestore_uid;
    const email = params.email;
    const hashed = params.hashed;
    const user_data = params.user_data;

    const onSignUpComplete = () =>{
        onPrivacyPolicyAgreement();
    }

    const onSignUpTerms = () =>{
        router.navigate("/signup_terms")
    }

    const onPrivacyPolicyAgreement = async () => {
        const fuid = firestore_uid.toString();
        try{

            const updateRef = await updateDoc(doc(db,"users_list", fuid),{
                privacy_policy_agreement_date_time: new Date().toLocaleDateString() +" "+new Date().toLocaleTimeString()
            });

            router.push({pathname: '/signup_complete',params: {firestore_uid: firestore_uid, email: email, hashed: hashed, user_data: user_data}});

        }catch(error){
            console.error("Error: "+error);
        }

    }

    const [isCheckedApproval, setCheckedApproval] = useState(false)
 

    const onPressCheckboxApproval = ()=> {
        setCheckedApproval(!isCheckedApproval)
    }


    const tc_content = `TK Ride Mobile App
Privacy Policy

Effective Date: October 1, 2024

Introduction
Welcome to TK Ride! Your privacy is important to us. This Data Privacy Consent Letter explains how we collect, use, share, and protect your personal data in accordance with the Philippine Data Privacy Act of 2012 (RA 10173). By using the TK Ride mobile application, you consent to the terms and conditions outlined in this notice.

1. Collection of Personal Data
Upon registering and using TK Ride, we may collect the following personal information:

Full name
Contact details (email address, phone number)
Address
Payment information (including but not limited to credit/debit card details)
Location data (for ride bookings and tracking)
Vehicle preferences and trip history
Mobile device information (IP address, operating system, device identifiers)
2. Purpose of Data Collection
Your personal information will be used for the following purposes:

To process and facilitate ride bookings
To verify your identity and ensure safety
To provide customer support and respond to inquiries
To enhance and personalize your experience
For payment processing and transaction tracking
To send updates, promotions, or news (only with your consent)
To comply with legal obligations or requests from law enforcement
3. Data Sharing and Disclosure
TK Ride may share your personal data with third parties in the following circumstances:

With service providers (e.g., payment processors, customer support teams) to facilitate your use of the app
With drivers and other transport service partners to complete ride transactions
To comply with legal obligations or defend against legal claims
In case of a merger, acquisition, or sale of company assets, your data may be transferred as part of the transaction
4. Data Retention
We will retain your personal data only for as long as necessary for the purposes outlined in this policy. If you choose to delete your account, your personal information will be securely deleted or anonymized, except where required for legal or regulatory purposes.

5. Your Rights
Under the Philippine Data Privacy Act, you have the following rights:

The right to be informed of how your personal data is collected and used
The right to access the personal data we hold about you
The right to correct any inaccurate or incomplete data
The right to withdraw consent at any time
The right to request deletion or anonymization of your data
The right to file a complaint with the National Privacy Commission (NPC)
6. Data Security
We implement industry-standard security measures to protect your personal data against unauthorized access, alteration, or disclosure. However, no method of electronic storage is 100% secure, and we cannot guarantee absolute security.

7. Changes to the Privacy Policy
TK Ride reserves the right to update this Data Privacy Consent Letter at any time. Any changes will be posted within the mobile application, and your continued use of the app constitutes your acceptance of those changes.

8. Contact Us
For questions or concerns regarding this Data Privacy Consent or your personal data, you may contact our Data Protection Officer (DPO) at:

Email: [Insert Contact Email]
Phone: [Insert Contact Number]
By using the TK Ride app, you acknowledge that you have read, understood, and agreed to the terms of this Data Privacy Consent Letter.

Consent
By ticking the box below and proceeding with the use of the TK Ride mobile app, you hereby give your full consent to the collection, processing, and sharing of your personal data as described in this policy.`;

    const x_dimensions = Dimensions.get('window').width
    const y_dimensions = Dimensions.get('window').height

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
        },

        box_terms_condition_approval: { flexDirection:"row", alignItems:"center", justifyContent:"center", height: 75, backgroundColor:"#FFF", marginVertical: 10, borderRadius: 10, borderColor: "#FD8A02", borderWidth: 1,shadowColor:"#494547", shadowOpacity:0.1, shadowOffset: {height: -4, width: 10}, elevation: 10, shadowRadius: 25 },
        font_terms_condition: {fontSize: 10, backgroundColor:"#FFF", padding: 15, borderRadius: 10},
        scroll_terms_condition: {height: 450, paddingBottom: 15},
        font_terms_condition_approval: { fontWeight:"bold",fontSize: 10, width: x_dimensions-140},
        approval_checkbox: { borderColor:"#494547", borderWidth: 1, height: 20, width: 20, marginRight: 20, borderRadius: 5 }
       
    })

    const onLogin = () => {

          router.navigate("/")  

    }

    return(
        <View style = {{ paddingHorizontal: 25,  marginTop: 70 }}>

            <View style = {{ flexDirection:"row", alignItems:"center", marginBottom: 20 }}>

                <TouchableOpacity onPress = {onSignUpTerms}>
                    <FontAwesome5 name = "arrow-left" size = {15} style = {{ marginRight: 15 }}></FontAwesome5>
                </TouchableOpacity>                

                <Text style = { styler.page_title }>Privacy Policy</Text>

            </View>

            <View>

                <ScrollView style = {styler.scroll_terms_condition}><Text style = {styler.font_terms_condition}>{tc_content}</Text></ScrollView>

                <View style = {styler.box_terms_condition_approval}>

                   
                    <TouchableOpacity onPress={onPressCheckboxApproval}>
                        <View style = {styler.approval_checkbox}>
                           {isCheckedApproval ? ( <FontAwesome5 name = "check" style = {{ padding: 3 }} color = "#FD8A02"></FontAwesome5>) : (<View></View>)}
                        </View>
                    </TouchableOpacity>

                    <Text style = {styler.font_terms_condition_approval}>I consent TK Ride Mobile Application to use my Personal Data for their transaction exclusive only for its services offered</Text>

                </View>
             
            </View>

        

            {isCheckedApproval ?
                ( 
                
                    <TouchableOpacity onPress={onSignUpComplete}>
                        <View style = {{ flexDirection:"row", justifyContent:"center", marginTop: 10 }}>
                            <View style = {{backgroundColor:"#FD8A02", width: "50%", flexDirection:"row", alignItems:"center", justifyContent: "center", padding:10, borderRadius: 20}}>
                            
                                <FontAwesome5 name = "check" size = {12} style = {{marginRight: 10}} color ="#FFF"></FontAwesome5>
                                <Text style = {{color:"#FFF", fontWeight: "bold", fontSize: 16}}>Finish Sign Up</Text>

                            </View>
                        </View>
                    </TouchableOpacity>

                ):
                ( 
                    
                    <View style = {{ flexDirection:"row", justifyContent:"center", marginTop: 10 }}>
                        <View style = {{backgroundColor:"#E7E1E1", width: "50%", flexDirection:"row", alignItems:"center", justifyContent: "center", padding:10, borderRadius: 20}}>
                        
                            <FontAwesome5 name = "check" size = {12} style = {{marginRight: 10}} color ="#FFF"></FontAwesome5>
                            <Text style = {{color:"#FFF", fontWeight: "bold", fontSize: 16}}>Finish Sign Up</Text>

                        </View>
                    </View>
                   
                )
            }
          
        </View>
    );

}