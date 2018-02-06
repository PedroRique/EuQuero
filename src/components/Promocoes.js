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
        if(val.nomePromo.toLowerCase().indexOf(state.AppReducer.filtros.texto.toLowerCase()) > -1){

            let categs = val.stringCateg.split(',');

            let hasCateg = categs.some(categ => state.AppReducer.filtros.categs.includes(categ));

            if(hasCateg || state.AppReducer.filtros.categs.length == 0){
                return {...val, uid}
            }
            
        }
    });

    return ({
        loadingPromocoes: state.AppReducer.loadingPromocoes,
        promos: _.without(promos, undefined),
        filtros: state.AppReducer.filtros,
        filtroTexto: state.AppReducer.filtroTexto,
        userLocation: state.AppReducer.userLocation
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