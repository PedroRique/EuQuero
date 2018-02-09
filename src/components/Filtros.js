import React, { Component } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";

export default class Filtros extends Component {

    constructor(props){
        super(props);

        this.state = {

        }
    }

    _modificaFiltros(){

    }

    render(){
        return(
            <ScrollView>
                <View>
                    <Text style={styles.titulo}>Filtros</Text>
                </View>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    titulo: {
        fontFamily: "segoeui"
    }
});

const mapStateToProps = state => {
    return ({
    })
} 

export default connect(
    mapStateToProps, 
    {}
)(Filtros);