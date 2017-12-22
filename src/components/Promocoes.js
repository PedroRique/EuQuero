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
                        renderRow={data => (
                                <Promo key={data.nomePromo} item={data} />
                            )
                        }
                    />
                </ScrollView>
            )
        }
        return (
            <View style={{ alignItems: 'center'}}>
                <Text style={{fontSize: 18, color: '#666'}}>Nenhuma promoção perto de você.</Text>
                <View style={{justifyContent: 'center', marginTop: 20}}>
                    <Icon color="#888" name="autorenew" size={50} type="material" underlayColor="#ccc"
                        onPress={ () => {
                            setTimeout(() =>{
                                this.props.listaPromocoes(false);
                            }, 1500);

                            this.props.listaPromocoes(true);
                        }}
                    />   
                </View>
            </View> 
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
        return {...val, uid}
    });

    return ({
        loadingPromocoes: state.AppReducer.loadingPromocoes,
        promos
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