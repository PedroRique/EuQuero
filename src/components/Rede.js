import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import Alerta from './Alerta';
import { contaRede } from '../actions/AppActions';

class Rede extends Component{

    constructor(props){
        super(props);

        this.state = { visible: false};
    }

    componentDidMount(){
        this.props.contaRede(this.props.chave);
    }

    setAlert(visible){
        this.setState({visible});
    }

    render(){
        const sizeIcon = 30;
        const colorIcon = '#b30404';
        const total = this.props.rede[0] + this.props.rede[1] + this.props.rede[2];
        let credito = this.props.rede[0] * 0.5 + this.props.rede[1] * 0.3 + this.props.rede[2] * 0.1;
        credito = parseFloat(credito).toFixed(2);

        return(
            <View style={{flex: 1}}>
                <View style={styles.linha}>
                    <Text style={styles.txtBasico}>1º Nível:</Text>
                    <View style={styles.iconNumero}>
                        <Icon name='people-outline' size={sizeIcon} color={colorIcon} containerStyle={styles.icon}/>
                        <Text style={styles.txtBasico}>{this.props.rede[0]}</Text>
                    </View>
                </View>
                <View style={styles.linha}>
                    <Text style={styles.txtBasico}>2º Nível:</Text>
                    <View style={styles.iconNumero}>
                        <Icon name='people-outline' size={sizeIcon} color={colorIcon} containerStyle={styles.icon}/>
                        <Text style={styles.txtBasico}>{this.props.rede[1]}</Text>
                    </View>
                </View>
                <View style={styles.linha}>
                    <Text style={styles.txtBasico}>3º Nível:</Text>
                    <View style={styles.iconNumero}>
                        <Icon name='people-outline' size={sizeIcon} color={colorIcon} containerStyle={styles.icon}/>
                        <Text style={styles.txtBasico}>{this.props.rede[2]}</Text>
                    </View>
                </View>
                <View style={styles.linha}>
                    <Text style={styles.txtBasico}>Total Afilhados:</Text>
                    <View style={styles.iconNumero}>
                        <Icon name='people-outline' size={sizeIcon} color={colorIcon} containerStyle={styles.icon}/>
                        <Text style={styles.txtBasico}>{total}</Text>
                    </View>
                </View>
                <View style={styles.linha2}>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontFamily: 'segoeui', fontSize: 18, color: '#b30404'}}>SALDO ATUAL</Text>
                        <Text style={{fontFamily: 'segoeuib', fontSize: 28, color: '#b30404'}}>R$ {credito}</Text>
                    </View>
                    <TouchableOpacity onPress={() => this.setAlert(true)}>
                        <Icon name='info' color='#ff9900'/>
                    </TouchableOpacity>
                </View>

                <Alerta type='info' visible={this.state.visible} message='Minha Rede é a soma dos usuários que você cadastrou somados aos outros usuários cadastrados pelos seus primeiros e-mails os usuários que foram cadastrados pela segunda linha.' setAlert={this.setAlert.bind(this)}/>
            </View>
        );
    } 
}

const mapStateToProps = state => (
    {
        chave: state.AutenticacaoReducer.chave,
        rede: state.AppReducer.rede
    }
)

export default connect(mapStateToProps, {contaRede})(Rede);

const styles = StyleSheet.create({
    icon:{
        marginRight: 10
    },
    linha: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'stretch',
        flex: 1
    },
    linha2: {
        flexDirection: 'row',
        backgroundColor: '#ddd',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        flex: 1
    },
    txtBasico: {
        fontFamily: 'segoeui',
        color: '#b30404',
        fontSize: 22
    },
    iconNumero: {
        flexDirection: 'row'
    }
});