import React, {Component} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Modal, Button, ListView, ScrollView, TextInput} from 'react-native';
import {Rating, Icon} from 'react-native-elements';
import Voucher from 'voucher-code-generator';
import { validarCupom, resetValidacao } from '../actions/AppActions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

class MinhaPromocao extends Component{

    constructor(props){
        super(props);

        this.state =  {codigo: '', modalVisible: false};
    }

    componentWillMount(){
        this.criaFonteDeDados(this.props.item.diasValidosPromo);
    }

    criaFonteDeDados(dias){
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        
        this.listDias = ds.cloneWithRows(dias);
    }
   
    loading(){
        return (
            <TouchableOpacity onPress={ () => this.setModalVisible(true) }>
                <Text style={styles.btnResgatar}>Validar Cupom</Text>
            </TouchableOpacity>
        );
    }

    validaStatus(){

        if(this.props.validaCupomStatus){//true se for validado com sucesso

            return (
                <View style={{ padding:40,flex:1, backgroundColor: 'rgba(0, 0, 0, 0)', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{backgroundColor:'#fff', borderRadius: 5, padding: 20, borderColor: '#881518', borderWidth: 1, borderStyle: 'solid', alignSelf: 'stretch'}}>
                        <TouchableOpacity onPress={() => this.setModalVisible(false)}>
                            <Icon name='close'  underlayColor="#999" containerStyle={{borderRadius: 5, alignSelf: 'flex-end'}}/>
                        </TouchableOpacity>
                        
                        <Text style={{marginBottom: 20, fontSize: 24,textAlign: 'center'}}>Cupom válido!</Text>

                        <TouchableOpacity onPress={() => {
                            this.setModalVisible(false);
                            this.props.resetValidacao();}}>
                            <Text style={styles.btnValidar}>Voltar</Text>
                        </TouchableOpacity>
                    </View>                     
                </View>
                
            );

        }

        return (
            <View style={{ padding:40,flex:1, backgroundColor: 'rgba(0, 0, 0, 0)', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{backgroundColor:'#fff', borderRadius: 5, padding: 20, borderColor: '#881518', borderWidth: 1, borderStyle: 'solid', alignSelf: 'stretch'}}>
                    <TouchableOpacity onPress={() => this.setModalVisible(false)}>
                        <Icon name='close'  underlayColor="#999" containerStyle={{borderRadius: 5, alignSelf: 'flex-end'}}/>
                    </TouchableOpacity>
                    <TextInput
                        maxLength={8}
                        autoCapitalize="characters"
                        value={this.state.codigo}
                        style={[styles.input, {marginTop: 20, fontSize: 24, alignSelf: 'stretch', textAlign: 'center', marginBottom: 20}]}
                        placeholderTextColor='#888'
                        placeholder='Código do Cupom'
                        underlineColorAndroid='transparent'
                        onChangeText={texto => this.setState({codigo: texto})}
                    />

                    <TouchableOpacity onPress={() => this._validarCupom()}>
                        <Text style={styles.btnValidar}>Validar!</Text>
                    </TouchableOpacity>
                </View>                     
            </View>
        )
    }

    calculaPreco(){
        let { valorInicialPromo, descontoPromo } = this.props.item;
        return valorInicialPromo - ((valorInicialPromo * descontoPromo) / 100);
    }

    _validarCupom(){

        const { item
        } = this.props;

        const codigo = this.state.codigo;

        if(codigo.length == 8){
            this.props.validarCupom({
                item,
                codigo
            });
        }
    }

    setModalVisible(status){
        this.setState({modalVisible: status});
    }

    render(){
        return (
            <View style={styles.container}>
                

                <ScrollView contentContainerStyle={styles.meio}>
                <Image source={{uri: this.props.item.imageURL}} style={{alignSelf: 'stretch',width: null, height: 200}}/>
                    
                    
                    <Text style={styles.titulo}>{this.props.item.title}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <View style={styles.boxAvatar}>
                            <Image source={{uri: this.props.item.estabImageURL}} style={{width:60, height: 60, borderRadius: 30}}/>
                        </View>
                        <Text style={styles.estab}>{this.props.item.nomeEstab}</Text>
                        <Rating
                            showRating={false}
                            imageSize={20}
                            type="star"
                            onFinishRating={this.ratingCompleted}
                            style={{ paddingVertical: 10 , marginLeft: 7}}
                        />
                    </View>
                    
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 20}}>
                        <Text style={styles.desc}>{this.props.item.descontoPromo}% OFF</Text>
                        <View style={{borderRadius: 5, borderWidth: 1, borderColor: '#888',backgroundColor: '#eeeeee', paddingHorizontal: 20, paddingVertical: 5, marginLeft: 10}}>
                            <Text style={styles.valorInicial}>de R${this.props.item.valorInicialPromo} por</Text>  
                            <Text style={styles.preco}>R${this.calculaPreco()}</Text> 
                        </View>
                    </View>
                                 
    
                    <Text style={styles.descricao}>{this.props.item.descricaoPromo}</Text>

                    <View style={{flex: 1, marginBottom: 20, marginTop: 20}}>
                        <Text style={styles.estab}>Dias Válidos</Text>
                        <ListView
                            contentContainerStyle={{flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}
                            enableEmptySections
                            dataSource={this.listDias}
                            renderRow={data =>(
                                    <View key={data.key}>
                                            {data.isValid ? <Text style={styles.txtDiaValid}>{data.dia}</Text> :
                                            <Text style={styles.txtDia}>{data.dia}</Text>}
                                    </View>
                                )
                            }
                        />


                    </View>

                    <TouchableOpacity onPress={() => false}>
                        <Text style={styles.regula}>Ver Regulamento</Text>
                    </TouchableOpacity>

                    {this.loading()}     
                </ScrollView>

                

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}

                    onRequestClose={() => this.setModalVisible(!this.state.modalVisible)}
                    >
                    <View style={{ padding:40,flex:1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center'}}>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    backgroundColor="transparent"
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.setModalVisible(!this.state.modalVisible)}
                    >
                    {this.validaStatus()}
                </Modal>

                
    
            </View>
        );
    }

}

const mapStateToProps = state => {
    return ({
        validaCupomStatus: state.AppReducer.validaCupomStatus
    })
} 

export default connect(
    mapStateToProps, 
    {
        validarCupom,
        resetValidacao
    }
)(MinhaPromocao);

const styles = StyleSheet.create({
    textCodigo:{
        fontSize: 30,
        color: '#881518',
        textAlign: 'center'
    },
    valorInicial:{
        fontSize:16,
        color: '#555',
        textAlign: 'right'
    },
    preco:{
        fontSize: 35,
        color: '#333',
        textAlign: 'right'
    },
    boxAvatar: { 
        elevation: 2,
        backgroundColor: '#ededed',
        width: 70, 
        height: 70, 
        borderRadius: 35, 
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 10
    },
    titulo: {
        fontSize: 30,
        color: '#333',
        fontWeight: 'bold'
    },
    estab:{
        color: '#666',
        fontSize: 20,
        marginHorizontal: 5,
        textAlign: 'center'
    },
    desc:{
        fontSize:30,
        color: '#e56c25',
        fontWeight: 'bold'
    },
    container: {
        justifyContent:'flex-start',
        alignItems: 'center', 
        backgroundColor: '#fff',
        flex: 1
    },
    descricao:{
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
        alignSelf: 'center',
        paddingHorizontal: 40
    },
    regula:{
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
        alignSelf: 'center',
        textDecorationLine: 'underline',
        marginBottom: 20
    },
    meio:{
        alignItems: 'center',
        paddingTop: 10
    },

    btnValidar:{
        paddingVertical: 10,
        alignSelf: 'stretch',
        backgroundColor: '#881518',
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        borderRadius: 5,
        elevation: 2,
        marginBottom: 5
    },
    btnResgatar: {
        paddingVertical: 10,
        paddingHorizontal: 100,
        backgroundColor: '#881518',
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        borderRadius: 5,
        elevation: 2,
        marginBottom: 5
    },
    txtDia: {
        padding: 5,
        backgroundColor: '#333',
        color: 'white',
        borderRadius: 15,
        width: 30,
        height: 30,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        fontWeight: 'bold',
        marginHorizontal: 2
    },

    txtDiaValid: {
        padding: 5,
        backgroundColor: '#e56c25',
        color: 'white',
        borderRadius: 15,
        width: 30,
        height: 30,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        fontWeight: 'bold',
        marginHorizontal: 2
    }
});