import React, { Component } from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

class Checkout extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.fundo}>
                <Text>Checkout PagSeguro</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fundo:{
        flex:1, backgroundColor:'gray'
    }
})

const mapStateToProps = state => {
    return({});
}

export default connect(mapStateToProps,{})(Checkout);