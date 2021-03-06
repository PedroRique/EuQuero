import React, {Component} from 'react';
import { Text, View, Image, TouchableHighlight, StatusBar, Dimensions} from 'react-native';
import { Router, Scene, Stack, Tabs, Drawer, Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
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
import Economia from './components/Economia';
import Pesquisa from './components/Pesquisa';
import Blank from './components/Blank';

const TabIcon = (props) => {
    let color = props.focused ? '#b30404' : '#fff';
    return(
        <View>
            <Icon color={color} name={props.iconName} size={24} />
            <Text style={{color: color, fontFamily:'segoeui', fontSize: 8}}>{props.title}</Text>
        </View>
    )
}

class TabBarHome extends Component{
    render(){
        return(
            <View style={{backgroundColor: '#b30404', elevation: 8, flexDirection: 'row'}}>
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

class TabBarBackToHome extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let title = '';
        if(this.props.scene.route.index != undefined){
            title = this.props.scene.route.routes[this.props.scene.route.index].routes[0].params.title;
        }else{
            title = this.props.scene.route.params.title;
        }
        return(
            <View style={{backgroundColor: '#ae0707', elevation: 8, flexDirection: 'row', height: 80}}>
                <StatusBar backgroundColor='#700000' />
                <TouchableHighlight onPress={() => {
                    this.props.navigation.goBack();
                    this.props.navigation.goBack();
                    }} underlayColor='#000' style={{flex: 1, elevation: 15}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent:'center', backgroundColor:'#ce0707'}}><Icon name='home' color='white' size={50}/></View>
                </TouchableHighlight>
                <View style={{flex: 3, alignItems: 'center', justifyContent:'center', alignSelf: 'stretch', marginVertical:0}}>
                    <Text style={{fontSize: 30, color:'white', fontFamily: 'segoeuii', textAlign:'right', alignSelf: 'stretch', marginRight:20}}>{title}</Text>
                </View>
            </View>
        )
    }
}

class TabBarBackToHome2 extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let title = '';
        if(this.props.scene.route.index != undefined){
            title = this.props.scene.route.routes[this.props.scene.route.index].routes[0].params.title;
        }else{
            title = this.props.scene.route.params.title;
        }
        return(
            <View style={{backgroundColor: '#ae0707', elevation: 8, flexDirection: 'row', height: 80}}>
                <StatusBar backgroundColor='#700000' />
                <TouchableHighlight onPress={() => {
                    this.props.navigation.goBack();
                    }} underlayColor='#000' style={{flex: 1, elevation: 15}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent:'center', backgroundColor:'#ce0707'}}><Icon name='home' color='white' size={50}/></View>
                </TouchableHighlight>
                <View style={{flex: 3, alignItems: 'center', justifyContent:'center', alignSelf: 'stretch', marginVertical:0}}>
                    <Text style={{fontSize: 30, color:'white', fontFamily: 'segoeuii', textAlign:'right', alignSelf: 'stretch', marginRight:20}}>{title}</Text>
                </View>
            </View>
        )
    }
}

const { height, width } = Dimensions.get('window');
const menuWidth = (width * 2)/3; //Menu deve sempre ser 2/3 da tela;

class Routes extends Component {
    constructor(props){
        super(props);
    }

