import React, {Component} from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';

import Alerta from './Alerta';

class Economia extends Component{
    constructor(props){
        super(props);

        this.state = {
            visible: false
        }
    }

    setAlert(visible){
        this.setState({visible});
    }

    renderCupons(){ //No componente Economia precisamos mostrar cupons que o usuário já utilizou, portanto só dou o push no array caso dataUso exista.
        let cupons = this.props.cupons;
        let cuponsArray = [];

        cupons.forEach((cupom, i) => {            

            let estilo = i % 2 ? styles.backBranco : styles.backCinza;
            let resgate = new Date(cupom.dataResgate).toLocaleDateString('pt');

            cuponsArray.push(
                <View key={i} style={[estilo, styles.backCupom]}>
                    <Text style={styles.txtCupom}>{resgate}</Text>
                    <Text style={styles.txtCupomBold}>{cupom.promo.nomePromo}</Text>
                    <Text style={styles.txtCupom}>R$ {cupom.promo.valorInicialPromo}</Text>
                </View>
            )
        });

        return cuponsArray;
    }

    render(){

        return(
            <View style={{flex:1}}>
                {/* <View style={styles.topData}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', alignSelf:'stretch'}}>
                        <Icon name='today' color='white' size={36} />
                    </View>
                    <View style={{flex: 3}}>
                        <Text style={{fontFamily: 'segoeuib', color: 'white', textAlign:'center', fontSize: 18}}>PERÍODO</Text>
                        <View style={{flexDirection:'row', alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={styles.dataTxt}>01/02/2018</Text>
                            <Text style={[styles.dataTxt, {marginHorizontal: 15}]}>à</Text>
                            <Text style={styles.dataTxt}>01/02/2018</Text>
                        </View>
                    </View>
                </View> */}

                <View style={styles.valores}>
                    <View style={[styles.valorBox, {borderRightWidth: 1, borderRightColor: '#b30404'}]}>
                        <Text style={styles.valorDesc}>Economizei</Text>
                        <Text style={styles.valor}>R$ 0,00</Text>
                    </View>
                    <View style={styles.valorBox}>
                        <Text style={styles.valorDesc}>Economizaria</Text>
                        <Text style={styles.valor}>R$ 0,00</Text>
                    </View>

                    <TouchableOpacity onPress={() => this.setAlert(true)} style={{alignItems:'center', justifyContent:'flex-end'}}>
                        <Icon name='info' color='#ff9900' size={24} containerStyle={{alignSelf: 'flex-end', marginRight:10, marginBottom: 7.5}}/>
                    </TouchableOpacity>
                </View>

                <Text style={styles.descTitle}>DESCONTOS EM PROMOÇÕES</Text>

                <ScrollView>
                    {this.renderCupons()}
                </ScrollView>

                <Alerta type='info' visible={this.state.visible} setAlert={this.setAlert.bind(this)} message='Na condição de usuário não pagante da mensalidade do aplicativo o usuário nao tem direito ao desconto integral. Apenas o usuário tipo associado pagante da mensalidade terá direito ao desconto integral das promoções.' />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    topData:{
        backgroundColor: '#b30404',
        flexDirection: 'row',
        marginTop: 5,
        paddingVertical: 10
    },
    dataTxt:{
        fontFamily: 'segoeui',
        fontSize: 16,
        color: 'white',
        textAlign: 'center'
    },
    valores: {
        flexDirection:'row',
        marginVertical: 15
    },
    valorBox:{
        alignItems: 'center',
        justifyContent:'space-around',
        flex: 1
    },
    valorDesc: {
        fontSize: 16,
        color: '#b30404',
        fontFamily:'segoeui',
        textAlign: 'center'
    },
    valor: {
        fontSize: 26,
        color: '#b30404',
        fontFamily: 'segoeuib'
    },
    descTitle:{
        color:'white',
        backgroundColor: '#b30404',
        fontFamily: 'segoeui',
        textAlign: 'center'
    },
    backCinza: {
        backgroundColor: '#ededed'
    },
    backBranco: {
        backgroundColor: '#fff'
    },
    txtCupom:{
        fontFamily: 'segoeui',
        fontSize: 16,
        flex:1
    },
    txtCupomBold:{
        fontFamily: 'segoeuib',
        fontSize: 16,
        flex: 2,
        marginLeft: 20
    },
    backCupom:{
        paddingVertical: 10,
        alignItems:'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
});


const mapStateToProps = state => {

    const cupons = _.map(state.AppReducer.cupons, (val, uid) => {        
        return {...val, uid}
    });

    return ({
        cupons: _.without(cupons, undefined),
    })
} 

export default connect(
    mapStateToProps, 
    {
        
    }
)(Economia);