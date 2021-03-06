import React, { Component } from 'react';
import { ScrollView, View, Text, ActivityIndicator, Button, ListView } from 'react-native';
import { Icon, List } from 'react-native-elements';
import { listaPromosFetch } from '../actions/AppActions';
import { connect } from 'react-redux';
import MinhaPromo from './MinhaPromo';
import _ from 'lodash';

class MinhasPromocoes extends Component {
    
    loadingPromocoes = true;

    componentWillMount(){
        this.props.listaPromosFetch();
        this.criaFonteDeDados(this.props.promos);
    }

    componentWillReceiveProps(nextProps){
        this.criaFonteDeDados(nextProps.promos);
    }
    
    loading(){
        if(!this.props.loadingMinhasPromocoes){
            return(
                <ScrollView style={{alignSelf: 'stretch'}} contentContainerStyle={{justifyContent: 'space-between'}}>
                    <ListView
                        enableEmptySections
                        dataSource={this.fonteDeDados}
                        renderRow={data => (<MinhaPromo key={data.nomePromo} item={data}/>)}
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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
                {this.loading()}
            </View>
        );
    }
}

const mapStateToProps = state => {

    let index = -1;
    const promos = _.map(state.AppReducer.minhasPromos, (val, uid) => {     
        
        if(index++ % 2){
            return {...val, uid, bgColor:'#fff'}
        }else{
            return {...val, uid, bgColor:'#ededed'}
        }
        
    });

    return ({
        promos: _.without(promos, undefined),
        loadingMinhasPromocoes: state.AppReducer.loadingMinhasPromocoes
    })
} 

export default connect(
    mapStateToProps, 
    {
        listaPromosFetch
    }
)(MinhasPromocoes);