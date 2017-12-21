import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { listaPromocoes } from '../actions/AppActions';
import { connect } from 'react-redux';

class Promocoes extends Component {
    
    loadingPromocoes = true;

    loading(){
        if(this.props.loadingPromocoes){

            return(
                <ActivityIndicator size="large"/>
            );
        }
        return (
            <View style={{ alignItems: 'center'}}>
                <Text style={{fontSize: 18, color: '#666'}}>Nenhum restaurante perto de você.</Text>
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
    
    render(){
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',  backgroundColor: '#fff'}}>
                {this.loading()}
            </View>
        );
    }
}

const mapStateToProps = state => (
    {
        loadingPromocoes: state.AppReducer.loadingPromocoes,
    }
)

export default connect(
    mapStateToProps, 
    {
        listaPromocoes
    }
)(Promocoes);