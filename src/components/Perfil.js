import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Share } from 'react-native';
import {Icon, Button} from 'react-native-elements';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';
import b64 from 'base-64';
import { contaRede } from '../actions/AppActions';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const uploadImage = (uri, mime = 'image/jpg') => {
    return new Promise((resolve, reject) => {
        const emailB64 = b64.encode(firebase.auth().currentUser.email);
        let uploadBlob = null;
        const imageRef = firebase.storage().ref('images/avatars').child(`${emailB64}`);
  
        fs.readFile(uri, 'base64')
            .then((data) => {
                return Blob.build(data, { type: `${mime};BASE64` });
            })
            .then((blob) => {
                uploadBlob = blob;
                return imageRef.put(blob, { contentType: mime });
            })
            .then(() => {
                uploadBlob.close();
                return imageRef.getDownloadURL();
            })
            .then((url) => {
                resolve(url);
            })
            .catch((error) => {
                reject(error);
            });
    })
}


class Perfil extends Component{

    constructor(props){
        super(props);

        this.state = { imagePath : ''};
    }

    shareKey(){
        Share.share({message:this.props.chave});
    }

    pickImage(){
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true
        }).then(image => {
            console.log('s',image);
            this.setState({imagePath : image.path});

            uploadImage(image.path);
        }).catch(error => {
            console.log('e',error);
        });
    }

    componentWillMount(){
        const {currentUser} = firebase.auth();
        let emailB64 = b64.encode(currentUser.email);
        firebase.storage().ref(`images/avatars/${emailB64}`).getDownloadURL().then(url => {
            this.setState({imagePath: url});
        }).catch(error => {
            this.setState({imagePath: ''});
        });
    }

    componentDidMount(){
        this.props.contaRede(this.props.chave);
    }

    render(){

        const img = require('../imgs/user.png');

        //<ActivityIndicator containerStyle={{width: 200, height: 200}}/>

        return(
            <View style={styles.container}>

                <View style={styles.boxAvatar}>
                    <TouchableOpacity onPress={() => this.pickImage()} >
                        {this.state.imagePath ? <Image source={{ uri: this.state.imagePath }} style={{width: 200, height: 200, borderRadius: 100}}/> :
                        <Image source={img} style={{width: 200, height: 200, borderRadius: 100}}/>}
                    </TouchableOpacity>
                    
                </View>
                

                <Text style={styles.titulo}>{this.props.nome}</Text>
                <Text style={styles.estab}>{this.props.email}</Text>

                <TouchableOpacity onPress={() => this.shareKey()} >
                    <View style={[styles.cardW,{borderColor: '#333', borderWidth: 1}]}>
                        <Text style={{color: '#333', fontSize: 14}}>Sua Chave:</Text>

                        <Text style={{color: '#881518', fontWeight: 'bold', fontSize: 25}}>{this.props.chave}</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.card}>
                    <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 25}}>Economia:</Text>
                </View>

                <View style={styles.card}>
                    <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 25}}>Economia:</Text>
                </View>

            </View>
        );
    } 
}

const mapStateToProps = state => (
    {
        nome: state.AutenticacaoReducer.nome,
        email: state.AutenticacaoReducer.email,
        chave: state.AutenticacaoReducer.chave
    }
)

export default connect(mapStateToProps, {contaRede})(Perfil);

const styles = StyleSheet.create({

    titulo: {
        fontSize: 30,
        color: '#333',
        fontWeight: 'bold',
        
    },
    estab:{
        color: '#777',
        fontSize: 18
    },
    container: {
        justifyContent:'flex-start', 
        alignItems: 'center', 
        flex: 1,
        backgroundColor: '#fff'
    },
    card:{
        alignItems: 'center',
        marginTop: 10,
        padding: 20,
        alignSelf: 'stretch',
        backgroundColor: '#881518',
        margin: 10,
        borderRadius: 5,
        elevation: 2
    },
    cardW: {
        alignItems: 'center',
        marginTop: 10,
        padding: 20,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 5,
        elevation: 2
    },
    boxAvatar: { 
        elevation: 4,
        backgroundColor: '#ededed',
        width: 220, 
        height: 220, 
        borderRadius: 110, 
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 10
    }

});