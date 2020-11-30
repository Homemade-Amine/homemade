import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },

    scrollView : {
        flex: 1, 
        width: '100%' 
    },
    
    logo: {
        flex: 1,
        height: 120,
        width: 140,
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },

    text : {
       
        overflow: 'hidden',
        fontSize: 14,
        marginTop : 15,
        fontWeight: "bold",
        marginLeft: 17,
        marginRight: 30,
        paddingLeft: 16
    },

    button: {
        backgroundColor: '#87DA54',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: '#763C0B',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#763C0B",
        fontWeight: "bold",
        fontSize: 16
    },

    picker: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        marginBottom : 10,
        height: 48,
        borderRadius: 5,
        justifyContent: 'center'
    },

    phoneNumber: {
        height: 48,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
        
    },

    datebirth :{
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        marginBottom : 10,
        height: 48,
        borderRadius: 5,
        width:320,
        backgroundColor : 'white'
        
    },

    dropDownGender : {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        marginBottom : 10,
        height: 48,
        borderRadius: 5,
        width:320,
        backgroundColor : 'white'
    },

    checkboxCGUContainer: {
        flexDirection: "row",
        marginTop : 20,
        marginBottom: 20,
        marginLeft : 30,
      },

    checkbox_cgu: {
        alignSelf: "center",
    },
    label_cgu: {
        margin: 8,
    },
   
})