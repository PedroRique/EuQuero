import React, { Component } from 'react';
import { View } from 'react-native';

export default class Blank extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={{flex: 1, backgroundColor: '#ededed'}}>
            </View>
        );
    }
}