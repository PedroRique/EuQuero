import React, {Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator, ScrollView, Image, ListView, KeyboardAvoidingView } from 'react-native';
import { Icon, CheckBox} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { modificaNomePromo, modificaTipoPromo, savePromo, modificaValorInicialPromo, modificaDescontoPromo, modificaDescricaoPromo, modificaDiasValidos, modificaDataIni, modificaDataFim, modificaRegulamentoPromo} from '../actions/AppActions';
import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import b64 from 'base-64';
import ImagePicker from 'react-native-image-crop-picker';
import _ from 'lodash';
import DatePicker from 'react-native-datepicker';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

class FormPromo extends Component {

    constructor(props){
        super(props);    
        
        this.state = {
            loading: false,
            imagePath: '',
            dataIni: '01/05/2016',
            dataFim: '01/05/2016',
            selectedItems: [],
            dataFimDisable: true,
            dataFimStyle: {
                height: 45,
                backgroundColor: '#ededed',
                borderWidth: 0,
                alignItems: 'stretch',
                justifyContent: 'center',
                marginBottom: 20
            }
        }
    }

    componentWillMount(){
        this.criaFonteDeDados(this.props.diasValidosPromo);
    }

    componentWillReceiveProps(nextProps){
        this.criaFonteDeDados(nextProps.diasValidosPromo);
    }

    pickImage(){
        ImagePicker.openPicker({
            width: 800,
            height: 500,
            cropping: true
        }).then(image => {
            this.setState({imagePath : image.path});
        }).catch(error => false);
    }

