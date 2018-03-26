import React, { Component } from 'react';
import { ScrollView, View, Text, ActivityIndicator, Button, ListView } from 'react-native';
import { Icon, List } from 'react-native-elements';
import { listaPromocoes, listaPromoFetch, getUserLocation } from '../actions/AppActions';
import { connect } from 'react-redux';
import Promo from './Promo';
import _ from 'lodash';

class Promocoes extends Component {
    
    loadingPromocoes = true;

    componentWillMount(){
        this.props.listaPromoFetch();
        this.criaFonteDeDados(this.props.promos);
    }

    componentWillReceiveProps(nextProps){
        this.criaFonteDeDados(nextProps.promos);   
    }

    componentDidMount(){
        this.props.getUserLocation();
    }
    
    loading(){
        if(!this.props.loadingPromocoes){

            return(
                <ScrollView style={{alignSelf: 'stretch'}} contentContainerStyle={{justifyContent: 'space-between'}}>
                    <ListView
                        enableEmptySections
                        dataSource={this.fonteDeDados}
                        renderRow={data => (<Promo key={data.nomePromo} item={data} />)}
                    />
                </ScrollView>
            )
        }
        return (
            <ActivityIndicator size="large" color='#881518'/>
        );
    }

    criaFonteDeDados( promos ){
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        
        this.fonteDeDados = ds.cloneWithRows(promos);
    }
    
    render(){
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
                {this.loading()}
            </View>
        );
    }
}

const mapStateToProps = state => {

    const promos = _.map(state.AppReducer.promos, (val, uid) => {
        if(val.nomePromo.toLowerCase().indexOf(state.AppReducer.filtrosTexto.texto.toLowerCase()) > -1){

            const filtros = state.AppReducer.filtros;
            let hasCateg = true;
            let hasDia = true;

            if(filtros.stringCateg.length != 0){
                let categs = val.stringCateg.split(',');
                hasCateg = categs.some(categ => filtros.stringCateg.includes(categ));
            }

            if(filtros.diasValidosContador != 0){
                let dias = val.diasValidosPromo;
                hasDia = filtros.diasValidos.some(function(dia,i){
                    if(dias[i].isValid && dia.isValid){
                        return true;
                    }else{
                        return false;
                    }
                });
            }
            
            if(hasCateg && hasDia){
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
    {
        listaPromocoes,
        listaPromoFetch,
        getUserLocation
    }
)(Promocoes);