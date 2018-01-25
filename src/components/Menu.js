import React, {Component} from 'react';
import { View, Text, Button, TouchableNativeFeedback, TouchableHighlight } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { logoutUsuario } from '../actions/AutenticacaoActions';

class Menu extends Component {

    constructor(props){
        super(props);
    }

    isEstab (){
        if(this.props.loginAs){
            return(
                <View>
                    <TouchableNativeFeedback onPress={() => Actions.formPromo()}>
                        <ListItem
                            title='Nova Promoção'
                            leftIcon={{name: 'add', color: '#333'}}
                        />
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback onPress={() => Actions.minhasPromos()}>
                        <ListItem
                            title='Minhas Promoções'
                            leftIcon={{name: 'description', color: '#333'}}
                        />
                    </TouchableNativeFeedback>
                </View>
            );
        }
    }

    isClient(){
        if(!this.props.loginAs){
            return(
                <View>
                    <TouchableNativeFeedback onPress={() => Actions.cupons()}>
                        <ListItem
                            title='Meus Cupons'
                            leftIcon={{name: 'receipt', color: '#333'}}
                        />
                    </TouchableNativeFeedback>
                </View>
            )
        }
    }

    render (){
        return (
            <View style={{justifyContent:'flex-start', flex:1}}>

            <Text>Olá, {this.props.nome}</Text>
            <Text>{this.props.email}</Text>

            <List containerStyle={{marginBottom: 20}}>
                
                <TouchableNativeFeedback onPress={() => Actions.perfil()}>
                    <ListItem
                        title='Perfil'
                        leftIcon={{name: 'account-circle', color: '#333'}}
                    />
                </TouchableNativeFeedback>

                {this.isEstab()}

                {this.isClient()}

            </List>
        
            <TouchableHighlight onPress={() => {this.props.logoutUsuario()}} underlayColor="#999">
                <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Icon color="#333" name="power-settings-new" size={24}  />
                    <Text>Sair</Text>
                </View>
            </TouchableHighlight>

        </View>
        );
    }

}

const mapStateToProps = state => (
    {
        nome: state.AutenticacaoReducer.nome,
        email: state.AutenticacaoReducer.email,
        loginAs: state.AutenticacaoReducer.loginAs
    }
)

export default connect( mapStateToProps, { logoutUsuario } )(Menu);