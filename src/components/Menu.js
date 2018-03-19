import React, {Component} from 'react';
import { View, Text, Button, TouchableOpacity, Image, StyleSheet, Dimensions} from 'react-native';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { logoutUsuario } from '../actions/AutenticacaoActions';

class MenuBtn extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.btnBox}>
                <Icon name={this.props.icon.name} color={this.props.icon.color} size={36} containerStyle={{marginBottom:5}}/>
                <Text style={styles.txtBtn}>{this.props.title.toUpperCase()}</Text>
            </View>
        )
    }
}

class Menu extends Component {

    constructor(props){
        super(props);
    }

    isEstab (){
        if(this.props.loginAs){
            return(
                <View>
                    <TouchableOpacity onPress={() => Actions.formPromo()}>
                        <MenuBtn
                            title='Nova Promoção'
                            icon={{name: 'add', color: '#b30404'}}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => Actions.minhasPromos()}>
                        <MenuBtn
                            title='Minhas Promoções'
                            icon={{name: 'description', color: '#b30404'}}
                        />
                    </TouchableOpacity>
                </View>
            );
        }
    }

    isClient(){
        if(!this.props.loginAs){
            return(
                <View>
                    <TouchableOpacity onPress={() => Actions.cupons()}>
                        <MenuBtn
                            title='Meus Cupons'
                            icon={{name: 'receipt', color: '#b30404'}}
                        />
                    </TouchableOpacity>
                </View>
            )
        }
    }

    render (){
        // alert(this.props.avatarURL);
        return (
            <View style={{justifyContent:'flex-start', flex:1}}>

            <View style={{alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', marginVertical: 20}}>
                <View style={{backgroundColor: '#b30404', borderRadius: (avatarWidth/2) + 16}}>
                    <Image source={{uri: this.props.avatarURL}} style={{width: avatarWidth,height:avatarWidth, borderRadius: avatarWidth/2, margin: 8}}/>
                </View>
                <View>
                    <Text style={{fontSize:18, color: '#b30404', fontFamily: 'segoeuiz'}}>Olá, {this.props.nome}</Text>
                    <Text style={{fontSize:16, color: '#b30404', fontFamily: 'segoeuii'}}>{this.props.email}</Text>
                    <Text style={{fontSize:16, color: '#b30404', fontFamily: 'segoeui'}}>ID: {this.props.chave}</Text>
                </View>
            </View>

            <View style={styles.btnsBox}>
                
                <TouchableOpacity onPress={() => Actions.perfil()}>
                    <MenuBtn
                        title='Perfil'
                        icon={{name: 'account-circle', color: '#b30404'}}
                    />
                </TouchableOpacity>


                <TouchableOpacity onPress={() => Actions.rede()}>
                    <MenuBtn
                        title='Rede'
                        icon={{name: 'people', color: '#b30404'}}
                    />
                </TouchableOpacity>

                {this.isEstab()}

                {this.isClient()}

            </View>
        
            <TouchableOpacity onPress={() => {this.props.logoutUsuario()}} underlayColor="#999">
                <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Icon color="#b30404" name="power-settings-new" size={24}  />
                    <Text>Sair</Text>
                </View>
            </TouchableOpacity>

        </View>
        );
    }

}

const { width } = Dimensions.get('window');
const menuWidth = (width * 2)/3; //Menu deve sempre ser 2/3 da tela;
const btnBoxWidth = (menuWidth / 2) - 30;
const avatarWidth = (menuWidth / 4);

const styles = StyleSheet.create({
    btnsBox:{
        alignItems: 'stretch',
        alignSelf: 'stretch',
        flexWrap: 'wrap',
        flexDirection: 'row',
        padding: 10
    },
    btnBox:{
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#b30404',
        padding: 10,
        width: btnBoxWidth,
        height: btnBoxWidth,
        margin: 10
    },
    txtBtn: {
        color: '#b30404',
        textAlign: 'center',
        fontSize: 12
    }
});

const mapStateToProps = state => (
    {
        nome: state.AutenticacaoReducer.nome,
        email: state.AutenticacaoReducer.email,
        loginAs: state.AutenticacaoReducer.loginAs,
        avatarURL: state.AutenticacaoReducer.avatarURL,
        chave: state.AutenticacaoReducer.chave
    }
)

export default connect( mapStateToProps, { logoutUsuario } )(Menu);