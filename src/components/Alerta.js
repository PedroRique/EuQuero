import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, TouchableHighlight, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

class Alerta extends Component {

    constructor(props){
        super(props);

        let color = '';
        let icon = '';
        let message = props.message;

        switch(props.type){
            case 'erro':
                color = 'red';
                icon = 'error';
                break;
            case 'info':
                color = '#FF9900';
                icon = 'info';
                break;
            case 'sucesso':
                color = 'green';
                icon= 'check-circle';
                break;
            default:
                color= 'gray';
                info= 'info';             
        }

        const styles = StyleSheet.create({
            modalBox: {
                padding:40,
                flex:1,
                backgroundColor: 'rgba(0, 0, 0, 0)',
                justifyContent: 'center',
                alignItems: 'center'
            },
            modalContent: {
                backgroundColor:'#fff',
                padding: 20,
                borderColor: color,
                borderWidth: 8,
                borderStyle: 'solid',
                alignSelf: 'stretch',
                marginHorizontal: 15
            },
            fundo: {
                padding:40,
                flex:1,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                justifyContent: 'center',
                alignItems: 'center'
            },
            texto: {
                textAlign: 'center',
                fontSize: 18,
                marginBottom: 15,
                fontFamily: 'segoeui'
            },
            icon: {
                marginBottom: 10
            },
            btnOK:{
                backgroundColor: color,
                fontFamily: 'segoeuib',
                color: 'white',
                textAlign: 'center',
                paddingVertical: 10
            }
        });

        this.state = { icon, color, styles, message};
        
    }

    setVisible(visible){
        this.props.setAlert(visible);
    }

    render(){
        const styles = this.state.styles;

        return(
            <View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.props.visible}
                    onRequestClose={() => this.setVisible(!this.props.visible)}
                >
                    <TouchableHighlight onPress={() => {alert(3);}} style={styles.fundo}>
                        <View></View>
                    </TouchableHighlight>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    backgroundColor="transparent"
                    visible={this.props.visible}
                    onRequestClose={() => this.setVisible(!this.props.visible)}
                >
                    <View style={styles.modalBox}>
                        <View style={styles.modalContent}>
                            <Icon name={this.state.icon} color={this.state.color} containerStyle={styles.icon}></Icon>
                            <Text style={styles.texto}>{this.state.message}</Text>
                            <TouchableOpacity onPress={() => this.setVisible(false)} activeOpacity={0.5}>
                                <Text style={styles.btnOK}>OK</Text>
                            </TouchableOpacity>
                        </View>                     
                    </View>
                </Modal>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return ({})
} 

export default connect(
    mapStateToProps, 
    {}
)(Alerta);