    loading(){
        if(this.props.loadingFormPromo){
            return(
                <ActivityIndicator size="large" color='#881518'/>
            );
        }
        return (
            <TouchableOpacity onPress={ () => { this.uploadImage(this.state.imagePath); } } style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.btnEntrar}>Salvar</Text>
            </TouchableOpacity>
        );
    }

    uploadImage (uri, mime = 'image/jpg') {
        let uploadBlob = null;
        let key = Date.now().toString();
    
        Blob.build(RNFetchBlob.wrap(uri), { type : 'image/jpg' })
        .then((blob) => {
            firebase.storage().ref('images/promos').child(key).put(blob, { contentType : 'image/jpg' }).then((snapshot) => {
                this._savePromo(snapshot.downloadURL, key);
            }).catch((e) => {
            })
        })
    
    }

    _savePromo(imageURL, imageKey){
        const {
            nomePromo,
            nomeEstab,
            valorInicialPromo,
            descontoPromo,
            descricaoPromo,
            diasValidosPromo,
            dataIni,
            dataFim,
            placeObj,
            stringCateg,
            regulamentoPromo
        } = this.props;
        const {currentUser} = firebase.auth();

        this.props.savePromo({
            nomePromo, 
            // isExclusive, 
            currentUser, 
            nomeEstab,
            valorInicialPromo,
            descontoPromo,
            descricaoPromo,
            diasValidosPromo,
            dataIni,
            dataFim,
            uri: this.state.imagePath,
            imageURL,
            imageKey,
            placeObj,
            stringCateg,
            regulamentoPromo
        });
    }


    renderImage(){
        if(this.state.imagePath){
            return(
                <TouchableOpacity onPress={() => this.pickImage()} style={{alignSelf: 'stretch'}}>
                    <Image source={{uri : this.state.imagePath}} style={{alignSelf: 'stretch', height: 200}} />
                    <Icon name='mode-edit' size={24} iconStyle={{color: 'white'}} containerStyle={{position: 'absolute',right: 15, bottom: 10}}/>
                </TouchableOpacity>
            );
        }
        return(
            <TouchableOpacity onPress={() => this.pickImage()} style={{alignSelf: 'stretch'}}>
                <View style={{backgroundColor: "#666",height: 200, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', borderBottomColor: '#666', borderBottomWidth: 1}}>
                    <Text style={{color: 'white', fontSize: 14, textAlign: 'center'}}>Adicione uma imagem à sua promoção</Text>
                    <Icon name='mode-edit' size={24} iconStyle={{color: 'white'}} containerStyle={{position: 'absolute',right: 15, bottom: 10}}/>
                </View>
            </TouchableOpacity>
        );
    }

    criaFonteDeDados(dias){
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        
        this.listDias = ds.cloneWithRows(dias);
    }

    _modificaDiasValidos(key){
        let dias = this.props.diasValidosPromo;
        let dia = dias[key];

        dias[key] = {dia: dia.dia, isValid: !dia.isValid, key: dia.key};
        
        this.props.modificaDiasValidos(dias);

        this.criaFonteDeDados(this.props.diasValidosPromo);
    }

    _modificaDataIni(dataIni){
        if(this.state.dataFimDisable){
            this.setState({dataFimDisable:false,dataFimStyle: {
                height: 45,
                backgroundColor: '#fff',
                borderWidth: 0,
                alignItems: 'stretch',
                justifyContent: 'center',
                marginBottom: 20
            }})
        }
            

        this.props.modificaDataIni(dataIni);

        let dFim = this.datePickerFim.getDate();
        let dIni = this.datePickerIni.getDate();

        if(dFim < dIni)
            this.props.modificaDataFim(dataIni);
    }

    _modificaDataFim(){
        
    }

    render (){
        const minDate = new Date();

        return (
            <ScrollView>
                <KeyboardAvoidingView behavior='padding'>
                <View>
                    {this.renderImage()}
                </View>

                <View style={styles.meio}>
                    
                    <TextInput 
                        value={this.props.nomePromo}
                        style={[styles.input, {marginTop: 20}]}
                        placeholderTextColor='#888'
                        placeholder='Nome'
                        underlineColorAndroid='transparent'
                        maxLength={20}
                        returnKeyType='next'
                        onSubmitEditing={() => this.inputValor.focus()}
                        onChangeText={texto => this.props.modificaNomePromo(texto)}
                    />

                    <TextInput 
                        value={this.props.valorInicialPromo}
                        style={styles.input}
                        placeholderTextColor='#888'
                        placeholder='Valor Inicial'
                        underlineColorAndroid='transparent'
                        returnKeyType='next'
                        onSubmitEditing={() => this.inputDesconto.focus()}
                        ref={(input) => this.inputValor = input}
                        onChangeText={texto => this.props.modificaValorInicialPromo(texto)}
                    />

                    <TextInput 
                        value={this.props.descontoPromo}
                        style={styles.input}
                        placeholderTextColor='#888'
                        placeholder='Desconto'
                        underlineColorAndroid='transparent'
                        returnKeyType='next'
                        onSubmitEditing={() => this.inputDescricao.focus()}
                        ref={(input) => this.inputDesconto = input}
                        onChangeText={texto => this.props.modificaDescontoPromo(texto)}
                    />

                    <TextInput 
                        value={this.props.descricaoPromo}
                        style={styles.textarea}
                        placeholderTextColor='#888'
                        placeholder='Descrição'
                        multiline={true}
                        returnKeyType='next'
                        onSubmitEditing={() => this.inputRegulamento.focus()}
                        ref={(input) => this.inputDescricao = input}
                        underlineColorAndroid='transparent'
                        onChangeText={texto => this.props.modificaDescricaoPromo(texto)}
                    />

                    <TextInput 
                        value={this.props.regulamentoPromo}
                        style={styles.textarea}
                        placeholderTextColor='#888'
                        placeholder='Regulamento'
                        multiline={true}
                        ref={(input) => this.inputRegulamento = input}
                        underlineColorAndroid='transparent'
                        onChangeText={texto => this.props.modificaRegulamentoPromo(texto)}
                    />          

                    <View style={{flexDirection:'row',justifyContent:'space-between', marginVertical: 10, marginHorizontal:15,alignSelf:'stretch'}}>
                        <DatePicker
                            style={styles.datepicker}
                            date={this.props.dataIni}
                            mode="date"
                            placeholder="Data de Início"
                            format="DD/MM/YYYY"
                            minDate={minDate}
                            confirmBtnText="Confirmar"
                            cancelBtnText="Cancelar"
                            placeholderTextColor='#888'
                            ref={(datepicker) => this.datePickerIni = datepicker}
                            customStyles={{
                                dateIcon: {position: 'absolute',left: 0,top: 4,marginLeft: 0},
                                dateInput: {marginLeft: 36,borderWidth: 0}
                            }}
                            onDateChange={(dataIni) => this._modificaDataIni(dataIni)}
                        />

                        <DatePicker
                            disabled={this.state.dataFimDisable}
                            style={this.state.dataFimStyle}
                            date={this.props.dataFim}
                            mode="date"
                            placeholder="Data de Fim"
                            format="DD/MM/YYYY"
                            minDate={this.props.dataIni}
                            confirmBtnText="Confirmar"
                            cancelBtnText="Cancelar"
                            placeholderTextColor='#888'
                            ref={(datepicker) => this.datePickerFim = datepicker}
                            customStyles={{
                                dateIcon: {position: 'absolute',left: 0,top: 4,marginLeft: 0},
                                dateInput: {marginLeft: 36,borderWidth: 0, color:'#888'}
                            }}
                            onDateChange={(dataFim) => this.props.modificaDataFim(dataFim)}
                        />
                    </View>
                    
                    {/* <CheckBox
                        title='Exclusiva'
                        checked={this.props.isExclusive}
                        checkedColor='#881518'
                        checkedIcon='check-box'
                        uncheckedIcon='check-box-outline-blank'
                        center
                        iconType='material'
                        containerStyle={{backgroundColor: 'transparent', borderColor: 'transparent'}}
                        onPress={() => this.props.modificaTipoPromo()}
                    /> */}

                    <View>
                        <View style={{height: 50, alignSelf: 'stretch'}}>
                            <ListView
                                contentContainerStyle={{flexDirection: 'row'}}
                                enableEmptySections
                                dataSource={this.listDias}
                                renderRow={data => (
                                        <View key={data.key}>
                                            <TouchableOpacity onPress={() => this._modificaDiasValidos(data.key)}>
                                                {data.isValid ? <Text style={styles.txtDiaValid}>{data.dia}</Text> :
                                                <Text style={styles.txtDia}>{data.dia}</Text>}
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }
                            />
                        </View>
                    </View>

                    
                    
                </View>

                </KeyboardAvoidingView>

                <View style={styles.rodape}>
                    {this.loading()}
                </View>

            </ScrollView>
        );
    }

}

const mapStateToProps = state => (
    {
        nomeEstab: state.AutenticacaoReducer.nome,
        nomePromo: state.AppReducer.nomePromo,
        loadingFormPromo: state.AppReducer.loadingFormPromo,
        descontoPromo: state.AppReducer.descontoPromo,
        descricaoPromo: state.AppReducer.descricaoPromo,
        diasValidosPromo: state.AppReducer.diasValidosPromo,
        diasChanged: state.AppReducer.diasChanged,
        valorInicialPromo: state.AppReducer.valorInicialPromo,
        regulamentoPromo: state.AppReducer.regulamentoPromo,
        dataIni: state.AppReducer.dataIni,
        dataFim: state.AppReducer.dataFim,
        placeObj: state.AutenticacaoReducer.placeObj,
        stringCateg: state.AutenticacaoReducer.stringCateg
    }
)

export default connect( mapStateToProps,
    {
        modificaNomePromo,
        modificaTipoPromo,
        savePromo,
        modificaValorInicialPromo,
        modificaDescontoPromo,
        modificaDescricaoPromo,
        modificaDiasValidos,
        modificaDataIni,
        modificaDataFim,
        modificaRegulamentoPromo
    } 
)(FormPromo);


const styles = StyleSheet.create({
    meio:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        marginHorizontal: 15,
        height: 45,
        backgroundColor: 'white',
        borderWidth: 0,
        marginVertical: 10,
        padding: 10,
        fontSize: 18,
        textAlign: 'left',
        alignSelf: 'stretch'
    },
    textarea: {
        marginHorizontal: 15,
        height: 150,
        backgroundColor: 'white',
        borderWidth: 0,
        marginVertical: 10,
        padding: 10,
        fontSize: 18,
        textAlign: 'left',
        alignSelf: 'stretch',
        textAlignVertical: 'top'
    },
    datepicker: {
        height: 45,
        backgroundColor: '#fff',
        borderWidth: 0,
        alignItems: 'stretch',
        justifyContent: 'center',
        marginBottom: 20
    },
    btnEntrar: {
        paddingVertical: 10,
        paddingHorizontal: 100,
        backgroundColor: '#881518',
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        elevation: 1,
        marginBottom: 5
    },
    rodape: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 5
    },

    txtDia: {
        padding: 5,
        backgroundColor: '#333',
        color: 'white',
        borderRadius: 15,
        width: 30,
        height: 30,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        fontWeight: 'bold',
        marginHorizontal: 2
    },

    txtDiaValid: {
        padding: 5,
        backgroundColor: 'red',
        color: 'white',
        borderRadius: 15,
        width: 30,
        height: 30,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        fontWeight: 'bold',
        marginHorizontal: 2
    }
});