import React, { Component } from "react";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { modificaFiltros } from "../actions/AppActions";
import { Icon, Slider } from "react-native-elements";

class Filtros extends Component {

    constructor(props){
        super(props);

        this.state = {
            value: 5000
        }
    }

    _modificaFiltros(){

    }

    renderCategs(){
        const categs = [];

        this.props.categs.forEach((categ)=> {
            categs.push(
                <TouchableOpacity onPress={() => false}>
                    <View key={categ.id} style={styles.categItem}>
                        <Icon name={categ.icon} color='#881518'/>
                        <Text style={styles.categItemTxt}>{categ.name}</Text>
                    </View>
                </TouchableOpacity>
            );
        });

        return categs;
    }

    renderDias(){
        const dias = [];

        this.props.diasValidos.forEach((dia)=>{

            let estilo = dia.isValid ? styles.txtDiaValid : styles.txtDia;

            dias.push(
                <TouchableOpacity onPress={() => false}>
                    <Text style={estilo}>{dia.dia}</Text>
                </TouchableOpacity>
            );
            
        });

        return dias;
    }

    render(){
        return(
            <ScrollView contentContainerStyle={{padding: 20}}>

                <View>
                    <Text style={[styles.titulo,{marginTop:5}]}>Categorias</Text>
                    <View style={{flexDirection:'row',flexWrap:'wrap'}}>{this.renderCategs()}</View>
                </View>

                <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
                    <Text style={styles.titulo}>Distância</Text>
                    <Slider
                        step={100}
                        value={this.state.value}
                        onValueChange={(value) => this.setState({value})}
                        thumbTintColor='#721214'
                        thumbTouchSize={{width: 40, height: 40}}
                        minimumValue={0}
                        maximumValue={10000}
                    />                        
                    <Text style={{backgroundColor: '#333', color: 'white', borderRadius: 5, padding: 5, alignSelf: 'flex-start'}}>{this.state.value}m</Text>
                </View>

                <View>
                    <Text style={styles.titulo}>Dias Válidos</Text>
                    <View style={{flexDirection: 'row'}}>{this.renderDias()}</View>
                </View>

                <TouchableOpacity onPress={() => false}>
                    <Text style={styles.btnAplicar}>Aplicar Filtros</Text>
                </TouchableOpacity>

            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    titulo: {
        fontFamily: "segoeui",
        fontSize: 21,
        color: '#333',
        marginBottom: 10,
        marginTop: 30
    },
    categItem: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 5,
        marginLeft: 5
    },
    categItemTxt: {
        color: '#333',
        fontSize: 15,
        padding:5,
        // flex: 1,
        // flexWrap: 'wrap',
        fontFamily: "segoeui",
    },
    txtDia: {
        padding: 5,
        backgroundColor: '#333',
        color: 'white',
        borderRadius: 15,
        width: 30,
        height: 30,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        fontWeight: 'bold',
        marginHorizontal: 2
    },
    txtDiaValid: {
        padding: 5,
        backgroundColor: '#e56c25',
        color: 'white',
        borderRadius: 15,
        width: 30,
        height: 30,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        fontWeight: 'bold',
        marginHorizontal: 2
    },
    btnAplicar: {
        paddingVertical: 10,
        paddingHorizontal: 100,
        backgroundColor: '#881518',
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        borderRadius: 5,
        elevation: 2,
        marginTop: 30,
        fontFamily: 'segoeui'
    },
});

const mapStateToProps = state => {
    return ({
        categs: state.AppReducer.categs,
        diasValidos: state.AppReducer.diasValidosPromo
    })
} 

export default connect(
    mapStateToProps, 
    { modificaFiltros }
)(Filtros);