import {Text,Image,View, StyleSheet,TextInput,TouchableOpacity,Dimensions,ScrollView, Platform} from 'react-native';
import React,{useState, useEffect} from 'react';
import {useLocalSearchParams, useRouter} from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import  DateTimePicker  from '@react-native-community/datetimepicker';
import {db} from './firebase';
import { addDoc, updateDoc, doc, collection } from 'firebase/firestore';
import {getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged} from '@firebase/auth'; 
import {initializeApp} from '@firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBYoEopUEd7ltImNOFkbmgvKQvBIe4GUaU",
    authDomain: "tkride-26796.firebaseapp.com",
    projectId: "tkride-26796",
    storageBucket: "tkride-26796.appspot.com",
    messagingSenderId: "798862558442",
    appId: "1:798862558442:web:b8ba92fa8690040d004393"
  };
  
  const app = initializeApp(firebaseConfig) == null ? alert("Firebase Waiting to Initialize ...") : initializeApp(firebaseConfig);

  
export default function SignUp(){

    const router = useRouter();

    const auth = getAuth();

    var count_form_complete = 0;

    const [selectedCity, setSelectedCity] = useState("")
    const [userFirestoreId, setUserFirestoreId] = useState("");
    const [userInfo, setUserInfo] = useState({});
    const [pw, setPW] = useState("");
    const [dpw, setDummyPW] = useState("");
    const [isFormComplete, setFormComplete] = useState(false);
    const [countInputComplete, setCountInputComplete] = useState(0);

    const [passwordMatched, setPasswordMatch] = useState("");

    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
  
    const validateEmail = (input:any) => {
      // Regular expression for validating email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsEmailValid(emailRegex.test(input)); // Update validity state
      setEmail(input); // Set the email value

      if(isEmailValid === true){

        addFieldUserInfo('email',email);

      }

    };
  

    const x_dimensions = Dimensions.get('window').width;
    const y_dimensions = Dimensions.get('window').height;

   
    const checkPasswordMatch = () =>{

        if(pw !== "" && dpw !== ""){

            if(pw === dpw){
                setPasswordMatch("true");
            }else{
                setPasswordMatch("false");
            }

        }else{
            setPasswordMatch("");
        }

        
      
    }
  
    useEffect(() => {

        checkPasswordMatch();

        count_form_complete = 0;
        checkFormComplete();
       

    });

    const nextToPaymentAccount = () => {
                
        insertUserInformation();
      
    }

    const checkFormComplete = () => {

    
        
        count_form_complete = 0;

        let username = userInfo.hasOwnProperty('username') ? userInfo['username'] : "";
        let firstname = userInfo.hasOwnProperty('firstname') ? userInfo['firstname'] : "";
        let lastname = userInfo.hasOwnProperty('lastname') ? userInfo['lastname'] : "";
        let email = userInfo.hasOwnProperty('email') ? userInfo['email'] : "";
        let phone = userInfo.hasOwnProperty('phone') ? userInfo['phone'] : "";
        let address_houselotno =userInfo.hasOwnProperty('address_houselotno') ? userInfo['address_houselotno'] : "";
        let address_street = userInfo.hasOwnProperty('address_street') ? userInfo['address_street'] : "";
        let address_village = userInfo.hasOwnProperty('address_village') ? userInfo['address_village'] : "";

        if(date.toLocaleDateString !== null){

            count_form_complete += 1;

        }

        if(username !== ""){

            count_form_complete += 1;

        }

        if(passwordMatched === "true"){

            count_form_complete += 1;

        }

        if(firstname!== ""){

            count_form_complete += 1;

        }

        if(lastname !== ""){

            count_form_complete += 1;

        }

        if(email !== "" && isEmailValid === true){

            count_form_complete += 1;

        }

        if(phone !== ""){

            count_form_complete += 1;

        }

        if(address_houselotno !== ""){

            count_form_complete += 1;

        }

        if(address_street !== ""){

            count_form_complete += 1;

        }

        if(address_village !== ""){

            count_form_complete += 1;

        }

        if(selectedCity !== ""){

            count_form_complete += 1;

        }

        if(count_form_complete >= 11){
           setFormComplete(true);
        }else{
           setFormComplete(false);
        }

      


    }



    const insertUserInformation = async () => {
        try{

           
            const userData = ({

                address_city: selectedCity,
                birthdate: date.toLocaleDateString(),
                username: userInfo.hasOwnProperty('username') ? userInfo['username'] : "",
                firstname: userInfo.hasOwnProperty('firstname') ? userInfo['firstname'] : "",
                lastname: userInfo.hasOwnProperty('lastname') ? userInfo['lastname'] : "",
                email: userInfo.hasOwnProperty('email') ? userInfo['email'] : "",
                phone: userInfo.hasOwnProperty('phone') ? userInfo['phone'] : "",
                address_houselotno: userInfo.hasOwnProperty('address_houselotno') ? userInfo['address_houselotno'] : "",
                address_street: userInfo.hasOwnProperty('address_street') ? userInfo['address_street'] : "",
                address_village: userInfo.hasOwnProperty('address_village') ? userInfo['address_village'] : "",
                mpin: "",
                is_verified: "0",               
                terms_and_condition_agreement_date_time: "",
                privacy_policy_agreement_date_time: ""
               
            });
    

            const userDataRef = await addDoc(collection(db,"users_list"), userData);
            setUserFirestoreId(userDataRef.id);

            // await updateDoc(doc(db,"users_list", userDataRef.id),{
            //     firebase_auth_user_id: firebase_auth_user_id,
            //     user_id: userDataRef.id
            // }); 

            router.push({ pathname: '/signup_payment_account', params: { firestore_uid: userDataRef.id, email: userData.email, hashed: pw} });
          
         

        }catch(error){
            console.log("Error: "+error);
        }
    }

    const styler = StyleSheet.create({
        page_title: {
            fontSize: 21,
            fontWeight:"bold",
            color:"#494547",
            textAlign:"left"            
        },
        section_title: { marginLeft: 0, marginBottom: 5, marginTop: 10, fontSize: 14, fontWeight:"300" },
        signup_field: {
            borderColor:"#78716c",
            borderWidth: 1,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10,
            marginVertical: 4           
        },
        signup_field_with_error: {
            borderColor:"#FF0000",
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
        inactive_button: {backgroundColor: "#EEE", width: "50%", flexDirection:"row", alignItems:"center", justifyContent: "center", padding:10, borderRadius: 20},
        active_button: {backgroundColor: "#FD8A02", width: "50%", flexDirection:"row", alignItems:"center", justifyContent: "center", padding:10, borderRadius: 20},
    })

    const onLogin = () => {

          router.navigate("/")  

    }

    const [date, setDate] = useState(new Date());
    const [isShowDate, setShowDate] = useState(false);



    const onChange = (event: any, selectedDate: any) => {

      
        const currentDate = selectedDate || date;
       
        setDate(currentDate);

        setShowDate(!isShowDate);
        
        
    }

    const showDatePicker = () => {
        setShowDate(true);
    }

    const addFieldUserInfo  = (key: string, value: string) => {
        
        setUserInfo(prevInfo => ({
            ...prevInfo,
            [key]: value
        }))
    }

    return(
        <View style = {{ paddingHorizontal:30, marginTop: 70, marginBottom: 50 }}>

        <ScrollView showsVerticalScrollIndicator={false}  >
            <View style = {{ flexDirection:"row", alignItems:"center", marginBottom: 20 }}>

                <TouchableOpacity onPress = {onLogin}>
                    <FontAwesome5 name = "arrow-left" size = {15} style = {{ marginRight: 15 }}></FontAwesome5>
                </TouchableOpacity>                

                <Text style = { styler.page_title }>Create your Account</Text>

            </View>

                
            <View>
                <View>
                    <Text  style = {styler.section_title}>Account Information</Text>
                </View>

                <View>
                    <TextInput style = { styler.signup_field }  onChangeText = {(text) => addFieldUserInfo('username',text) }  placeholder = "Username"></TextInput>
                </View>

                <View>
                    <TextInput style = {  passwordMatched === "true" || passwordMatched === "" ? styler.signup_field : styler.signup_field_with_error } secureTextEntry onChangeText = {setPW }  placeholder = "Password"></TextInput>

                </View>

                <View>
                    <TextInput style = {  passwordMatched === "true" || passwordMatched === "" ? styler.signup_field : styler.signup_field_with_error } secureTextEntry onChangeText = {setDummyPW} placeholder = "Retry Password"></TextInput>
                </View>

            </View>


            <View style = {{ marginTop: 20 }}>
                <View>
                    <Text style = {styler.section_title}>Personal Information</Text>
                </View>

                <View>
                    <TextInput style = { styler.signup_field } onChangeText = {(text) => addFieldUserInfo('firstname',text) } placeholder = "First Name"></TextInput>
                </View>

                <View>
                    <TextInput style = { styler.signup_field } onChangeText = {(text) => addFieldUserInfo('lastname',text) }  placeholder = "Last Name"></TextInput>
                </View>

                <View>
                    <TextInput style = { styler.signup_field } value = {date.toLocaleDateString()} onPress = {showDatePicker} placeholder = "Birthdate"></TextInput>
                </View>

                { isShowDate && (  <DateTimePicker
                value = {date}
                mode = "date"
                display = "default"
                onChange = {onChange}/> )}
               

            </View>

            
            <View style = {{ marginTop: 20 }}>
                <View>
                    <Text  style = {styler.section_title}>Contact Information</Text>
                </View>

                <View>
                    <TextInput style =  { isEmailValid ? styler.signup_field : styler.signup_field_with_error } onChangeText = {(text) => validateEmail(text) }  placeholder = "Email Address"></TextInput>
                </View>

                <View>
                    <TextInput style = { styler.signup_field } maxLength={11} keyboardType='numeric' onChangeText = {(text) => addFieldUserInfo('phone',text) }  placeholder = "Enter 11-Digit Philippine SIM Mobile No. "></TextInput>
                </View>
            </View>

            <View style = {{ marginTop: 20 }}>

                <View>
                    <Text  style = {styler.section_title}>Address</Text>
                </View>

                <View style = {{ flexDirection:"row", justifyContent:"space-between" }}>

                    <View>
                        <TextInput style = { styler.signup_field }  onChangeText = {(text) => addFieldUserInfo('address_houselotno',text) }  placeholder = "House/Lot No."></TextInput>
                    </View>

                    <View>
                        <TextInput style = { styler.signup_field_short_address }  onChangeText = {(text) => addFieldUserInfo('address_street',text) }  placeholder = "Street"></TextInput>
                    </View>

                </View>

                <View>
                    <TextInput style = { styler.signup_field }  onChangeText = {(text) => addFieldUserInfo('address_village',text) }  placeholder = "Village"></TextInput>
                    <Picker selectedValue = {selectedCity} style = {styler.signup_field_picker} onValueChange={(itemValue, itemIndex) => setSelectedCity(itemValue)}>
                        
                        <Picker.Item label = "(Select Your City)" value = ""></Picker.Item>
                        <Picker.Item label = "Taguig City" value = "1"></Picker.Item>
                        <Picker.Item label = "Makati City" value = "2"></Picker.Item>
                        <Picker.Item label = "Paranaque City" value = "3"></Picker.Item>
                        <Picker.Item label = "Pasay City" value = "4"></Picker.Item>
                        
                    </Picker>
                </View>
            </View>

            { isFormComplete ? 
            
                        (

                        <TouchableOpacity onPress={nextToPaymentAccount}>
                            <View style = {{ flexDirection:"row", justifyContent:"flex-end", marginTop: 10 }}>
                                <View style = {styler.active_button}>
                                    <Text style = {{color:"#FFF", fontWeight: "bold", fontSize: 16}}>Next</Text>
                                    <FontAwesome5 name = "arrow-right" size = {12} style = {{marginLeft: 15}} color ="#FFF"></FontAwesome5>
                                </View>
                            </View>
                        </TouchableOpacity>

                        ) : (
                        
                        <TouchableOpacity>
                            <View style = {{ flexDirection:"row", justifyContent:"flex-end", marginTop: 10 }}>
                                <View style = {styler.inactive_button}>
                                    <Text style = {{color:"#FFF", fontWeight: "bold", fontSize: 16}}>Next</Text>
                                    <FontAwesome5 name = "arrow-right" size = {12} style = {{marginLeft: 15}} color ="#FFF"></FontAwesome5>
                                </View>
                            </View>
                        </TouchableOpacity>

                        )
                }
           
          
            </ScrollView>

        </View>
    );

}