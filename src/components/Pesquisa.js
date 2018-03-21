import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, ListView, ScrollView, ActivityIndicator, Keyboard} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import { modificaPesquisa, listaRecentesFetch, removeRecente } from '../actions/AppActions';
import Promo from './Promo';
import PromoTiny from './PromoTiny';

class Pesquisa extends Component {

    constructor(props){
        super(props);

        this.state = {
            icon: 'search',
            txtBuscaRecente: 'Nenhuma Busca Recente'
        }
    }

    componentWillMount(){
        this.props.listaRecentesFetch();
        this.criaFonteDeDados(this.props.promos);
    }

    componentWillReceiveProps(nextProps){
        this.criaFonteDeDados(nextProps.promos);

        nextProps.pesquisa.length > 0 ? this.setState({icon:'close'}) : this.setState({icon:'search'});

        nextProps.recentes.length > 0 ? this.setState({txtBuscaRecente: 'Buscas Recentes'}) : this.setState({txtBuscaRecente: 'Nenhuma Busca Recente'});
    }

    criaFonteDeDados( promos ){
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        
        this.fonteDeDados = ds.cloneWithRows(promos);
    }

    _modificaPesquisa(texto){
        texto.length > 0 ? this.setState({icon:'close',recentVisible:false}) : this.setState({icon:'search',recentVisible:true});

        this.props.modificaPesquisa(texto);
    }

    limpaPesquisa(){
        this.state.icon == 'close' ? this.props.modificaPesquisa('') : false;
    }

    renderPromos(){
        if(this.props.promos[0] && this.props.promos[0].initial){
            return(
                <ActivityIndicator size='large' color='#b30404'/>
            )
        }
        return(
            <ScrollView style={{alignSelf: 'stretch'}} contentContainerStyle={{justifyContent: 'space-between'}}>
                <ListView
                    enableEmptySections
                    dataSource={this.fonteDeDados}
                    renderRow={data => (<PromoTiny key={data.nomePromo} item={data} />)}
                />
            </ScrollView>
        )
    }

    renderRecentes(){
        const recentes = this.props.recentes;
        let arr = [];

        if(recentes.length){
            recentes.forEach((promo,i) => {
                arr.push(
                    <View style={{flexDirection: 'row', alignSelf:'stretch', padding: 10, alignItems:'center',justifyContent:'space-between'}}>
                        <Text style={{fontFamily:'segoeui'}}>{promo.nomePromo}</Text>
                        <Icon name='close' size={20} color='#333' onPress={() => this.props.removeRecente(promo.uid)}/>
                    </View>
                )
            });
        }

        return arr;
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
                        value={this.props.pesquisa}
                        onChangeText={texto => this._modificaPesquisa(texto)}
                    />
                    <Icon name={this.state.icon} color='#333' size={20} onPress={() => this.limpaPesquisa()} containerStyle={{alignSelf: 'stretch', width:50}}/>
                </View>
                
                {!this.props.promos.length ? <View style={{padding:10}}>
                    <Text style={{fontFamily:'segoeuiz', fontSize:18, marginBottom: 10}}>{this.state.txtBuscaRecente}</Text>
                    {this.renderRecentes()}
                </View> : <View></View>}
                
                {this.renderPromos()}
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
    },
    inputBox: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 10,
        elevation: 2
    }
});

const mapStateToProps = state => {

    const promos = _.map(state.AppReducer.promos, (val, uid) => {

        if(val.nomePromo.toLowerCase().indexOf(state.AppReducer.pesquisa.toLowerCase()) > -1 && state.AppReducer.pesquisa !== ''){
            return {...val, uid}
        }
        
    });

    const recentes = _.map(state.AppReducer.recentes, (val,uid) => {
        return {...val,uid};
    });

    return ({
        promos: _.without(promos, undefined),
        pesquisa: state.AppReducer.pesquisa,
        recentes: _.without(recentes, undefined)
    })
} 

export default connect(
    mapStateToProps, 
    {
        modificaPesquisa,
        listaRecentesFetch,
        removeRecente
    }
)(Pesquisa);