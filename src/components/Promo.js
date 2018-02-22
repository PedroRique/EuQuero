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
            categArray.push(
                <Text>{element}</Text>
            )
        });

        return categArray;
    }

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
                        {/* <Text style={styles.desc}>{this.props.item.descontoPromo}% OFF</Text> */}
                    </View>
                   
                    {/* <View style={{flexDirection:'row',justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch'}}>
                        <Rating
                            showRating={false}
                            imageSize={20}
                            type="star"
                            readonly
                            onFinishRating={this.ratingCompleted}
                            style={{ paddingVertical: 10 , marginLeft: 7}}
                        />
                    </View> */}
                    
                    {/* <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch'}}>
                        <TouchableOpacity style={{ flex: 1}} onPress={() => {Actions.promocao({item: this.props.item, title: this.props.item.nomePromo})}}>
                            <Text style={styles.btnEntrar}>Eu Quero!</Text>
                        </TouchableOpacity>
                    </View> */}

                    {/* <Text>{this.props.item.stringCateg}</Text> */}

                    {this.renderCateg()}
                </View>

                <View>
                    <View style={styles.descBox}>
                        <Text style={styles.desc}>{this.props.item.descontoPromo}%</Text>
                        <Text style={{fontFamily: 'segoeuii', fontSize: 12, color: '#FF9900'}}>de desconto</Text>
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <Icon name='star' color='#AE0505' />
                        <Icon name='star' color='#AE0505' />
                        <Icon name='star' color='#AE0505' />
                        <Icon name='star' color='#AE0505' />
                        <Icon name='star' color='#ededed' />
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
        height: 130,
        alignSelf: 'stretch',
        marginVertical: 5,
        marginHorizontal: 5,
    },

    titulo: {
        fontSize: 20,
        color: '#980000',
        fontFamily: 'segoeuib',
        textAlign: 'left'
    },
    estab:{
        color: '#666',
        fontSize:14
    },
    desc:{
        fontSize:40,
        color: 'white',
        fontFamily: 'segoeuib',
        marginBottom: 0
    },
    descBox:{
        backgroundColor: '#AE0505',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
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