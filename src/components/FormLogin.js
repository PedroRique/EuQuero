import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {ScrollView, StatusBar, View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Switch, Alert, Modal, TouchableHighlight } from 'react-native';
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
                <Text style={styles.btnEntrar}>ENTRAR</Text>
            </TouchableOpacity>
        );
    }

    render(){
        return (
            <ScrollView style={styles.container} contentContainerStyle={{flex:1}}>
                
                <StatusBar backgroundColor='#721214' />
                {/* <View style={styles.topo}>
                    <Image style={{height: 65 , width: 190}} source={ require('../imgs/logow.png') } />
                </View> */}
                <View style={styles.meio}>
                    {/* <Image style={styles.user} source={ require('../imgs/user.png') } /> */}
                    <Image style={{height: 82 , width: 250, marginVertical: 40}} source={ require('../imgs/logo.png') } />
                    <View style={{alignSelf: 'stretch'}}>
                        <TextInput 
                            value={ this.props.email }
                            style={styles.input}
                            placeholder='E-mail' 
                            placeholderTextColor='#aaa'
                            underlineColorAndroid='transparent'
                            onChangeText={texto => this.props.modificaEmail(texto)}
                        />
                        <TextInput 
                            secureTextEntry 
                            value={ this.props.senha } 
                            style={styles.input}
                            placeholder='Senha'
                            placeholderTextColor='#aaa'
                            underlineColorAndroid='transparent'
                            onChangeText={texto => this.props.modificaSenha(texto)}
                        />
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: '#fff', fontFamily: 'segoeuii'}}>Cliente</Text>
                        <Switch 
                            style={{marginHorizontal: 5}} 
                            onValueChange={value => {this._modificaLoginAs(value)}}
                            value={this.props.loginAs}
                            onTintColor='#FF9900'
                            tintColor='#FF9900' 
                            thumbTintColor='#fff'
                        />
                        <Text style={{color: '#fff', fontFamily: 'segoeuii'}}>Estabalecimento</Text>
                    </View>

                    <View>
                        {this.loading()}
                    </View>
                </View>

                <View style={styles.rodape}>
                   
                    <TouchableOpacity onPress={ () => false }>
                        <Text style={{ fontSize: 16, color: '#EDEDED', fontFamily: 'segoeuii'}}>Esqueceu a senha?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={ () => Actions.formCadastro() }>
                        <Text style={{ fontSize: 16, color: '#EDEDED', fontFamily: 'segoeuii'}}>Ainda não faz parte do nosso clube?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => false} style={{alignSelf: 'stretch',borderTopLeftRadius: 20,borderTopRightRadius: 20,}} activeOpacity={0.4}>
                        <View style={{alignSelf:'stretch'}}><Text style={styles.btnCadastrar}>CADASTRE-SE</Text>
                        <View style={styles.barraFinal}>
                        </View></View>
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
        backgroundColor: '#B30404',
    },
    topo: {
        backgroundColor: '#881518',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    meio: {
        backgroundColor: '#B30404',
        flex: 3,
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 25
    },
    rodape: {
        backgroundColor: '#B30404',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1
    },
    input: {
        alignSelf: 'stretch',
        height: 52,
        backgroundColor: 'white',
        borderWidth: 0,
        marginBottom: 10,
        padding: 10,
        fontSize: 18,
        textAlign: 'left',
        fontFamily: 'segoeuii'
    },
    user: {
        height: 150,
        width: 150,
        marginBottom: 25
    },
    btnEntrar: {
        paddingVertical: 8,
        paddingHorizontal: 100,
        backgroundColor: '#FF9900',
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        elevation: 1,
        marginBottom: 5,
        fontFamily: 'segoeui',
    },
    txtErro: {
        color: '#881518',
        fontSize: 24,
        alignSelf: 'center',
    },
    barraFinal: {
        height: 10,
        backgroundColor: '#FF9900',
        alignSelf: 'stretch'
    },
    btnCadastrar: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#FF9900',
        color: 'white',
        fontFamily: 'segoeui',
        textAlign: 'center',
        paddingTop: 13,
        paddingBottom: 8,
        paddingHorizontal: 20,
        fontSize: 16,
        alignSelf: 'center'
    }
    
});