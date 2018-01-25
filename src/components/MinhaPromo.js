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
            <View style={styles.container}>
                <View style={{flex: 2}}>
                    {this.props.item.imageURL ? <Image source={{uri: this.props.item.imageURL}} style={styles.promoImage}/> :
                    <Image source={this.img} style={styles.promoImage}/>}
                </View>
    
                <View style={{alignSelf:'stretch', alignItems: 'center', justifyContent: 'center', flex: 3}}>
                    <View style={{flexDirection:'column',justifyContent: 'space-around', alignItems: 'center', alignSelf: 'stretch'}}>
                        <Text style={styles.titulo}>{this.props.item.nomePromo}</Text>
                        <Text style={styles.desc}>{this.props.item.descontoPromo}% OFF</Text>
                    </View>
                    
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch'}}>
                        <TouchableOpacity style={{ flex: 1}} onPress={() => {Actions.minhaPromocao({item: this.props.item, title: this.props.item.nomePromo})}}>
                            <Text style={styles.btnEntrar}>Detalhes</Text>
                        </TouchableOpacity>
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
        height: 125,
        alignSelf: 'stretch',
        marginVertical: 5,
        marginHorizontal: 5,
        borderRadius: 10
    },

    titulo: {
        fontSize: 20,
        color: '#333',
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
    }

});