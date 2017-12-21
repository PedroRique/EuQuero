import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {ScrollView, StatusBar, View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Switch, Alert, Modal } from 'react-native';
import {Icon} from 'react-native-elements';
import { modificaEmail, modificaSenha, autenticaUsuario, modificaLoginAs, limpaErroLogin, modificaSendoExibido} from '../actions/AutenticacaoActions';

class formLogin extends Component{

    constructor(props){
        super(props);
        
        this.state = { 
            loginAs: false,
            modalVisible: false,
        }
    }

    componentWillReceiveProps(nextProps){
        if((nextProps.erroLogin !== this.props.erroLogin) && (nextProps.erroLogin !== "") && (!nextProps.alertSendoExibido)){
           
            this.alertQuestion(nextProps.erroLogin);
        }
    }

    alertQuestion(erroMessage){
        Alert.alert(
        'Ocorreu um erro',
        erroMessage,
        [
            {text: 'OK', onPress: () => {this.props.limpaErroLogin()}},
        ],
        { cancelable: false }
        )
    }

    setModalVisible(status){
        this.setState({modalVisible: status})
    }

    _autenticaUsuario(){
        const { email, senha, loginAs} = this.props;

        let tipo = '';
        
        if(loginAs) {
            tipo = 'estab';
        }else {
            tipo = 'client';
        }

        this.props.modificaSendoExibido(true);
        this.props.autenticaUsuario({ email, senha, tipo});
    }

    _modificaLoginAs(newValue){
        this.props.modificaLoginAs(newValue);
    }

    loading(){
        if(this.props.loadingLogin){
            return(
                <ActivityIndicator size="large" color='#fff'/>
            );
        }
        return (
            <TouchableOpacity onPress={ () => { this._autenticaUsuario(); } }>
                <Text style={styles.btnEntrar}>Entrar</Text>
            </TouchableOpacity>
        );
    }

    render(){
        return (
            <ScrollView style={styles.container}>
                
                <StatusBar backgroundColor='#721214' />
                <View style={styles.topo}>
                    <Image style={{height: 65 , width: 190}} source={ require('../imgs/logow.png') } />
                </View>
                <View style={styles.meio}>
                    <Image style={styles.user} source={ require('../imgs/user.png') } />
                    <TextInput 
                        value={ this.props.email }
                        style={styles.input}
                        placeholder='E-mail' 
                        placeholderTextColor='#888'
                        underlineColorAndroid='transparent'
                        onChangeText={texto => this.props.modificaEmail(texto)}
                    />
                    <TextInput 
                        secureTextEntry 
                        value={ this.props.senha } 
                        style={styles.input}
                        placeholder='Senha'
                        placeholderTextColor='#888'
                        underlineColorAndroid='transparent'
                        onChangeText={texto => this.props.modificaSenha(texto)}
                    />
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: '#fff'}}>Cliente</Text>
                        <Switch 
                            style={{marginHorizontal: 5}} 
                            onValueChange={value => {this._modificaLoginAs(value)}}
                            value={this.props.loginAs} 
                            onTintColor='#721214' 
                            tintColor='#721214' 
                            thumbTintColor='#fff'
                        />
                        <Text style={{color: '#fff'}}>Estabalecimento</Text>
                    </View>

                </View>

                <View style={styles.rodape}>
                    {this.loading()}

                    <TouchableOpacity onPress={ () => Actions.formCadastro() }>
                        <Text style={{ fontSize: 16, color: '#EDEDED', marginVertical: 20 }}>Ainda não tem cadastro? Cadastre-se</Text>
                    </TouchableOpacity>
                </View>


                <Modal
                    animationType="slide"
                    transparent={true}
                    backgroundColor="#000"
                    visible={this.state.modalVisible}
                    
                    onRequestClose={() => this.setModalVisible(!this.state.modalVisible)}
                    >
                    <View style={{ padding:40, flex:1, backgroundColor: 'transparent', justifyContent: 'flex-end', alignItems: 'center', elevation: 20}}>
                        <View style={{backgroundColor:'#fff', borderRadius: 5, padding: 20}}>
                            <Icon name='close' onPress={() => this.setModalVisible(false)} underlayColor="#999" containerStyle={{borderRadius: 5, alignSelf: 'flex-end'}}/>
                            <Text style={styles.txtErro}>{this.props.erroLogin}</Text>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
} 

const mapStateToProps = state => (
    {
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        erroLogin: state.AutenticacaoReducer.erroLogin,
        loadingLogin: state.AutenticacaoReducer.loadingLogin,
        loginAs: state.AutenticacaoReducer.loginAs,
        sendoExibido: state.AutenticacaoReducer.sendoExibido,
    }
)

export default connect(
    mapStateToProps, 
    { 
        modificaEmail, 
        modificaSenha,
        autenticaUsuario,
        modificaLoginAs,
        limpaErroLogin,
        modificaSendoExibido
    }
)(formLogin);

const styles = StyleSheet.create({
    
    container: {
        backgroundColor: '#e56c25'
    },
    topo: {
        backgroundColor: '#881518',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    meio: {
        backgroundColor: '#e56c25',
        flex: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    rodape: {
        backgroundColor: '#e56c25',
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: 230, 
        height: 45,
        backgroundColor: 'white',
        borderWidth: 0,
        marginBottom: 20,
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
        textAlign: 'center'
    },
    user: {
        height: 150,
        width: 150,
        marginBottom: 25
    },
    btnEntrar: {
        paddingVertical: 10,
        paddingHorizontal: 100,
        backgroundColor: '#881518',
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        borderRadius: 5,
        elevation: 1,
        marginBottom: 5
    },
    txtErro: {
        color: '#881518',
        fontSize: 24,
        alignSelf: 'center',
    }
    
});