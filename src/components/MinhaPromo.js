import React, {Component} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Rating} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

export default class MinhaPromo extends Component{

    constructor(props){
        super(props);
    }

    img = require('../imgs/plate.jpg');

    render(){
        return (
            <View style={[styles.container,{backgroundColor:this.props.item.bgColor}]}>
                <View style={{flex: 2}}>
                    {this.props.item.imageURL ? <Image source={{uri: this.props.item.imageURL}} style={styles.promoImage}/> :
                    <Image source={this.img} style={styles.promoImage}/>}
                </View>
    
                <View style={{flexDirection:'column',justifyContent: 'space-around', alignItems: 'center', alignSelf: 'stretch', flex:3}}>
                    <Text style={styles.titulo}>{this.props.item.nomePromo}</Text>
                </View>
                    
                <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch', flex:2}}>
                    <Text style={styles.desc}>{this.props.item.descontoPromo}%</Text>
                    <TouchableOpacity onPress={() => {Actions.minhaPromocao({item: this.props.item, title: this.props.item.nomePromo})}}>
                        <Text style={styles.btnValidar}>validar agora</Text>
                    </TouchableOpacity>
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
        height: 125,
        alignSelf: 'stretch',
        marginVertical: 5,
        marginHorizontal: 5,
    },

    titulo: {
        fontSize: 20,
        color: '#b30404',
        fontFamily: 'segoeuiz',
        textAlign: 'left'
    },
    estab:{
        color: '#666',
        fontSize:14
    },
    desc:{
        fontSize:30,
        color: '#b30404',
        fontFamily: 'segoeuib'
    },
    container: {
        justifyContent:'flex-start', 
        alignItems: 'center', 
        alignSelf: 'stretch',
        flexDirection: 'row',
    },
    btnValidar: {
        alignSelf: 'stretch',
        color: '#666',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'segoeuii'
    }

});