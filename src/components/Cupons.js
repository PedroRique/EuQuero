import React, { Component } from 'react';
import { ScrollView, View, Text, ActivityIndicator, Button, ListView } from 'react-native';
import { Icon, List } from 'react-native-elements';
import { listaCuponsFetch } from '../actions/AppActions';
import { connect } from 'react-redux';
import _ from 'lodash';

class Cupons extends Component {
    
    loadingPromocoes = true;

    componentWillMount(){
        this.props.listaCuponsFetch();
        this.criaFonteDeDados(this.props.cupons);
    }

    componentWillReceiveProps(nextProps){
        this.criaFonteDeDados(nextProps.cupons);
    }
    
    loading(){
        return(
            <ScrollView style={{alignSelf: 'stretch'}} contentContainerStyle={{justifyContent: 'space-between'}}>
                <ListView
                    enableEmptySections
                    dataSource={this.fonteDeDados}
                    renderRow={data => (<View key={data.key}> <Text>{data.key}</Text> </View>)}
                />
            </ScrollView>
        )
    }

    criaFonteDeDados( cupons ){
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        
        this.fonteDeDados = ds.cloneWithRows(cupons);
    }
    
    render(){
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
                {this.loading()}
            </View>
        );
    }
}

const mapStateToProps = state => {

    const cupons = _.map(state.AppReducer.cupons, (val, uid) => {
        console.log(val);
        
        return {...val, uid}
    });

    return ({
        cupons: _.without(cupons, undefined)
    })
} 

export default connect(
    mapStateToProps, 
    {}
)(Cupons);