import React, { Component } from "react";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { connect } from "react-redux";
import { modificaFiltros } from "../actions/AppActions";
import { Icon, Slider } from "react-native-elements";

class Filtros extends Component {

    constructor(props){
        super(props);

        this.state = {
            distancia: 10000,
            categs: this.props.categs,
            dias: this.props.diasValidos
        }
    }

    _modificaFiltros(){
        objFiltros = {};

        objFiltros.diasValidos = this.state.dias;
        objFiltros.distancia = this.state.distancia == 10000 ? 0 : this.state.distancia;
        objFiltros.categs = this.state.categs;
        let str = '';
        let cont = 0;

        this.state.categs.forEach((categ) => {
            str += categ.status ? categ.id + ',' : '';
        });
        
        this.state.dias.forEach((dia) => {
            if(dia.isValid){
                cont++;
            }
        })

        objFiltros.diasValidosContador = cont;

        objFiltros.stringCateg = str.substr(0,str.length-1);

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
            let color = categ.status ? 'white' : '#b30404';

            categs.push(
                <TouchableOpacity key={categ.id} onPress={() => this.selectCateg(categ.key)}>
                    <View key={categ.id} style={estilo}>
                        <Icon name={categ.icon} color={color}/>
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
                <TouchableOpacity key={dia.key} onPress={() => this.selectDia(dia.key)}>
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
                        value={this.state.distancia}
                        onValueChange={(distancia) => this.setState({distancia})}
                        thumbTintColor='#721214'
                        thumbTouchSize={{width: 40, height: 40}}
                        minimumValue={100}
                        maximumValue={10000}
                    />                        
                    <Text style={{backgroundColor: '#333', color: 'white', borderRadius: 5, padding: 5, alignSelf: 'flex-start'}}>{this.state.distancia == 10000? 'Mostre-me tudo' : this.state.distancia+'m'}</Text>
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

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    titulo: {
        fontFamily: "segoeui",
        fontSize: 21,
        color: '#333',
        marginBottom: 10,
        marginTop: 30
    },
    categItem: {
        width: width / 5,
        height: width / 5,
        borderWidth: 1,
        borderColor: '#b30404',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2
    },
    categItemSelected: {
        backgroundColor: '#b30404',
        width: width / 5,
        height: width / 5,
        borderWidth: 1,
        borderColor: '#b30404',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2
    },
    categItemTxt: {
        color: '#700000',
        fontSize: 10,
        padding:5,
        fontFamily: "segoeui",
        textAlign: 'center',
    },
    categItemSelectedTxt: {
        color: 'white',
        fontSize: 10,
        padding:5,
        fontFamily: "segoeui",
        textAlign: 'center',
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