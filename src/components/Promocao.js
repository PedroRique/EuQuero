import React, {Component} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Modal, Button, ListView, ScrollView} from 'react-native';
import {Icon} from 'react-native-elements';
import Voucher from 'voucher-code-generator';
import {geraCupom, resetResgate} from '../actions/AppActions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

class Promocao extends Component{

    constructor(props){
        super(props);

        this.state =  {codigo: '', modalVisible: false};
    }

    componentWillReceiveProps(nextProps){
        this.setModalVisible(nextProps.geraCupomStatus);
    }
   
    loading(){
        if(!this.props.loginAs){
            return (
                <TouchableOpacity onPress={ () => this.geraCodigo() }>
                    <Text style={styles.btnResgatar}>Resgatar Cupom</Text>
                </TouchableOpacity>
            );
        }else{
            return (
                <Text style={[styles.btnResgatar,{backgroundColor: '#999', color: '#666'}]}>Resgatar Cupom</Text>
            );
        }
    }

    calculaPreco(){
        let { valorInicialPromo, descontoPromo } = this.props.item;
        return valorInicialPromo - ((valorInicialPromo * descontoPromo) / 100);
    }

    geraCodigo(){
        let codigo = Voucher.generate({
            length: 8,
            count: 1,
            charset: Voucher.charset("alphabetic")
        });

        codigo = codigo.toString().toUpperCase();

        this.setState({codigo});
        // this.setModalVisible(true);
        
        this._geraCupom(codigo);
    }

    _geraCupom(codigo){

        const { item
        } = this.props;

        this.props.geraCupom({
            item,
            codigo
        });
    }

    setModalVisible(status){
        this.setState({modalVisible: status});
    }

    renderCateg(){
        let categs = this.props.item.stringCateg.split(',');
        let str = '';

        categs.forEach((element,i) => {

            let categ = '';

            switch(element){
                case 'gastronomia': categ = 'Gastronomia'; break;
                case 'bemestar': categ = 'Bem-Estar'; break;
                case 'cultura': categ = 'Cultura'; break;
                case 'mercados': categ = 'Mercados'; break;
                case 'servicos': categ = 'Serviços'; break;
                case 'esportelazer': categ = 'Esporte e Lazer'; break;
                case 'saudebeleza': categ = 'Saúde e Beleza'; break;
                default: categ = '';
            }

            if(i == categs.length - 1){
                str = `${str} | ${categ}`;
            }else{
                str = `${categ}`
            }
            
        });

        return (<Text style={styles.txtBasico}>{str}</Text>);
    }

    renderDias(){
        let dias = this.props.item.diasValidosPromo;
        let diasArray = [];

        dias.forEach(element => {            

            let estilo = element.isValid ? styles.txtDiaValid : styles.txtDia;

            diasArray.push(
                <Text style={estilo}>{element.dia}</Text>
            )
        });

        return diasArray;
    }

    render(){
        return (

            <ScrollView contentContainerStyle={styles.meio}>
            
                <Image source={{uri: this.props.item.imageURL}} style={{alignSelf: 'stretch',width: null, height: 200}}/>
                    
                <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'flex-start', alignSelf:'stretch'}}>
                    <View style={styles.boxAvatar}>
                        <Image source={{uri: this.props.item.estabImageURL}} style={{width:100, height: 100}}/>
                    </View>

                    <View style={{alignSelf: 'stretch', alignItems: 'flex-start'}}>
                        <Text style={styles.estab}>{this.props.item.nomeEstab}</Text>

                        {this.renderCateg()}

                        <View style={{flexDirection: 'row', alignSelf:'stretch'}}>
                            <Text style={styles.txtBasico}>Dias Válidos</Text>
                            {this.renderDias()}
                        </View>
                    </View>
                </View>
                
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 20}}>
                    <Text style={styles.desc}>{this.props.item.descontoPromo}% OFF</Text>
                    <View style={{borderRadius: 5, borderWidth: 1, borderColor: '#888',backgroundColor: '#eeeeee', paddingHorizontal: 20, paddingVertical: 5, marginLeft: 10}}>
                        <Text style={styles.valorInicial}>de R${this.props.item.valorInicialPromo} por</Text>  
                        <Text style={styles.preco}>R${this.calculaPreco()}</Text> 
                    </View>
                </View>
                                

                <Text style={styles.descricao}>{this.props.item.descricaoPromo}</Text>

                


                <TouchableOpacity onPress={() => false}>
                    <Text style={styles.regula}>Ver Regulamento</Text>
                </TouchableOpacity>

                {this.loading()}     

                    
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
                    
                    onRequestClose={() => {
                        this.props.resetResgate();
                        this.setModalVisible(!this.state.modalVisible)
                    }}
                    >
                    <View style={{ padding:40,flex:1, backgroundColor: 'rgba(0, 0, 0, 0)', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{backgroundColor:'#fff', borderRadius: 5, padding: 20, borderColor: '#881518', borderWidth: 1, borderStyle: 'solid', alignSelf: 'stretch'}}>
                        <TouchableOpacity onPress={() => {this.props.resetResgate();this.setModalVisible(false)}}>
                            <Icon name='close'  underlayColor="#999" containerStyle={{borderRadius: 5, alignSelf: 'flex-end'}}/>
                        </TouchableOpacity>
                        
                        <Text style={{marginBottom: 20, fontSize: 24,textAlign: 'center'}}>Cupom resgatado e adicionado em sua lista!</Text>

                        <TouchableOpacity onPress={() => {
                            this.setModalVisible(false);
                            this.props.resetResgate();
                            Actions.cupons();} }>
                            <Text style={styles.btnVoltar}>Meus Cupons</Text>
                        </TouchableOpacity>
                    </View>                     
                </View>
                </Modal>
            </ScrollView>
    
        );
    }

}

const mapStateToProps = state => {
    return ({
        geraCupomStatus: state.AppReducer.geraCupomStatus,
        loginAs: state.AutenticacaoReducer.loginAs
    })
} 

export default connect(
    mapStateToProps, 
    {
        geraCupom,
        resetResgate
    }
)(Promocao);

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
        width: 100, 
        height: 100, 
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
        color: '#b30404',
        fontSize: 20,
        marginHorizontal: 5,
        textAlign: 'center',
        fontFamily:'segoeuib'
    },
    txtBasico:{
        color: '#666',
        fontSize: 16,
        marginHorizontal: 5,
        textAlign: 'center',
        fontFamily:'segoeuii'
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
        padding: 8,
        backgroundColor: 'white'
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
    btnVoltar:{
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
    txtDia: {
        backgroundColor:'#999',
        color: 'white',
        marginHorizontal: 1,
        paddingHorizontal: 5,
        paddingVertical: 0,
        fontFamily: 'segoeuib',
        fontSize: 10,
        borderRadius: 2,
    },
    txtDiaValid: {
        backgroundColor: '#b30404',
        color: 'white',
        marginHorizontal: 1,
        paddingHorizontal: 5,
        paddingVertical: 0,
        fontFamily: 'segoeuib',
        fontSize: 10,
        borderRadius: 2
    }
});