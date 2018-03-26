import React, {Component} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Rating} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

export default class Cupom extends Component{

    constructor(props){
        super(props);
    }

    renderCateg(){
        let categs = this.props.item.promo.stringCateg.split(',');
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
                <Text key={i} style={styles.categ}>{str}</Text>
            )
        });

        return categArray;
    }

    setModalVisible(){
        this.props.setModalVisible(true,this.props.item);
    }

    img = require('../imgs/plate.jpg');

    render(){
        let resgatado = new Date(this.props.item.dataResgate);
        resgatado = resgatado.toLocaleString().slice(0,-3);

        return (
            <View style={[styles.container,{backgroundColor:this.props.item.bgColor}]}>
                <View style={{flex: 1.25}}>
                    {this.props.item.promo.imageURL ? <Image source={{uri: this.props.item.promo.imageURL}} style={styles.promoImage}/> :
                    <Image source={this.img} style={styles.promoImage}/>}
                </View>

                <View style={{alignSelf:'stretch', alignItems: 'center', justifyContent: 'center', flex: 1.75, paddingVertical: 10}}>
                    <View style={{flexDirection:'column',justifyContent: 'space-around', alignItems: 'center', alignSelf: 'stretch'}}>
                        <Text style={styles.nomeEstab}>{this.props.item.promo.nomeEstab}</Text>
                        <View style={{alignSelf:'stretch', alignItems:'flex-start', justifyContent:'flex-start',marginBottom:8}}>
                            {this.renderCateg()}
                        </View>
                    </View>
                </View>
    
                <TouchableOpacity style={{alignSelf:'stretch', alignItems: 'center', justifyContent: 'center', flex: 2}}
                    onPress={() => this.setModalVisible()}>
                    <View style={{flexDirection:'column',justifyContent: 'space-around', alignItems: 'center', alignSelf: 'stretch'}}>
                        <Text style={styles.titulo}>{this.props.item.codigo}</Text>
                        <Text style={styles.txtBasico}>usar agora</Text>
                    </View>

                    {/* <Text>Resgatado: {resgatado}</Text> */}
                </TouchableOpacity>
    
            </View>
        );
    }

}

const styles = StyleSheet.create({
    nomeEstab:{
        fontSize: 15,
        color: '#b30404',
        fontWeight: 'bold',
        textAlign: 'left',
        alignSelf:'stretch'
    },
    categ:{
        fontSize: 12,
        fontFamily: 'segoeuii',
    },
    promoImage: {
        width: null,
        flex:1,
        alignSelf: 'stretch',
        marginVertical: 5,
        marginHorizontal: 10,
    },

    titulo: {
        fontSize: 20,
        color: '#b30404',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    estab:{
        color: '#666',
        fontSize:14
    },
    desc:{
        fontSize:30,
        color: '#e56c25',
        fontWeight: 'bold'
    },
    container: {
        justifyContent:'flex-start', 
        alignItems: 'center', 
        alignSelf: 'stretch',
        flexDirection: 'row',
        paddingVertical: 5,
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
    txtBasico:{
        fontFamily: 'segoeuii',
        fontSize: 16
    }

});