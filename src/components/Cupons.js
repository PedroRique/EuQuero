import React, { Component } from 'react';
import { ScrollView, View, Text, ActivityIndicator, Button, ListView,Modal, TouchableOpacity} from 'react-native';
import { Icon, List } from 'react-native-elements';
import { listaCuponsFetch } from '../actions/AppActions';
import { connect } from 'react-redux';
import Cupom from './Cupom';
import _ from 'lodash';

class Cupons extends Component {

    constructor(props){
        super(props);

        this.state = {
            modalVisible: false,
            codigoCupom: 'VANTAGEM'
        }
    }
    
    loadingPromocoes = true;

    componentWillMount(){
        this.props.listaCuponsFetch();
        this.criaFonteDeDados(this.props.cupons);
    }

    componentWillReceiveProps(nextProps){
        this.criaFonteDeDados(nextProps.cupons);
    }
    
    loading(){
        if(!this.props.loadingCupons){
            return(
                <ScrollView style={{alignSelf: 'stretch'}} contentContainerStyle={{justifyContent: 'space-between'}}>
                    <ListView
                        enableEmptySections
                        dataSource={this.fonteDeDados}
                        renderRow={data => (<Cupom key={data.codigo} item={data} setModalVisible={this.setModalVisible.bind(this)}/>)}
                    />
                </ScrollView>
            )
        }

        return (
            <ActivityIndicator size="large" color='#881518'/>
        );
        
    }

    criaFonteDeDados( cupons ){
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        
        this.fonteDeDados = ds.cloneWithRows(cupons);
    }

    setModalVisible(modalVisible,codigoCupom){
        console.log(modalVisible,codigoCupom);
        this.setState({modalVisible, codigoCupom});
    }
    
    render(){
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
                {this.loading()}

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.setModalVisible(false,'')}
                    >
                    <View style={{ flex:1, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    backgroundColor="transparent"
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(false,'');
                    }}
                    >
                    <TouchableOpacity onPress={() => {
                            console.log('press');
                            this.setModalVisible(false,'');
                        }} style={{flex:1, alignItems:'center', justifyContent:'center', padding:20}} activeOpacity={1}>
                        <View style={{ backgroundColor: 'white', alignItems: 'center', justifyContent: 'flex-start', padding: 30}} >
                            <Text style={{fontSize: 32, color: '#b30404', fontFamily: 'segoeuib'}}>{this.state.codigoCupom}</Text>
                            <Text style={{fontFamily: 'segoeuii'}}>Cupom válido até dia</Text>
                        </View>
                    </TouchableOpacity>
                    
                </Modal>
            </View>
        );
    }
}

const mapStateToProps = state => {
    let index = -1;
    const cupons = _.map(state.AppReducer.cupons, (val, uid) => {     
        
        if(index++ % 2){
            return {...val, uid,bgColor:'#fff'}
        }else{
            return {...val, uid,bgColor:'#ededed'}
        }
        
    });

    return ({
        cupons: _.without(cupons, undefined),
        loadingCupons: state.AppReducer.loadingCupons
    })
} 

export default connect(
    mapStateToProps, 
    {
        listaCuponsFetch
    }
)(Cupons);