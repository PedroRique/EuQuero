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
    Platform,
    FlatList
} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import RNGooglePlaces from 'react-native-google-places';
import { 
    modificaEmail, 
    modificaSenha, 
    modificaNome, 
    cadastraUsuario,
    modificaLoginAs,
    modificaChaveEntrada,
    modificaCategTotal,
    modificaEndereco,
    modificaCPF,
    modificaCNPJ
} from '../actions/AutenticacaoActions';

class formCadastro extends Component {

    constructor(props){
        super(props);

        this.state = {
            modalVisible: false,
            modalCategVisible: false,
            categs: [{
                id: 'gastronomia',
                name: 'Gastronomia',
                status: false,
                icon: 'restaurant-menu',
                key: 0
            }, {
                id: 'bemestar',
                name: 'Bem-Estar',
                status: false,
                icon: 'favorite',
                key: 1
            }, {
                id: 'cultura',
                name: 'Cultura',
                status: false,
                icon: 'theaters',
                key: 2
            }, {
                id: 'mercados',
                name: 'Mercados',
                status: false,
                icon: 'shopping-cart',
                key: 3
            }, {
                id: 'servicos',
                name: 'Serviços',
                status: false,
                icon: 'work',
                key: 4
            }, {
                id: 'esportelazer',
                name: 'Esporte e Lazer',
                status: false,
                icon: 'fitness-center',
                key: 5
            }, {
                id: 'saudebeleza',
                name: 'Saúde e Beleza',
                status: false,
                icon: 'local-hospital',
                key: 6
            }],
            teste: 0
        };

    }

    _cadastraUsuario(){
        const { nome, email, senha, loginAs, chaveEntrada, cpf, cnpj, endereco } = this.props;
        let tipo = '';

        if(loginAs) {
            tipo = 'estab';
        }else {
            tipo = 'client';
        }

        if(this.validateForm()){
            this.props.cadastraUsuario({ nome, email, senha, tipo, chaveEntrada, cpf, cnpj, endereco});
        }else{
            alert('tem erro');
        }

    }

    validateForm(){
        const { nome, email, senha, loginAs, chaveEntrada, cpf, cnpj, endereco } = this.props;
        let status = true;

        if(chaveEntrada.length < 8){
            status = false;
        }

        if(nome == "" || email == "" || senha == "" || chaveEntrada == ""){
            status = false;
        }

        if(loginAs) {
            this.validaCNPJ(cnpj);
        }else {
            this.validaCPF(cpf);
        }

        return status;

    }

    validaCNPJ(cnpj){ //validacao falsa, temporária
        return cnpj.length == 13;
    }

    validaCPF(cpf){ //validacao falsa, temporária
        return cpf.length == 13;
    }

    _modificaLoginAs(newValue){
        this.props.modificaLoginAs(newValue);
    }

    setModalVisible(status){
        this.setState({modalVisible: status})
    }

