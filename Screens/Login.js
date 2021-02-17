// screens/Login.js
import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { updateEmail, updatePassword, login, getUser } from '../action/user'
import Firebase from '../config/Firebase'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Login extends React.Component {
    constructor() {  
        super();  
        this.state = { TextInputDisableStatus: true }  
        }

    componentDidMount = () => {
        Firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.getUser(user.uid)
                if (this.props.user != null) {
                    this.props.navigation.navigate('Profile')
                }
            }
        })
    }

    handleLogin = () => {
        this.props.login()
        this.props.navigation.navigate('Profile')           
    }
  
    onSendBtnPressed = () => {
        this.textInput.clear();
        this.setState({disabled: true, email: ''}); // clear the text value
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.containerForm}
            behavior={Platform.OS === "ios" ? "padding" : "height"} >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <TextInput
                    style={styles.inputBox}
                    autoCapitalize="none"
                   // value={this.props.user.email} 
                    defaultValue=""
                    ref={input => { this.textInput = input }}
                    keyboardType="email-address"
                    onChangeText= {email => this.props.updateEmail(email)}
                    placeholder='Email'
                    autoCapitalize='none'
                    clearButtonMode="while-editing"
                    //onSubmitEditing={this.onSendBtnPressed}
                />
                
                
                <TextInput
                    style={styles.inputBox}
                    value={this.props.user.password}
                    onChangeText={password => this.props.updatePassword(password)}
                    placeholder='Password'
                    clearButtonMode='always'
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} onPress={() => this.props.login() && this.onSendBtnPressed()}>
                    <Text style={styles.buttonText}>Se connecter</Text>                    
                </TouchableOpacity>
                <Button title="Pas encore de compte ? Inscrivez-vous !"
                onPress={() => this.props.navigation.navigate('Signup')}/>
                <Button title="Changez votre mot de passe : cliquez ici !"
                onPress={() => this.props.navigation.navigate('Signup')}/>
            </View>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerForm: {
        flex: 1,
    },
    inputBox: {
        width: '85%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'center'
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#F6820D',
        borderColor: '#F6820D',
        borderWidth: 1,
        borderRadius: 5,
        width: 200
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    buttonSignup: {
        fontSize: 12
    }
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateEmail, updatePassword, login, getUser }, dispatch)
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)