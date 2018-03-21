import React, {Component} from 'react';
import { View, Text, Button, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView} from 'react-native';
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
            <View style={[styles.btnBox, {shadowOffset:{width: 10, height: 10}, shadowColor: 'black', shadowOpacity:1}]}>
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
                    <TouchableOpacity onPress={() => Actions.formPromo()} activeOpacity={0.5}>
                        <MenuBtn
                            title='Nova Promoção'
                            icon={{name: 'add', color: '#b30404'}}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => Actions.minhasPromos()} activeOpacity={0.5}>
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
                    <TouchableOpacity onPress={() => Actions.cupons()} activeOpacity={0.5}>
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
        const img = require('../imgs/user.png');
        return (
            <View style={{justifyContent:'flex-start', flex:1}}>

            <View style={{alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', marginVertical: 20}}>
                <View style={{flex:1, padding: 5}}>    
                    <View style={{backgroundColor: '#b30404', borderRadius: (avatarWidth/2) + 16, width:avatarWidth + 16, height:avatarWidth + 16, alignItems: 'center', justifyContent: 'center'}}>
                        {this.props.avatarURL ? <Image source={{uri: this.props.avatarURL}} style={{width: avatarWidth,height:avatarWidth, borderRadius: avatarWidth/2}}/> :
                        <Image source={img} style={{width: avatarWidth,height:avatarWidth, borderRadius: avatarWidth/2}}/>}
                    </View>
                </View>
                <View style={{flex:2, padding: 5}}>
                    <Text style={{fontSize:18, color: '#b30404', fontFamily: 'segoeuiz'}}>Olá, {this.props.nome}</Text>
                    <Text style={{fontSize:16, color: '#b30404', fontFamily: 'segoeuii'}}>{this.props.email}</Text>
                    {this.props.chave ?<Text style={{fontSize:16, color: '#b30404', fontFamily: 'segoeui'}}>ID: {this.props.chave}</Text> : <Text></Text>}
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.btnsBox}>
                
                <TouchableOpacity onPress={() => Actions.perfil()} activeOpacity={0.5}>
                    <MenuBtn
                        title='Perfil'
                        icon={{name: 'account-circle', color: '#b30404'}}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Actions.economia()} activeOpacity={0.5}>
                    <MenuBtn
                        title='Economia'
                        icon={{name: 'attach-money', color: '#b30404'}}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Actions.rede()} activeOpacity={0.5}>
                    <MenuBtn
                        title='Rede'
                        icon={{name: 'people', color: '#b30404'}}
                    />
                </TouchableOpacity>

                {this.isEstab()}

                {this.isClient()}

                <TouchableOpacity onPress={() => false} activeOpacity={0.5}>
                    <MenuBtn
                        title='Termos de Uso'
                        icon={{name: 'description', color: '#b30404'}}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => false} activeOpacity={0.5}>
                    <MenuBtn
                        title='Fale Conosco'
                        icon={{name: 'phone-in-talk', color: '#b30404'}}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {this.props.logoutUsuario()}} activeOpacity={0.5}>
                    <MenuBtn
                        title='Sair'
                        icon={{name: 'power-settings-new', color: '#b30404'}}
                    />
                </TouchableOpacity>

            </ScrollView>

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
        width: btnBoxWidth,
        height: btnBoxWidth,
        margin: 10,
        elevation: 1       
    },
    txtBtn: {
        color: '#b30404',
        textAlign: 'center',
        fontSize: 9,
        alignSelf: 'stretch',
        flexWrap: 'nowrap',
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