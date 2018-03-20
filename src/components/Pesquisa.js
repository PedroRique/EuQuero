import React, { Component } from 'react';
import { View , TextInput, StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

class Pesquisa extends Component {

    constructor(props){
        super(props);
    }

    showPromo(texto){
        console.log(texto);
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.inputBox}>
                    <TextInput
                        placeholder='Encontre sua promoção'
                        placeholderTextColor='#888'
                        style={styles.input}
                        clearButtonMode='while-editing'
                        underlineColorAndroid='transparent'
                        autoCorrect={true}
                        onChangeText={texto => this.showPromo(texto)}
                    />
                    <Icon name='search' color='#333' size={20}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input:{
        fontFamily:'segoeuii',
        alignSelf: 'stretch',
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: '#ededed',
        padding: 10,
    },
    inputBox: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 5
    }
});

const mapStateToProps = state => {

    const promos = _.map(state.AppReducer.promos, (val, uid) => {
        if(val.nomePromo.toLowerCase().indexOf(state.AppReducer.filtrosTexto.texto.toLowerCase()) > -1){

            let categs = val.stringCateg.split(',');

            let hasCateg = categs.some(categ => state.AppReducer.filtros.stringCateg.includes(categ));

            console.log(hasCateg);
            
            if(hasCateg || state.AppReducer.filtros.stringCateg.length == 0){
                return {...val, uid}
            } 
        }

    });

    return ({
        loadingPromocoes: state.AppReducer.loadingPromocoes,
        promos: _.without(promos, undefined),
        filtrosTexto: state.AppReducer.filtrosTexto,
        userLocation: state.AppReducer.userLocation,
        filtros: state.AppReducer.filtros
    })
} 

export default connect(
    mapStateToProps, 
    {}
)(Promocoes);