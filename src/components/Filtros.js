import React, { Component } from "react";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { modificaFiltros } from "../actions/AppActions";
import { Icon, Slider } from "react-native-elements";

class Filtros extends Component {

    constructor(props){
        super(props);

        this.state = {
            distancia: 5000,
            categs: this.props.categs,
            dias: this.props.diasValidos
        }
    }

    _modificaFiltros(){
        objFiltros = {};

        objFiltros.diasValidos = this.state.dias;
        objFiltros.distancia = this.state.distancia;
        objFiltros.categs = this.state.categs;

        this.props.modificaFiltros(objFiltros);
    }

    selectCateg(key){
        let categs = this.state.categs;
        categs[key].status = !categs[key].status;

        this.setState({categs});
    }

    selectDia(key){
        let dias = this.state.dias;
        dias[key].isValid = !dias[key].isValid;

        this.setState({dias});
    }

    renderCategs(){
        const categs = [];

        this.props.categs.forEach((categ)=> {
            let estilo = categ.status ? styles.categItemSelected : styles.categItem;
            let estiloTxt = categ.status ? styles.categItemSelectedTxt : styles.categItemTxt;

            categs.push(
                <TouchableOpacity key={categ.id} onPress={() => this.selectCateg(categ.key)}>
                    <View key={categ.id} style={estilo}>
                        <Icon name={categ.icon} color='#881518'/>
                        <Text style={estiloTxt}>{categ.name}</Text>
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
                <TouchableOpacity onPress={() => this.selectDia(dia.key)}>
                    <Text style={estilo}>{dia.dia}</Text>
                </TouchableOpacity>
            );
            
        });

        return dias;
    }

    render(){
        return(
            <ScrollView contentContainerStyle={{padding: 20, backgroundColor: '#ddd'}}>

                <View>
                    <Text style={[styles.titulo,{marginTop:5}]}>Categorias</Text>
                    <View style={{flexDirection:'row',flexWrap:'wrap'}}>{this.renderCategs()}</View>
                </View>

                <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
                    <Text style={styles.titulo}>Distância</Text>
                    <Slider
                        step={100}
                        value={this.state.distancia}
                        onValueChange={(distancia) => this.setState({distancia})}
                        thumbTintColor='#721214'
                        thumbTouchSize={{width: 40, height: 40}}
                        minimumValue={0}
                        maximumValue={10000}
                    />                        
                    <Text style={{backgroundColor: '#333', color: 'white', borderRadius: 5, padding: 5, alignSelf: 'flex-start'}}>{this.state.distancia}m</Text>
                </View>

                <View>
                    <Text style={styles.titulo}>Dias Válidos</Text>
                    <View style={{flexDirection: 'row'}}>{this.renderDias()}</View>
                </View>

                <TouchableOpacity onPress={() => this._modificaFiltros()}>
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
    categItemSelected: {
        backgroundColor: '#333',
        borderRadius: 5,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 5,
        marginLeft: 5,
    },
    categItemTxt: {
        color: '#333',
        fontSize: 15,
        padding:5,
        fontFamily: "segoeui",
    },
    categItemSelectedTxt: {
        color: 'white',
        fontSize: 15,
        padding:5,
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
        diasValidos: state.AppReducer.diasValidosPromo,
    })
} 

export default connect(
    mapStateToProps, 
    { modificaFiltros }
)(Filtros);