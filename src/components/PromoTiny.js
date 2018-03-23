import React, {Component} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Rating, Icon} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { saveRecent,modificaPromoAtual } from '../actions/AppActions';

class PromoTiny extends Component{

    constructor(props){
        super(props);
    }

    img = require('../imgs/plate.jpg');

    _saveRecent(){ //salva a busca no banco do usuário para ser exibido em buscas recentes
        this.props.saveRecent(this.props.item);

        this.props.modificaPromoAtual(this.props.item);
        Actions.promocao();
    }

    render(){
        const sizeStar = 14;
        return (
            <TouchableOpacity onPress={() => {this._saveRecent()}} activeOpacity={0.5}>
                <View style={styles.container}>
                    <View style={{flex: 0.75,  alignItems:'center', alignSelf:'stretch', justifyContent: 'center'}}>
                        <Image source={{uri: this.props.item.imageURL}} style={styles.promoImage} resizeMethod='scale' resizeMode='cover'/>
                    </View>
        
                    <View style={{alignSelf:'stretch', alignItems: 'center', justifyContent: 'space-between', flex: 2, padding: 10}}>
                        <Text style={styles.titulo}>{this.props.item.nomePromo}</Text>
                    </View>

                    <View style={styles.descBox}>
                        <Text style={styles.desc}>{this.props.item.descontoPromo}%</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({

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
    desc:{
        fontSize:20,
        color: 'white',
        fontFamily: 'segoeuib',
        
    },
    descBox:{
        backgroundColor: '#AE0505',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:'stretch',
        flex: 0.5
    },
    container: {
        justifyContent:'flex-start', 
        alignItems: 'center', 
        alignSelf: 'stretch',
        flexDirection: 'row',
        borderBottomColor: '#ededed', 
        borderBottomWidth: 1,
    }

});

const mapStateToProps = state => {
    return({
        recentes: state.AppReducer.recentes,
        promo: state.AppReducer.promo
    })
}

export default connect(mapStateToProps, { saveRecent,modificaPromoAtual })(PromoTiny);