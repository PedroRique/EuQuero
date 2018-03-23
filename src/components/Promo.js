import React, {Component} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Rating, Icon} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import geolib from 'geolib';
import {connect} from 'react-redux';
import {modificaPromoAtual} from '../actions/AppActions';

class Promo extends Component{

    constructor(props){
        super(props);
    }

    img = require('../imgs/plate.jpg');

    renderCateg(){
        let categs = this.props.item.stringCateg.split(',');
        let categArray = [];

        categs.forEach((element,i) => {
            let str = '';

            switch(element){
                case 'gastronomia': str = 'Gastronomia'; break;
                case 'bemestar': str = 'Bem-Estar'; break;
                case 'cultura': str = 'Cultura'; break;
                case 'mercados': str = 'Mercados'; break;
                case 'servicos': str = 'Serviços'; break;
                case 'esportelazer': str = 'Esporte e Lazer'; break;
                case 'saudebeleza': str = 'Saúde e Beleza'; break;
                default: str = '';
            }

            categArray.push(
                <Text key={i} style={styles.txtCateg}>{str}</Text>
            )
        });

        return categArray;
    }

    getDistance(){
        if(this.props.item.placeObj){
            this.distance = geolib.getDistanceSimple({latitude:-23.588509, longitude: -46.682489},{latitude: this.props.item.placeObj.latitude, longitude: this.props.item.placeObj.longitude});
        }
    }

    renderDias(){
        let dias = this.props.item.diasValidosPromo;
        let diasArray = [];

        dias.forEach((element, i) => {            

            let estilo = element.isValid ? styles.txtDiaValid : styles.txtDia;

            diasArray.push(
                <Text key={element.key} style={estilo}>{element.dia}</Text>
            )
        });

        return diasArray;
    }

    abrirPromocao(){
        this.props.modificaPromoAtual(this.props.item);
        Actions.promocao();
    }

    render(){
        const sizeStar = 14;
        this.getDistance();
        return (
            <TouchableOpacity onPress={() => this.abrirPromocao()} activeOpacity={0.5}>
            <View style={styles.container}>
                <View style={{flex: 2,  alignItems:'center', alignSelf:'stretch', justifyContent: 'center'}}>
                    <Image source={{uri: this.props.item.imageURL}} style={styles.promoImage} resizeMethod='scale' resizeMode='cover'/>
                </View>
    
                <View style={{alignSelf:'stretch', alignItems: 'center', justifyContent: 'space-between', flex: 3, padding: 10}}>

                    <Text style={styles.titulo}>{this.props.item.nomePromo}</Text>

                    <View style={{alignSelf:'stretch', alignItems:'center', justifyContent:'center',marginBottom:8}}>
                        {this.renderCateg()}
                    </View>

                    <Text style={styles.txtDistancia}>{this.distance}m</Text>

                    <View style={{flexDirection: 'row', alignSelf:'stretch'}}>
                        {this.renderDias()}
                    </View>
                    
                </View>

                <View style={{flex: 2, alignItems:'center', justifyContent:'space-around', alignSelf: 'stretch', padding: 10}}>
                    <View style={styles.descBox}>
                        <Text style={styles.desc}>{this.props.item.descontoPromo}%</Text>
                        <Text style={{fontFamily: 'segoeuii', fontSize: 12, color: '#FF9900'}}>de desconto</Text>
                    </View>

                    <View style={{flexDirection:'row', alignItems: 'center',justifyContent:'center', alignSelf: 'stretch'}}>
                        <Icon name='star' color='#AE0505' size={sizeStar}/>
                        <Icon name='star' color='#AE0505' size={sizeStar}/>
                        <Icon name='star' color='#AE0505' size={sizeStar}/>
                        <Icon name='star' color='#AE0505' size={sizeStar}/>
                        <Icon name='star' color='#999' size={sizeStar}/>
                    </View>
                </View>
    
            </View>
        </TouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({

    valorInicial:{
        fontSize:16,
        color: '#333'
    },
    preco:{
        fontSize: 30,
        color: '#333'
    },
    promoImage:{
        alignSelf: 'stretch',
        flex: 1, 
        marginTop: 5
    },
    titulo: {
        fontSize: 18,
        color: '#980000',
        fontFamily: 'segoeuib',
        textAlign: 'left',
        alignSelf: 'stretch',
        marginBottom:0,
    },
    estab:{
        color: '#666',
        fontSize:14
    },
    desc:{
        fontSize:32,
        color: 'white',
        fontFamily: 'segoeuib',
        marginBottom: -5
    },
    descBox:{
        backgroundColor: '#AE0505',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignSelf:'stretch',
        padding: 5,
    },
    container: {
        justifyContent:'flex-start', 
        alignItems: 'center', 
        alignSelf: 'stretch',
        flexDirection: 'row',
        borderBottomColor: '#ededed', 
        borderBottomWidth: 1,
    },
    btnEntrar: {
        paddingVertical: 10,
        alignSelf: 'stretch',
        backgroundColor: '#e56c25',
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        borderRadius: 5,
        elevation: 1,
    },
    txtCateg: {
        textAlign: 'left',
        fontFamily: 'segoeuii',
        alignSelf: 'stretch',
        fontSize: 14
    },
    txtDistancia: {
        textAlign: 'left',
        fontFamily: 'segoeuii',
        alignSelf: 'stretch',
        fontSize: 14,
        marginBottom:8
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

const mapStateToProps = state => {
    return({
        promo: state.AppReducer.promo
    })
}

export default connect(mapStateToProps, {modificaPromoAtual})(Promo);