import React, { Component } from 'react';
import {
    ScrollView,
    View,
    TextInput,
    Text,
    Button, 
    StyleSheet, 
    TouchableOpacity, 
    Image, 
    ActivityIndicator, 
    StatusBar, 
    Switch, 
    Modal, 
    TouchableHighlight,
    Alert,
    PixelRatio,
    Platform
} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { 
    modificaEmail, 
    modificaSenha, 
    modificaNome, 
    cadastraUsuario,
    modificaLoginAs,
    modificaChaveEntrada
} from '../actions/AutenticacaoActions';

class formCadastro extends Component {

    constructor(props){
        super(props);

        this.state = {modalVisible: false};
    }


    _cadastraUsuario(){
        const { nome, email, senha, loginAs, chaveEntrada } = this.props;
        let tipo = '';

        if(loginAs) {
            tipo = 'estab';
        }else {
            tipo = 'client';
        }

        console.log(chaveEntrada);

        if(this.validateForm()){
            this.props.cadastraUsuario({ nome, email, senha, tipo, chaveEntrada});
        }else{
            alert('tem erro');
        }

    }

    validateForm(){
        const { nome, email, senha, loginAs, chaveEntrada } = this.props;
        let status = true;

        if(chaveEntrada.length < 8){
            status = false;
        }

        if(nome == "" || email == "" || senha == "" || chaveEntrada == ""){
            status = false;
        }

        return status;

    }

    _modificaLoginAs(newValue){
        this.props.modificaLoginAs(newValue);
    }

    setModalVisible(status){
        this.setState({modalVisible: status})
    }

    alertQuestion(){
        Alert.alert(
        'Sobre Tipo',
        'Pedimos que você escolha entre Cliente e Estabelecimento para disponibilizar as funções necessárias do aplica. \nEscolha o perfil que representa você e aproveite!',
        [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
        )
    }

    loading(){
        if(this.props.loadingCadastro){
            return(
                <ActivityIndicator size="large" color='#fff'/>
            );
        }
        return (
            <TouchableOpacity onPress={ () => { this._cadastraUsuario(); } }>
                <Text style={styles.btnEntrar}>Cadastrar</Text>
            </TouchableOpacity>
        );
    }
    render(){
        return (
            <ScrollView style={styles.container}>
                <StatusBar backgroundColor='#721214' />

                <View style={styles.topo}>
                    <Text style={styles.txtTopo}>Aproveite todas as nossas promoções! Descontos únicos para você!</Text>
                </View>

                <View style={styles.meio}>                     

                    <TextInput 
                        value={this.props.nome} 
                        style={styles.input} 
                        placeholderTextColor='#888'
                        placeholder='Nome'
                        underlineColorAndroid='transparent'
                        onChangeText={texto => this.props.modificaNome(texto)}
                    />
                    <TextInput 
                        autoCapitalize="none"
                        value={this.props.email} 
                        style={styles.input} 
                        placeholderTextColor='#888' 
                        placeholder='E-mail' 
                        underlineColorAndroid='transparent'
                        onChangeText={texto => this.props.modificaEmail(texto)}
                    />
                    <TextInput 
                        secureTextEntry 
                        value={this.props.senha}
                        style={styles.input}
                        placeholderTextColor='#888'
                        placeholder='Senha' 
                        underlineColorAndroid='transparent'
                        onChangeText={texto => this.props.modificaSenha(texto)}
                    />
                    <TextInput
                        maxLength={8}
                        autoCapitalize="characters"
                        value={this.props.chaveEntrada}
                        style={styles.input}
                        placeholderTextColor='#888'
                        placeholder='Chave de Entrada'
                        underlineColorAndroid='transparent'
                        onChangeText={texto => this.props.modificaChaveEntrada(texto.trim())}
                    />

                    <Text style={{ fontSize: 20, color: '#ff0000', textAlign: 'center'}}>
                        {this.props.erroCadastro}
                    </Text>

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
                        <Icon name='question' color='#fff' type='font-awesome' size={24} containerStyle={styles.question} underlayColor='#721214' onPress={() => this.setModalVisible(true)}/>
                    </View>
                    
                </View>

                <Modal
                    animationType="fade"
                    transparent={true}
                    backgroundColor="#000"
                    visible={this.state.modalVisible}
                    
                    onRequestClose={() => this.setModalVisible(!this.state.modalVisible)}
                    >
                    <View style={{ padding:40, flex:1, backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>
                        <View style={{backgroundColor:'#fff', flex: 1, borderRadius: 5, padding: 20}}>
                            <Icon name='close' onPress={() => this.setModalVisible(false)} underlayColor="#999" containerStyle={{borderRadius: 5, alignSelf: 'flex-end'}}/>
                            <Text>Hello World!</Text>


                        </View>
                    </View>
                </Modal>

                <View style={styles.rodape}>
                    {this.loading()}
                </View>
            </ScrollView>
        );
    }

} 

const mapStateToProps = state => (
    {
        nome: state.AutenticacaoReducer.nome,
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        erroCadastro: state.AutenticacaoReducer.erroCadastro,
        loadingCadastro: state.AutenticacaoReducer.loadingCadastro,
        loginAs: state.AutenticacaoReducer.loginAs,
        chaveEntrada: state.AutenticacaoReducer.chaveEntrada
    }
)

export default connect(
    mapStateToProps, 
    { 
        modificaEmail, 
        modificaSenha, 
        modificaNome,
        cadastraUsuario,
        modificaLoginAs,
        modificaChaveEntrada,
    }
)(formCadastro);

const styles = StyleSheet.create({
    
    container: {
        backgroundColor: '#e56c25',
        flex: 1
    },
    txtTopo: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        backgroundColor: '#881518',
        padding: 20,
        borderRadius: 5,
        elevation: 3
    },
    topo: {
        backgroundColor: '#e56c25',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        marginVertical: 10
    },
    meio: {
        backgroundColor: '#e56c25',
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    rodape: {
        backgroundColor: '#e56c25',
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 5
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
    question: {
        elevation: 2, 
        marginLeft: 10, 
        borderRadius: 20,
        width: 40,
        height: 40,
        backgroundColor: '#881518',  
        padding: 5
    },
    ImageContainer: {
        width: 250,
        height: 250,
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    
});