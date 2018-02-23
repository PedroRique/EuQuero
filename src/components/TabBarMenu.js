import React, { Component } from 'react';
import { View, Text, StatusBar, Image, StyleSheet } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { Icon, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { modificaFiltrosTexto, limpaFiltros } from '../actions/AppActions';


class TabBarMenu extends Component{

    render(){
        // alert(this.props.navigationState.index)
        return (

            <View style={{ backgroundColor: '#B30404', elevation: 4}}>
        
                <StatusBar backgroundColor='#5F0E10' />
        
                <View style={{ justifyContent: 'space-around', alignItems: 'center', paddingVertical: 10, flexDirection: 'row'}}>
                    <View style={{justifyContent: 'center', flex: 1, backgroundColor: '#881518'}}>
                        <Icon color="white" name="menu" size={50} containerStyle={{backgroundColor:'#881518'}} type="material" underlayColor="#721214" onPress={() => {this.props.funcao.toggleMenu()}}/>
                    </View>
                    <View style={{justifyContent: 'center', flex: 4, alignItems: 'center'}}>
                        {/* <SearchBar
                            onChangeText={(texto) => this.props.modificaFiltrosTexto(texto)}
                            onClearText={() => this.props.limpaFiltros()}
                            lightTheme
                            containerStyle={{borderTopWidth: 0, borderBottomWidth:0, backgroundColor: 'transparent'}}
                            inputStyle={{backgroundColor: '#fff'}}
                            borderWidth={0}
                            underlineColorAndroid='transparent'
                            collapsable
                            borderColor='transparent'
                            underlayColor='transparent'
                            backgroundColor='transparent'
                            placeholderTextColor='#333'
                            placeholder='Pesquisa...' 
                            indicatorStyle={{backgroundColor: 'transparent', borderColor: 'transparent'}}
                            style={{borderWidth:0, borderColor: 'transparent'}}/> */}

                            <Image style={{height: 60 , width: 183, marginVertical: 2}} source={ require('../imgs/logo.png') } />
                    </View>
                </View>
        
                <TabBar {...this.props} labelStyle={{fontSize: 10, fontFamily: 'segoeui', flexWrap: 'wrap'}}

                    indicatorStyle={{backgroundColor:'white', flex:1, alignSelf:'stretch', height:200}}

                    style={{backgroundColor:'#b30404'}}

                    renderLabel={(tab) => {
                        let estilo = tab.focused ? styles.labelFocused : styles.label;
                        return(<Text style={[estilo, styles.text]}>{tab.route.title}</Text>)
                    }}

                    renderIcon={(tab) => {
                        let color = tab.focused ? '#b30404' : 'white'
                        return(<Icon name={tab.route.icon} color={color} size={25}/>);
                    }}/>
            </View>
        
        );
    }

} 

const styles = StyleSheet.create({
    labelFocused: {
        color: '#b30404'
    },
    label:{
        color: 'white'
    },
    text:{
        fontFamily: 'segoeui',
        fontSize: 16
    }
});

const mapStateToProps = state => (
    {
        filtros: state.AppReducer.filtros,
    }
)

export default connect(
    mapStateToProps, 
    {
        modificaFiltrosTexto,
        limpaFiltros
    }
)(TabBarMenu);