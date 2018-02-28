import React, {Component} from 'react';
import { Text, View, Image, TouchableHighlight, StatusBar} from 'react-native';
import { Router, Scene, Stack, Tabs, Drawer, Actions} from 'react-native-router-flux';
import { Icon } from 'react-native-elements';

import FormLogin from './components/FormLogin';
import FormCadastro from './components/FormCadastro';
import Principal from './components/Principal';
import Promocao from './components/Promocao';
import Promocoes from './components/Promocoes';
import Perfil from './components/Perfil';
import FormPromo from './components/FormPromo';
import Cupons from './components/Cupons';
import MinhasPromocoes from './components/MinhasPromocoes';
import MinhaPromocao from './components/MinhaPromocao';
import Filtros from './components/Filtros';
import Rede from './components/Rede';
import Menu from './components/Menu';

const TabIcon = (props) => {
    let color = props.focused ? '#b30404' : '#fff';
    return(
        <View>
            <Icon color={color} name={props.iconName} size={24} />
            <Text style={{color: color, fontFamily:'segoeui', fontSize: 12}}>{props.title}</Text>
        </View>
    )
}

class TabBar extends Component{
    render(){
        return(
            <View style={{backgroundColor: '#b30404', elevation: 7, flexDirection: 'row'}}>
                <StatusBar backgroundColor='#700000' />
                <TouchableHighlight onPress={() => Actions.drawerOpen()} underlayColor='#000' style={{flex: 1, elevation: 15}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent:'center', backgroundColor:'#ce0707'}}><Icon name='menu' color='white' size={50}/></View>
                </TouchableHighlight>
                <View style={{flex: 3, alignItems: 'center', justifyContent:'center', alignSelf: 'stretch', marginVertical:0}}>
                    <Image style={{width: 180}} source={ require('./imgs/logo.png') } resizeMethod='scale' resizeMode='contain'/>
                </View>
            </View>
        )
    }
}

export default props => (
    <Router>
        <Stack key='root'>
            <Drawer key='sideMenu' drawerPosition='left' drawerWidth={200} contentComponent={Menu} hideNavBar>
                <Stack key='stackTabs'>
                    <Tabs 
                        key='principal'
                        tabBarPosition='bottom'
                        activeTintColor='#b30404'
                        activeBackgroundColor='#fff'
                        inactiveTintColor='#fff'
                        inactiveBackgroundColor='#b30404'
                        labelStyle={{fontFamily: 'segoeui'}}
                        showLabel={false}
                        navBar={TabBar}
                        style={{ borderTopWidth: 0, elevation:50, height: 65}}
                    >
                        <Scene key='tabHome' title='HOME' iconName='home' icon={TabIcon} tabStyle={{borderWidth:0, elevation: 10}} style={{elevation: 10}}>
                            <Scene key='promocoes' component={Promocoes} title='Promoções' hideNavBar styl/>
                        </Scene>
                        <Scene key='tabFiltros' title='FILTROS' iconName='filter-list' icon={TabIcon} tabStyle={{borderWidth:0, elevation: 10}}  style={{elevation: 10}}>
                            <Scene key='filtros' component={Filtros} title='Filtros' hideNavBar/> 
                        </Scene>
                        <Scene key='tabPesquisa' title='PESQUISA' iconName='search' icon={TabIcon} tabStyle={{borderWidth:0, elevation: 10}}  style={{elevation: 10}}>
                            <Scene key='pesquisa' component={Filtros} title='Pesquisa' hideNavBar/> 
                        </Scene>
                    </Tabs>
                </Stack>
            </Drawer>

            
            <Scene key='formLogin' component={FormLogin} hideNavBar/>
            <Scene key='formCadastro' component={FormCadastro} hideNavBar={false} title='Cadastro'/>
            <Scene key='promocao' component={Promocao} hideNavBar={false} title='Promoção'/>
            <Scene key='perfil' component={Perfil} hideNavBar={false} title='Perfil'/>
            <Scene key='formPromo' component={FormPromo} hideNavBar={false} title='Nova Promoção'/>
            <Scene key='cupons' component={Cupons} hideNavBar={false} title='Meus Cupons'/>
            <Scene key='minhasPromos' component={MinhasPromocoes} hideNavBar={false} title='Minhas Promoções'/>
            <Scene key='minhaPromocao' component={MinhaPromocao} hideNavBar={false} title='Minha Promoção'/>
            <Scene key='filtros' component={Filtros} hideNavBar={false} title='Filtros'/>
            <Scene key='rede' component={Rede} hideNavBar={false} title='Minha Rede' />
        </Stack>       
    </Router>
);