import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'


import Firebase from '../config/Firebase'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, signup } from '../actions/user'


class Signup extends React.Component {
    
    handleSignUp = () => {
        this.props.signup()
        if (this.props.user.email != null) {
            this.props.navigation.navigate('Profile')
        }
    }

    render() {
        return (
            
            <KeyboardAvoidingView style={styles.containerForm} 
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                <TextInput
                    style={styles.inputBox}
                    autoCapitalize="none"
                    //value={this.props.user.email}
                    defaultValue=""
                    keyboardType="email-address"
                    onChangeText={email => this.props.updateEmail(email)}
                    placeholder='Email'
                    clearButtonMode="while-editing"
                    //onSubmitEditing={this.handleAddPress}
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.props.user.password}
                    onChangeText={password => this.props.updatePassword(password)}
                    placeholder='Password'
                    secureTextEntry={true}
                />
               <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
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
        backgroundColor: '#FFA611',
        borderColor: '#FFA611',
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
    return bindActionCreators({ updateEmail, updatePassword, signup }, dispatch)
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup)