import React, { Component } from 'react';
import { View, Text, StatusBar, Image, TouchableHighlight } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { Icon, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { modificaFiltros, limpaFiltros } from '../actions/AppActions';


class TabBarMenu extends Component{

    render(){
        return (

            <View style={{ backgroundColor: '#881518', elevation: 4}}>
        
                <StatusBar backgroundColor='#5F0E10' />
        
                <View style={{ justifyContent: 'space-around', alignItems: 'center', paddingVertical: 10, flexDirection: 'row'}}>
                    <View style={{justifyContent: 'center', flex: 1}}>
                        <Icon color="white" name="menu" size={30} type="material" underlayColor="#721214" onPress={() => {this.props.funcao.toggleMenu()}}/>
                    </View>
                    <View style={{justifyContent: 'center', flex: 4}}>
                        <SearchBar
                            onChangeText={(texto) => this.props.modificaFiltros(texto)}
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
                            style={{borderWidth:0, borderColor: 'transparent'}}/>
                    </View>
                </View>
        
                <TabBar {...this.props} style={{backgroundColor: '#881518', elevation: 0}} indicatorStyle={{backgroundColor: '#e56d25', height: 5}}/>
            </View>
        
        );
    }

} 

const mapStateToProps = state => (
    {
        filtros: state.AppReducer.filtros,
    }
)

export default connect(
    mapStateToProps, 
    {
        modificaFiltros,
        limpaFiltros
    }
)(TabBarMenu);