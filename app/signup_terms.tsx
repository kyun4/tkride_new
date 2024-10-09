import {Text,Image,View, StyleSheet,TouchableOpacity,Dimensions,ScrollView} from 'react-native';
import React,{useEffect, useState} from 'react';
import {useRouter, useLocalSearchParams} from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import {db} from './firebase';
import {updateDoc, doc} from 'firebase/firestore';


export default function SignUpTerms(){

    const router = useRouter();
    const params = useLocalSearchParams();
    const firestore_uid = params.firestore_uid;
    const email = params.email;
    const hashed = params.hashed;
   
    const onSignUpDataPrivacy = () =>{
        updateTermsConditionAgreementStatus();
    }

    const onMPin = () =>{
        router.navigate("/signup_mpin")
    }

    const updateTermsConditionAgreementStatus = async () => {
        const fuid = firestore_uid.toString();
        try{

            const updateRef = await updateDoc(doc(db,"users_list",fuid),{
                terms_and_condition_agreement_date_time: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
            });
            router.push({pathname: '/signup_data_privacy', params: {firestore_uid: fuid, email: email, hashed: hashed}});

        }catch(error){
            console.error("Error: "+error);
        }
    }


    const tc_content = `TK Ride Terms and Conditions
Effective Date: October 1, 2024

Welcome to TK Ride, a Transport Vehicle Network Service (TVNS) mobile application that provides users the ability to rent and ride with drivers operating various vehicle types such as cars, scooters, e-bikes, skateboards, jeepneys, tricycles, bicycles, trucks, cable cars, sidecars, and drones. These terms and conditions ("Terms") govern your access to and use of the TK Ride mobile application, and by using TK Ride, you agree to comply with these Terms.

1. Acceptance of Terms By downloading, installing, or using the TK Ride mobile application (“App”), you acknowledge that you have read, understood, and agreed to be bound by these Terms, our Privacy Policy, and all applicable laws and regulations. If you do not agree with these Terms, you must not use the App or its services.

2. Services Provided TK Ride is an exclusive Transport Vehicle Network Service (TVNS) available only in the Philippines. The platform connects riders with drivers from various vehicle types, including but not limited to cars, scooters, e-bikes, skateboards, jeepneys, tricycles, bicycles, trucks, cable cars, sidecars, and drones. The platform allows users to request rides, track available drivers, and facilitate payments between riders and drivers.

3. Eligibility To use the TK Ride app, you must:

Be at least 18 years of age or have parental/guardian consent.
Have a valid Philippine mobile number and be located in the Philippines.
Possess the legal capacity to enter into contracts.

4. User Responsibilities As a user of TK Ride, you agree to:

Provide accurate and complete information when registering and using the App.
Comply with all local laws and regulations regarding transport services.
Treat drivers and fellow riders with respect.
Use the service for personal, non-commercial purposes.
Ensure your personal safety by using seat belts, helmets, or any safety measures required by law or vehicle type.
Promptly report any issues or disputes with rides through the App’s customer support.

5. Booking and Ride Requests

Booking Process: Once you request a ride, the App will match you with a nearby driver. The estimated fare will be displayed prior to confirming the ride.
Cancellation Policy: Riders may cancel a ride at any time; however, cancellation fees may apply if the cancellation is made after a driver has already been assigned.
Fare Estimates and Payments: Fares are calculated based on distance, time, and the type of vehicle selected. Riders agree to pay all fares, tolls, surcharges, and fees associated with the ride through the App’s payment platform.

6. Vehicle Types TK Ride offers various vehicle types, each subject to its own availability and local regulations:

Cars
Scooters
E-bikes
Skateboards
Jeepneys
Tricycles
Bicycles
Trucks
Cable Cars
Sidecars
Drones (for certain deliveries or areas where available)

Users must ensure they are selecting the appropriate vehicle type for their needs and understand that the pricing, travel time, and safety measures may vary depending on the vehicle chosen.

7. Driver and Vehicle Safety All drivers using the TK Ride platform are independent service providers. TK Ride performs reasonable background checks, vehicle inspections, and licensing verification. However, TK Ride does not guarantee the quality or safety of the services provided by the drivers or the condition of the vehicles.

8. Limited Liability TK Ride, including its employees, agents, and affiliates, is not responsible for any direct, indirect, incidental, special, or consequential damages arising out of your use of the App or rides booked through the platform, including but not limited to:

Any injury, loss, or damage during the ride.
Delays or interruptions in service.
Miscommunications between riders and drivers.
The actions or omissions of third-party service providers (i.e., drivers).
TK Ride’s total liability for any claim will not exceed the amount paid for the specific ride or service in question.

9. Intellectual Property and Trademarks All content, logos, trademarks, and intellectual property related to TK Ride are the exclusive property of TK Ride or its licensors. Users may not copy, distribute, or modify any content from the App without explicit written permission from TK Ride.

10. Privacy Policy TK Ride values your privacy. Please review our Privacy Policy, which explains how we collect, use, and disclose personal information.

11. Suspension and Termination TK Ride reserves the right to suspend or terminate your account at any time, with or without notice, if:

You breach these Terms.
We believe your actions are harmful to other users, drivers, or the platform.
You provide false information during registration.

12. Changes to Terms TK Ride may modify these Terms at any time. The revised Terms will be effective when posted within the App or sent via email. Your continued use of the App after any changes constitute your acceptance of the revised Terms.

13. Governing Law and Dispute Resolution These Terms shall be governed by and construed in accordance with the laws of the Republic of the Philippines. Any disputes arising from these Terms or your use of the App will be resolved through arbitration or local courts located in the Philippines.

14. Contact Information For any questions, issues, or concerns related to these Terms or the TK Ride app, please contact us at:

Email: support@tkrideservice.ph
Phone: +63 969 3232 696
Address: Unit 91, 3rd Floor, Kanor Building, BGC, Taguig City

By using TK Ride, you agree to abide by these Terms and Conditions. Safe travels and thank you for choosing TK Ride!`;

    const x_dimensions = Dimensions.get('window').width
    const y_dimensions = Dimensions.get('window').height

    const [isCheckedApproval, setCheckedApproval] = useState(false)
 

    const onPressCheckboxApproval = ()=> {
        setCheckedApproval(!isCheckedApproval)
    }

 

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

        box_terms_condition_approval: { padding: 15, flexDirection:"row", alignItems:"center", justifyContent:"center", height: 60, backgroundColor:"#FFF", marginVertical: 10, borderRadius: 10, borderColor: "#FD8A02", borderWidth: 1,shadowColor:"#494547", shadowOpacity:0.1, shadowOffset: {height: -4, width: 10}, elevation: 10, shadowRadius: 25 },
        font_terms_condition: {fontSize: 10, backgroundColor:"#FFF", padding: 15, borderRadius: 10},
        scroll_terms_condition: {height: 450, paddingBottom: 15},
        font_terms_condition_approval: { fontWeight:"bold",fontSize: 10, width: x_dimensions-140},
        inactive_button: {backgroundColor: "#EEE", width: "50%", flexDirection:"row", alignItems:"center", justifyContent: "center", padding:10, borderRadius: 20},
        active_button: {backgroundColor: "#FD8A02", width: "50%", flexDirection:"row", alignItems:"center", justifyContent: "center", padding:10, borderRadius: 20},
        approval_checkbox: { borderColor:"#494547", borderWidth: 1, height: 15, width: 15, marginRight: 23 }
       
    })



    return(
        <View style = {{ paddingHorizontal: 25,  marginTop: 70 }}>

            <View style = {{ flexDirection:"row", alignItems:"center", marginBottom: 20 }}>

                <TouchableOpacity onPress = {onMPin}>
                    <FontAwesome5 name = "arrow-left" size = {15} style = {{ marginRight: 15 }}></FontAwesome5>
                </TouchableOpacity>                

                <Text style = { styler.page_title }>Terms and Conditions</Text>

            </View>

            <View>

                <ScrollView style = {styler.scroll_terms_condition}><Text style = {styler.font_terms_condition}>{tc_content}</Text></ScrollView>

                <View style = {styler.box_terms_condition_approval}>

                    <TouchableOpacity onPress={onPressCheckboxApproval}>
                        <View style = {styler.approval_checkbox}>
                           {isCheckedApproval ? ( <FontAwesome5 name = "check" color = "#FD8A02"></FontAwesome5>) : (<View></View>)}
                        </View>
                    </TouchableOpacity>

                    <Text style = {styler.font_terms_condition_approval}>Accept the Terms and Condition for TK Ride Mobile App and Its Copyright and Trademark</Text>

                </View>
             
            </View>

            {isCheckedApproval ? (
                 <TouchableOpacity onPress={onSignUpDataPrivacy}>
                    <View style = {{ flexDirection:"row", justifyContent:"flex-end", marginTop: 10 }}>
                        <View style = {styler.active_button}>
                            <Text style = {{color:"#FFF", fontWeight: "bold", fontSize: 16}}>Next</Text>
                            <FontAwesome5 name = "arrow-right" size = {12} style = {{marginLeft: 15}} color ="#FFF"></FontAwesome5>
                        </View>
                    </View>
                </TouchableOpacity>
            ):
            (
              
                    <View style = {{ flexDirection:"row", justifyContent:"flex-end", marginTop: 10 }}>
                        <View style = { styler.inactive_button}>
                            <Text style = {{color:"#FFF", fontWeight: "bold", fontSize: 16}}>Next</Text>
                            <FontAwesome5 name = "arrow-right" size = {12} style = {{marginLeft: 15}} color ="#FFF"></FontAwesome5>
                        </View>
                    </View>
              
            )}
          
          
        </View>
    );

}