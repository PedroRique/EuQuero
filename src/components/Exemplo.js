import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Exemplo extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={{flex: 1, alignItens: 'center', justifyContent: 'center', backgroundColor: 'blue'}}>
                <Text style={styles.texto}>Olá.</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    texto:{
        fontSize: 20,
        color: '#666',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 5
    }
})