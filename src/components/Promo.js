import React, {Component} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Rating, Icon} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

export default class Promo extends Component{

    constructor(props){
        super(props);
    }

    img = require('../imgs/plate.jpg');

    renderCateg(){
        let categs = this.props.item.stringCateg.split(',');
        let categArray = [];

        categs.forEach(element => {
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
                <Text style={styles.txtCateg}>{str}</Text>
            )
        });

        return categArray;
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
        const sizeStar = 14;
        return (
            // onPress={() => {Actions.promocao({item: this.props.item, title: this.props.item.nomePromo})}}
            <View style={styles.container}>
                <View style={{flex: 2, alignItems: 'center', justifyContent:'center', alignSelf:'stretch'}}>
                    {this.props.item.imageURL ? <Image source={{uri: this.props.item.imageURL}} style={styles.promoImage} resizeMode="cover"/> :
                    <Image source={this.img} style={styles.promoImage} resizeMode="cover"/>}
                </View>
    
                <View style={{alignSelf:'stretch', alignItems: 'center', justifyContent: 'space-between', flex: 3, padding: 10}}>

                    <Text style={styles.titulo}>{this.props.item.nomePromo}</Text>

                    <View style={{alignSelf:'stretch', alignItems:'center', justifyContent:'center',marginBottom:8}}>
                        {this.renderCateg()}
                    </View>
                    

                    

                    <Text style={styles.txtDistancia}>800m | Freguesia</Text>

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
                        <Icon name='star' color='#ededed' size={sizeStar}/>
                    </View>
                </View>
    
            </View>
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
    promoImage: {
        width: null,
        height: 100,
        alignSelf: 'stretch',
        marginVertical: 5,
        marginHorizontal: 5,
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
        backgroundColor:'#ddd',
        marginHorizontal: 1,
        paddingHorizontal: 5,
        paddingVertical: 0,
        fontFamily: 'segoeuib',
        fontSize: 10,
        borderRadius: 2,
    },
    txtDiaValid: {
        backgroundColor: 'red',
        marginHorizontal: 1,
        paddingHorizontal: 5,
        paddingVertical: 0,
        fontFamily: 'segoeuib',
        fontSize: 10,
        borderRadius: 2
    }

});