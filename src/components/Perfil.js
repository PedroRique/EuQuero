import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Share, ScrollView} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';
import b64 from 'base-64';

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
            this.setState({imagePath : image.path});

            uploadImage(image.path);
        }).catch(error => {
        });
    }

    componentWillMount(){
        const {currentUser} = firebase.auth();
        if(currentUser){
            let emailB64 = b64.encode(currentUser.email);
            firebase.storage().ref(`images/avatars/${emailB64}`).getDownloadURL().then(url => {
                this.setState({imagePath: url});
            }).catch(error => {
                this.setState({imagePath: ''});
            });
        }
    }

    render(){

        const img = require('../imgs/user.png');

        //<ActivityIndicator containerStyle={{width: 200, height: 200}}/>

        return(
            <ScrollView contentContainerStyle={styles.container}>

                <View style={styles.boxAvatar}>
                    <TouchableOpacity onPress={() => this.pickImage()} >
                        {this.state.imagePath ? <Image source={{ uri: this.state.imagePath }} style={{width: 150, height: 150, borderRadius: 75}}/> :
                        <Image source={img} style={{width: 150, height: 150, borderRadius: 75}}/>}
                    </TouchableOpacity>
                    
                </View>
                

                <Text style={styles.titulo}>{this.props.nome}</Text>
                <Text style={styles.estab}>{this.props.email}</Text>

                <TouchableOpacity onPress={() => this.shareKey()} >
                    <View style={styles.card}>
                        <Text style={{color: 'white', fontSize: 14, fontFamily: 'segoeuii'}}>Sua Chave:</Text>

                        <Text style={{color: 'white', fontFamily: 'segoeuib', fontSize: 25}}>{this.props.chave}</Text>
                    </View>
                </TouchableOpacity>

            </ScrollView>
        );
    } 
}

const mapStateToProps = state => (
    {
        nome: state.AutenticacaoReducer.nome,
        email: state.AutenticacaoReducer.email,
        chave: state.AutenticacaoReducer.chave,
    }
)

export default connect(mapStateToProps, {})(Perfil);

const styles = StyleSheet.create({

    titulo: {
        fontSize: 32,
        color: '#b30404',
        fontFamily: 'segoeuii',
        fontWeight: 'bold',
        marginBottom: 5
    },
    estab:{
        color: 'white',
        fontSize: 18,
        fontFamily: 'segoeuii',
        marginBottom: 30
    },
    container: {
        justifyContent:'flex-start', 
        alignItems: 'center',
        backgroundColor: '#ff9900',
    },
    card:{
        alignItems: 'center',
        marginTop: 10,
        padding: 20,
        alignSelf: 'stretch',
        backgroundColor: '#b30404',
        margin: 10,
        elevation: 2
    },
    cardW: {
        alignItems: 'center',
        marginTop: 10,
        padding: 20,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        margin: 10,
        elevation: 2
    },
    boxAvatar: { 
        elevation: 20,
        backgroundColor: '#ededed',
        width: 170, 
        height: 170, 
        borderRadius: 85,
        justifyContent: 'center', 
        alignItems: 'center',
        marginVertical: 30
    },
    linhaTxt: {
        backgroundColor: '#fff',
        padding: 10,
    }

});