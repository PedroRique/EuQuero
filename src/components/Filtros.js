import React, { Component } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
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
                <View key={categ.id} style={styles.categItem}>
                    <Icon name={categ.icon} color='#881518'/>
                    <Text style={styles.categItemTxt}>{categ.name}</Text>                    
                </View>
            );
        });

        return categs;
    }

    renderDias(){
        const dias = [];

        this.props.diasValidos.forEach((dia)=>{

            let estilo = dia.isValid ? styles.txtDiaValid : styles.txtDia;

            dias.push(
                <Text style={estilo}>{dia.dia}</Text>
            );
            
        });

        return dias;
    }

    render(){
        return(
            <ScrollView contentContainerStyle={{padding: 10}}>

                <View>
                    <Text style={styles.titulo}>Categorias</Text>

                    {this.renderCategs()}
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
                    <Text>Metros: {this.state.value}m</Text>
                </View>

                <View>
                    <Text style={styles.titulo}>Dias Válidos</Text>
                    <View style={{flexDirection: 'row'}}>{this.renderDias()}</View>
                </View>

            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    titulo: {
        fontFamily: "segoeui",
        fontSize: 24,
        color: '#333',
    },
    categItem: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 5
    },
    categItemTxt: {
        color: '#333',
        fontSize: 16,
        padding:5,
        flex: 1,
        flexWrap: 'wrap',
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