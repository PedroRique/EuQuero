import React from 'react';
import { View, Text, StatusBar, Image, TouchableHighlight } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { Icon, SearchBar } from 'react-native-elements';


export default props => (

    <View style={{ backgroundColor: '#881518', elevation: 4}}>

        <StatusBar backgroundColor='#5F0E10' />

        <View style={{ justifyContent: 'space-around', alignItems: 'center', paddingVertical: 10, flexDirection: 'row'}}>
            <View style={{justifyContent: 'center', flex: 1}}>
                <Icon color="white" name="menu" size={30} type="material" underlayColor="#721214" onPress={() => {props.funcao.toggleMenu()}}/>
            </View>
            <View style={{justifyContent: 'center', flex: 4}}>
                <SearchBar
                    onChangeText={() => false}
                    onClearText={() => false}
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

        <TabBar {...props} style={{backgroundColor: '#881518', elevation: 0}} indicatorStyle={{backgroundColor: '#e56d25', height: 5}}/>
    </View>

);