    setModalCategVisible(status){
        this.setState({modalCategVisible: status})
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

    isEstab(){
        if(this.props.loginAs){
            return(
                <View>
                <TextInput 
                    autoCapitalize="none"
                    value={this.props.cnpj} 
                    style={styles.input}
                    placeholderTextColor='#888' 
                    placeholder='CNPJ'
                    underlineColorAndroid='transparent'
                    onChangeText={texto => this.props.modificaEmail(texto)}
                />
                <TextInput 
                    autoCapitalize="none"
                    value={this.props.endereco}
                    style={styles.input}
                    placeholderTextColor='#888'
                    placeholder='Endereço'
                    underlineColorAndroid='transparent'
                    onChangeText={texto => this.props.modificaEndereco(texto)}
                />
                </View>
            );

        }else{
            return(
                <TextInput 
                    autoCapitalize="none"
                    value={this.props.cpf} 
                    style={styles.input}
                    placeholderTextColor='#888' 
                    placeholder='CPF'
                    underlineColorAndroid='transparent'
                    onChangeText={texto => this.props.modificaEmail(texto)}
                />
            );
        }
    }

    changeIconStatus(i) {

        const categs = this.state.categs;
        let n = this.props.categTotal;
        let teste = this.state.teste + 1;

        if(n < 2 || categs[i].status){

            categs[i].status = !categs[i].status;
            this.setState({categs, teste});
    
            categs[i].status ?
            this.props.modificaCategTotal(++n) :
            this.props.modificaCategTotal(--n);

        }else{

            alert('maximo 2');
            
        }

    }

    openSearchModal() {
        RNGooglePlaces.openAutocompleteModal({country: 'BR'})
        .then((place) => {
            console.log(place);
            this.props.modificaEndereco(place);
        })
        .catch(error => console.log(error.message));  // error is a Javascript Error object 
      }

    render(){
        const { selectedItems } = this.state;
        return (
            <ScrollView style={styles.container}>
                <StatusBar backgroundColor='#721214' />

                <View style={styles.topo}>
                    <Text style={styles.txtTopo}>Aproveite todas as nossas promoções! Descontos únicos para você!</Text>
                </View>

                <View style={styles.meio}>     

                    <TouchableOpacity onPress={() => this.openSearchModal()}>
                        <Text style={{fontSize: 24, color: '#fff', marginBottom: 25}}>Categorias</Text>
                    </TouchableOpacity>                

                    {/* {GooglePlacesInput()} */}

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

                    {this.isEstab()}

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
                            <Text>Explicação!</Text>


                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="fade"
                    transparent={true}
                    backgroundColor="#000"
                    visible={this.state.modalCategVisible}
                    onRequestClose={() => this.setModalCategVisible(!this.state.modalCategVisible)}
                    >
                    <View style={{ padding:40, flex:1, backgroundColor: 'rgba(0, 0, 0, 0.8)', alignItems:'center', justifyContent: 'center'}}>
                        <View  key={this.state.teste} style={{backgroundColor:'#fff', borderRadius: 5, padding: 20, alignSelf: 'stretch', flex: 1}}>

                            <FlatList
                                data={this.state.categs}
                                renderItem={({item}) => {

                                    const icon = item.status ? 'check-circle' : 'add';
                                    const color = item.status ? 'green' : '#666';
                                    const lastchild = (item.key == this.state.categs.length - 1) ? styles.categItemLast : styles.categItem;

                                    return(
                                        <View style={lastchild}>
                                        <TouchableOpacity style={{alignSelf: 'stretch', flexDirection: 'row', flex: 1, justifyContent: 'space-between'}} onPress={() => this.changeIconStatus(item.key)}>
                                            <View style={{flexDirection: 'row'}}>
                                                <Icon name={item.icon} containerStyle={{marginRight: 5}} color='#881518'/>
                                                <Text style={styles.categItemTxt}>{item.name}</Text>
                                            </View>
                                            <Icon name={icon} color={color}/>
                                        </TouchableOpacity>
                                        </View>
                                    )
                                }}
                            />

                            <TouchableOpacity onPress={ () => this.setModalCategVisible(false)}>
                                <Text style={styles.btnConfirma}>Confirmar</Text>
                            </TouchableOpacity>

                            <Text>{this.props.categTotal}</Text>
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
        chaveEntrada: state.AutenticacaoReducer.chaveEntrada,
        categTotal: state.AutenticacaoReducer.categTotal,
        endereco: state.AutenticacaoReducer.endereco,
        cpf: state.AutenticacaoReducer.cpf,
        cnpj: state.AutenticacaoReducer.cnpj,
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
        modificaCategTotal,
        modificaEndereco,
        modificaCPF,
        modificaCNPJ
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
    btnConfirma: {
        paddingVertical: 10,
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
    categItem:{
        flexDirection: 'row',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#333'
    },
    categItemLast:{
        flexDirection: 'row',
        paddingVertical: 15,
        borderBottomWidth: 0
    },
    categItemTxt: {
        fontSize: 20,
        color: '#333'
    }
    
});