    render(){ 
        console.log(this.props);

        const labelStyle = {fontFamily: 'segoeui', textAlign:'center', fontSize:8};
        if(this.props.loginAs){
            return(
            <Router>
                <Stack key='root'>
                    <Drawer key='sideMenu' drawerPosition='left' drawerWidth={menuWidth} contentComponent={Menu} hideNavBar>
                        <Stack>
                            <Tabs 
                                key='tabsHome'
                                tabBarPosition='bottom'
                                activeTintColor='#b30404'
                                activeBackgroundColor='#fff'
                                inactiveTintColor='#fff'
                                inactiveBackgroundColor='#b30404'
                                labelStyle={labelStyle}
                                showLabel={false} 
                                navBar={TabBarHome}
                                style={{height: 65}}
                            >
                                <Scene key='tabHome' title='HOME' iconName='home' icon={TabIcon} tabStyle={{borderWidth:0, elevation: 10}} style={{elevation: 10}}>
                                    <Scene key='promocoes' component={Promocoes} title='Promoções' hideNavBar/>
                                </Scene>
                                <Scene key='tabFiltros' title='FILTROS' iconName='filter-list' icon={TabIcon} tabStyle={{borderWidth:0, elevation: 10}}  style={{elevation: 10}}>
                                    <Scene key='filtros' component={Filtros} title='Filtros' hideNavBar/> 
                                </Scene>
                                <Scene key='tabPesquisa' title='PESQUISA' iconName='search' icon={TabIcon} tabStyle={{borderWidth:0, elevation: 10}}  style={{elevation: 10}}>
                                    <Scene key='pesquisa' component={Pesquisa} title='Pesquisa' hideNavBar/>
                                </Scene>
                                <Scene key='tabMinhasPromosHome' title='MINHAS PROMOS' iconName='collections-bookmark' icon={TabIcon} tabStyle={{borderWidth:0, elevation: 10}}  style={{elevation: 10}}>
                                    <Scene key='minhasPromosHome' component={MinhasPromocoes} title='Minhas Promoções' hideNavBar/>
                                </Scene>
                            </Tabs>
                        </Stack>
                    </Drawer>
    
                    <Tabs
                        key='tabsPerfil'
                        tabBarPosition='bottom'
                        activeTintColor='#b30404'
                        activeBackgroundColor='#fff'        
                        inactiveBackgroundColor='#b30404'
                        labelStyle={labelStyle}
                        showLabel={false}
                        navBar={TabBarBackToHome}
                        style={{ height: 65 }}
                    >
                        <Scene key='tabPerfil' title='PERFIL' iconName='person' icon={TabIcon} tabStyle={{borderWidth:0, elevation: 10}} style={{elevation: 10}}>
                            <Scene key='perfil' component={Perfil} title='Perfil' hideNavBar/>
                        </Scene>
                        <Scene key='tabRede' title='MINHA REDE' iconName='people' icon={TabIcon} tabStyle={{borderWidth:0, elevation: 10}}  style={{elevation: 10}}>
                            <Scene key='rede' component={Rede} title='Minha Rede' hideNavBar/>
                        </Scene>
                        <Scene key='tabFormPromo' title='NOVA PROMOÇÃO' iconName='add-to-photos' icon={TabIcon} tabStyle={{borderWidth:0, elevation: 10}}  style={{elevation: 10}}>
                            <Scene key='formPromo' component={FormPromo} title='Nova Promoção' hideNavBar/>
                        </Scene>
                        <Scene key='tabMinhasPromosPerfil' title='MINHAS PROMOÇÕES' iconName='collections-bookmark' icon={TabIcon} tabStyle={{borderWidth:0, elevation: 10}}  style={{elevation: 10}}>
                            <Scene key='minhasPromosPerfil' component={MinhasPromocoes} title='Minhas Promoções' hideNavBar/>
                        </Scene>
                    </Tabs>
                    
                    <Scene key='promocao' component={Promocao} title='Promoção' navBar={TabBarBackToHome2}/>
                    <Scene key='formLogin' component={FormLogin} hideNavBar initial/>
                    <Scene key='formCadastro' component={FormCadastro} title='Cadastro'/>
                    {/* <Scene key='formPromo' component={FormPromo} hideNavBar={false} title='Nova Promoção'/> */}
                    {/* <Scene key='minhasPromos' component={MinhasPromocoes} hideNavBar={false} title='Minhas Promoções'/> */}
                    <Scene key='minhaPromocao' component={MinhaPromocao} hideNavBar={false} title='Minha Promoção'/>
                </Stack>
            </Router>)
        }
        return(
        <Router>
            <Stack key='root'>
                <Drawer key='sideMenu' drawerPosition='left' drawerWidth={menuWidth} contentComponent={Menu} hideNavBar>
                    <Stack>
                        <Tabs 
                            key='tabsHome'
                            tabBarPosition='bottom'
                            activeTintColor='#b30404'
                            activeBackgroundColor='#fff'
                            inactiveTintColor='#fff'
                            inactiveBackgroundColor='#b30404'
                            labelStyle={labelStyle}
                            showLabel={false}
                            navBar={TabBarHome}
                            style={{ height: 65 }}
                        >
                            <Scene key='tabHome' title='HOME' iconName='home' icon={TabIcon} tabStyle={{borderWidth:0, elevation: 10}} style={{elevation: 10}}>
                                <Scene key='promocoes' component={Promocoes} title='Promoções' hideNavBar/>
                            </Scene>
                            <Scene key='tabFiltros' title='FILTROS' iconName='filter-list' icon={TabIcon} tabStyle={{borderWidth:0, elevation: 10}}  style={{elevation: 10}}>
                                <Scene key='filtros' component={Filtros} title='Filtros' hideNavBar/> 
                            </Scene>
                            <Scene key='tabPesquisa' title='PESQUISA' iconName='search' icon={TabIcon} tabStyle={{borderWidth:0, elevation: 10}}  style={{elevation: 10}}>
                                <Scene key='pesquisa' component={Pesquisa} title='Pesquisa' hideNavBar/>
                            </Scene>
                            <Scene key='tabCuponsHome' title='CUPONS' iconName='receipt' icon={TabIcon} tabStyle={{borderWidth:0, elevation: 10}}  style={{elevation: 10}}>
                                <Scene key='cuponsHome' component={Cupons} title='Cupons' hideNavBar/>
                            </Scene>
                        </Tabs>
                    </Stack>
                </Drawer>

                <Tabs
                    key='tabsPerfil'
                    tabBarPosition='bottom'
                    activeTintColor='#b30404'
                    activeBackgroundColor='#fff'                
                    inactiveBackgroundColor='#b30404'
                    labelStyle={labelStyle}
                    showLabel={false}
                    navBar={TabBarBackToHome2}
                    style={{ height: 65 }}
                >
                    <Scene key='tabPerfil' title='PERFIL' iconName='person' icon={TabIcon} tabStyle={{borderWidth:0, elevation: 10}} style={{elevation: 10}}>
                        <Scene key='perfil' component={Perfil} title='Perfil' hideNavBar/>
                    </Scene>
                    <Scene key='tabRede' title='MINHA REDE' iconName='people' icon={TabIcon} tabStyle={{borderWidth:0, elevation: 10}}  style={{elevation: 10}}>
                        <Scene key='rede' component={Rede} title='Minha Rede' hideNavBar/>
                    </Scene>
                    <Scene key='tabEconomia' title='ECONOMIA' iconName='attach-money' icon={TabIcon} tabStyle={{borderWidth:0, elevation: 10}}  style={{elevation: 10}}>
                        <Scene key='economia' component={Economia} title='Economia' hideNavBar/>
                    </Scene>
                    <Scene key='tabCuponsPerfil' title='CUPONS' iconName='receipt' icon={TabIcon} tabStyle={{borderWidth:0, elevation: 10}}  style={{elevation: 10}}>
                        <Scene key='cuponsPerfil' component={Cupons} title='Cupons' hideNavBar/>
                    </Scene>
                </Tabs>
                
                <Scene key='promocao' component={Promocao} title='Promoção' navBar={TabBarBackToHome2}/>
                <Scene key='formLogin' component={FormLogin} hideNavBar initial/>
                <Scene key='formCadastro' component={FormCadastro} title='Cadastro'/>
                {/* <Scene key='formPromo' component={FormPromo} hideNavBar={false} title='Nova Promoção'/> */}
                {/* <Scene key='minhasPromos' component={MinhasPromocoes} hideNavBar={false} title='Minhas Promoções'/> */}
                <Scene key='minhaPromocao' component={MinhaPromocao} hideNavBar={false} title='Minha Promoção'/>
            </Stack>       
        </Router>)
    }
}

const mapStateToProps = state => {
    return({
        loginAs: state.AutenticacaoReducer.loginAs,
        loggedIn: state.AutenticacaoReducer.loggedIn
    })
}

export default connect(mapStateToProps,{})(Routes);