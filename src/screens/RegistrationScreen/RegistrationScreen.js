import React, { useState, useRef } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, ScrollView} from 'react-native'
import DatePicker from 'react-native-datepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropDownPicker from 'react-native-dropdown-picker';
import CheckBox from '@react-native-community/checkbox';
import { firebase } from '../../firebase/config';
import styles from './styles';

export default function RegistrationScreen({navigation}) {
    
    const [selectedTypeUserValue, setSelectedTypeUserValue] = useState('cook');
    const [nameCook, setNameCook] = useState('')
    const [firstNameCook, setFirstNameCook] = useState('')
    const [emailCook, setEmailCook] = useState('')
    const [phoneCook, setPhoneCook] = useState('')
    const [siretCook, setSiretCook] = useState('')
    
    const [streetNumber, setStreetNumber] = useState('')
    const [street, setStreet] = useState('')
    const [complementStreet, setComplementStreet] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [countryName, setCountryName] = useState('')
    
    
    const [dateOfBirthCook, setDateOfBirthCook] = useState("16-11-2020")
    const [genderCook, setGenderCook] = useState('male')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [cguAccepted, setCguSelected] = useState(false);

    
    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }


    const checkRegistration = () => {

        let messageError = "";

        if(nameCook == ""){
            messageError = messageError + "Please enter a name \n";

        }

        if(firstNameCook == ""){
            messageError = messageError + "Please enter a first name \n";
        }

        if(phoneCook == ""){
            messageError = messageError + "Please enter a phone number \n";
        }

        if(siretCook == ""){
            messageError = messageError + "Please enter your SIRET \n";
        }

        if(streetNumber == "" || street == "" || zipCode == "" || countryName == ""){
            messageError = messageError + "Please enter an addresse correctly \n";
        }

        if(dateOfBirthCook == ""){
            messageError = messageError + "Please enter a date of birth \n";
        }
        
        return messageError;
    }

    const onRegisterPress = () => {

        let message = "";
        let idUser = Math.floor(Math.random() * Math.floor(9999999));
        let idAddresse = Math.floor(Math.random() * Math.floor(9999999));

        message = checkRegistration();
        
        if(!message == ""){
            alert(message);
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }

        switch(selectedTypeUserValue){

            case 'cook' :
                
                //Save Entrie in Cooks Column
                firebase.database().ref('Cooks').child(nameCook).set({
                    idCook : idUser,
                    nameCook : nameCook,
                    firstNameCook : firstNameCook,
                    mailCook : emailCook,
                    phoneCook : phoneCook,
                    siretCook : siretCook,
                
                }).then(function() {
                    console.log("Success cook entries in database");
                }).catch(function(error) {
                    alert('Entries cook failed, ' + error);
                    return;
                });

                //Save addresse Entrie in Addresses Column
                firebase.database().ref('Addresses').child(nameCook).set({
                    idAddresse : idAddresse,
                    numberStreet : streetNumber,
                    labelAddress : street,
                    addressComplement : complementStreet,
                    zipCode : zipCode,
                    country : countryName,

                }).then(function() {
                    console.log("Success address cook entries in database");
                }).catch(function(error) {
                    alert('Entries cook addresse failed, ' + error);
                    return;
                });
                
                break;
            
            case 'deliverer':
                alert("Deliverer");
                break;
            
            case 'client':
                alert("Client");
                break;

            default :
                alert("Error 404");
                return;
        }

        firebase
            .auth()
            .createUserWithEmailAndPassword(emailCook, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    nameCook,
                    firstNameCook,
                    emailCook,
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        navigation.navigate('Home', {user: data})
                    })
                    .catch((error) => {
                        alert(error)
                    });
                
            })
            .catch((error) => {
                alert(error)
        });



    }

    return (

        
        <View style={styles.container}>
                

            <ScrollView style={styles.scrollView}>            
                <Image
                    style={styles.logo}
                    source={require('../../../assets/logo_homemade.png')}
                />
                
                <Text style={styles.text}>
                   You are a : 
                </Text>
                <DropDownPicker
                    items={[
                        {label: 'Cook', value: 'cook'},
                        {label: 'Deliverer', value: 'deliverer'},
                        {label: 'Client', value: 'client'},
                    ]}
                    defaultValue={selectedTypeUserValue}
                    
                    style={styles.dropDownGender}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => setSelectedTypeUserValue(item.value)}
                />

                <Text style={styles.text}>
                    Name : 
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder='Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setNameCook(text)}
                    value={nameCook}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

                <Text style={styles.text}>
                    First name : 
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder='First Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFirstNameCook(text)}
                    value={firstNameCook}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

                <Text style={styles.text}>
                    Email : 
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmailCook(text)}
                    value={emailCook}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
            
                <Text style={styles.text}>
                    Phone number: 
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder='Phone'
                    keyboardType = 'numeric'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setPhoneCook(text)}
                    value={phoneCook}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

                
                <Text style={styles.text}>
                    SIRET : 
                </Text>      
                <TextInput
                    style={styles.input}
                    keyboardType = 'numeric'
                    placeholder='Siret'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setSiretCook(text)}
                    value={siretCook}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

                <Text style={styles.text}>
                    Street number : 
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder='Street number (15, 15B...)'
                    placeholderTextColor="#aaaaaa"
                    keyboardType = 'numeric'
                    onChangeText={(text) => setStreetNumber(text)}
                    value={streetNumber}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

                <Text style={styles.text}>
                    Street : 
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder='Street (Beverly Boulevard)'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setStreet(text)}
                    value={street}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

                <Text style={styles.text}>
                    Additional address : 
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder='Additional address (Batiment B, port 224)'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setComplementStreet(text)}
                    value={complementStreet}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

                <Text style={styles.text}>
                    Zip code : 
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder='Zip code (75010)'
                    placeholderTextColor="#aaaaaa"
                    keyboardType = 'numeric'
                    onChangeText={(text) => setZipCode(text)}
                    value={zipCode}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

                <Text style={styles.text}>
                    Country / Region : 
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder='Country / Region (France)'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setCountryName(text)}
                    value={countryName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

                <Text style={styles.text}>
                    Date of birth : 
                </Text>
                <DatePicker
                    style={styles.datebirth}
                    date={dateOfBirthCook}
                    title="Date Of Birth"
                    mode="date"
                    placeholder="select date"
                    format="DD-MM-YYYY"
                    minDate="01-01-1900"
                    maxDate="16-11-2020"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={(date) => {setDateOfBirthCook(date)}}
                />

                
                <Text style={styles.text}>
                    Gender : 
                </Text>
                <DropDownPicker
                    items={[
                        {label: 'Male', value: 'male'},
                        {label: 'Female', value: 'female'},
                        
                    ]}
                    defaultValue={genderCook}
                    
                    style={styles.dropDownGender}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => setGenderCook(item.value)}
                />

                <Text style={styles.text}>
                    Password : 
                </Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

                <Text style={styles.text}>
                    Confirm password : 
                </Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {/*<View style={styles.checkboxCGUContainer}>
                    <CheckBox
                        value={cguAccepted}
                        onValueChange={setCguSelected}
                        style={styles.checkbox_cgu}
                    />
                    <Text style={styles.label_cgu}>I accept the terms and conditions</Text>
                </View>*/}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View>
            </ScrollView>

        </View>
    )
}