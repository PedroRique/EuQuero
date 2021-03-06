import React, {Component} from 'react';
import {Alert,Animated,View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Modal, Button, ListView, ScrollView, Dimensions, InteractionManager, TextInput, Keyboard} from 'react-native';
import {Icon} from 'react-native-elements';
import Voucher from 'voucher-code-generator';
import {geraCupom, resetResgate, report} from '../actions/AppActions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import MapView, { Marker, Callout } from 'react-native-maps';
import { showLocation } from 'react-native-map-link';
import _ from 'lodash';

class Promocao extends Component{

    constructor(props){
        super(props);

        this.state =  {
            codigo: '',
            modalVisible: false,
            mapaVisible: false,
            reportVisible: false,
            renderPlaceholderOnly: true,
            favorite:false,
            region: {
                latitude: this.props.promo.placeObj.latitude,
                longitude: this.props.promo.placeObj.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            latlng: {
                latitude:this.props.promo.placeObj.latitude,
                longitude:this.props.promo.placeObj.longitude
            },
            reportTxt:'',
            marginVerticalModal: new Animated.Value(80)
        };
    }

    componentWillReceiveProps(nextProps){
        this.setModalVisible(nextProps.geraCupomStatus);
    }

    componentWillMount() {
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
    }
    
    componentWillUnmount() {
        this.keyboardDidShowSub.remove()
        this.keyboardDidHideSub.remove()
    }

    keyboardDidShow = event => {
        Animated.timing(                  // Animate over time
            this.state.marginVerticalModal,            // The animated value to drive
            {
              toValue: 40,                   // Animate to opacity: 1 (opaque)
              duration: 0,                // Make it take a while
            }
          ).start();
    }

    keyboardDidHide = event => {
        Animated.timing(                  // Animate over time
            this.state.marginVerticalModal,            // The animated value to drive
            {
              toValue: 80,                   // Animate to opacity: 1 (opaque)
              duration: 0,              // Make it take a while
            }
          ).start();
    }
    

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
          this.setState({
            renderPlaceholderOnly: false,
          });
        });

      }
   
    renderResgatar(alreadyHave){
        if(!this.props.loginAs && !alreadyHave){
            return (
                <TouchableOpacity onPress={() => this.geraCodigo()}>
                    <Icon name='receipt' color='#b30404' size={24} />
                    <Text style={styles.tabTxt}>RESGATAR</Text>
                </TouchableOpacity>
            );
        }else{

            let msg = 'Apenas Clientes podem resgatar cupons.';

            if(!this.props.loginAs && alreadyHave){
                msg = 'Você já resgatou esse cupom.';
            }

            return (
                <TouchableOpacity onPress={() => Alert.alert(
                    'Alerta',
                    msg,
                    [
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                  )}>
                    <Icon name='receipt' color='#333' size={24} />
                    <Text style={[styles.tabTxt,{color: '#333'}]}>RESGATAR</Text>
                </TouchableOpacity>
            );
        }
    }

    calculaPreco(){
        let { valorInicialPromo, descontoPromo } = this.props.promo;
        return valorInicialPromo - ((valorInicialPromo * descontoPromo) / 100);
    }

    comoChegar(){
        showLocation({
            latitude: this.props.promo.placeObj.latitude,
            longitude: this.props.promo.placeObj.longitude,
            title: this.props.promo.placeObj.address,
        });
    }

    geraCodigo(){
        let codigo = Voucher.generate({
            length: 8,
            count: 1,
            charset: Voucher.charset("alphabetic")
        });

        codigo = codigo.toString().toUpperCase();

        this.setState({codigo});
        
        this._geraCupom(codigo);
    }

    _geraCupom(codigo){

        const { promo
        } = this.props;

        this.props.geraCupom({
            promo,
            codigo
        });
    }

    setModalVisible(status){
        this.setState({modalVisible: status});
    }

    setMapaVisible(status){
        this.setState({mapaVisible: status});
    }

    setReportVisible(status){
        this.setState({reportVisible: status});
    }

    setFavorite(favorite){
        this.setState({favorite});
    }

    _report(){
        this.props.report(this.props.promo);
    }

    renderCateg(){
        let categs = this.props.promo.stringCateg.split(',');
        let str = '';

        categs.forEach((element,i) => {

            let categ = '';

            switch(element){
                case 'gastronomia': categ = 'Gastronomia'; break;
                case 'bemestar': categ = 'Bem-Estar'; break;
                case 'cultura': categ = 'Cultura'; break;
                case 'mercados': categ = 'Mercados'; break;
                case 'servicos': categ = 'Serviços'; break;
                case 'esportelazer': categ = 'Esporte e Lazer'; break;
                case 'saudebeleza': categ = 'Saúde e Beleza'; break;
                default: categ = '';
            }

            if(i == categs.length - 1){
                str = `${str} | ${categ}`;
            }else{
                str = `${categ}`
            }
            
        });

        return (<Text style={styles.txtBasico}>{str}</Text>);
    }

    renderDias(){
        let dias = this.props.promo.diasValidosPromo;
        let diasArray = [];

        dias.forEach((element,i) => {

            let estilo = element.isValid ? styles.txtDiaValid : styles.txtDia;

            diasArray.push(
                <Text key={element.key} style={estilo}>{element.dia}</Text>
            )
        });

        return diasArray;
    }

    render(){
        const app = this;
        const sizeStar = 14;
        const favIcon = this.state.favorite ? 'favorite' : 'favorite-border';
        let alreadyHave = false;

        const {marginVerticalModal} = this.state;

        if(this.props.cupons.length){
            alreadyHave = this.props.cupons.some((cupom) => { //alreadyHave se true signigica que ele já tem esse cupom na carteira, logo devemos desabilitar o botao
                if(cupom.promo.uid == app.props.promo.uid){
                    return true; //signigica que existe pelo menos um cupom nas maos desse cliente que bate com essa promoção que ele está visualizando agora.
                }else{
                    return false;
                }
            });
        }
        
        if(!this.state.renderPlaceholderOnly){
            return (
                <View>
                <ScrollView contentContainerStyle={styles.meio}>
                
                    <Image source={{uri: this.props.promo.imageURL}} style={{alignSelf: 'stretch',width: null, height: 200}}/>
                        
                    <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'flex-start', alignSelf:'stretch', marginBottom: 10}}>
                        <View style={styles.boxAvatar}>
                            <Image source={{uri: this.props.promo.estabImageURL}} style={{width:100, height: 100}}/>
                        </View>
    
                        <View style={{alignSelf: 'stretch', alignItems: 'flex-start', justifyContent: 'space-between'}}>
                            <Text style={styles.estab}>{this.props.promo.nomeEstab}</Text>
    
                            {this.renderCateg()}
    
                            <View style={{flexDirection: 'row', alignSelf:'stretch'}}>
                                <Text style={[styles.txtBasico, {marginRight: 10}]}>Dias Válidos:</Text>
                                <View style={{flexDirection: 'row'}}>
                                    {this.renderDias()}
                                </View>
                            </View>
    
                            <View style={{flexDirection:'row', alignItems: 'center',justifyContent:'flex-start', alignSelf: 'stretch',marginHorizontal: 5}}>
                                <Icon name='star' color='#AE0505' size={sizeStar}/>
                                <Icon name='star' color='#AE0505' size={sizeStar}/>
                                <Icon name='star' color='#AE0505' size={sizeStar}/>
                                <Icon name='star' color='#AE0505' size={sizeStar}/>
                                <Icon name='star' color='#999' size={sizeStar}/>
                            </View>
                        </View>
                    </View>
    
                    <View style={{flexDirection: 'row', alignSelf: 'stretch', backgroundColor: '#ededed',padding: 5, marginBottom: 70 }}>
                        <View style={{backgroundColor: '#b30404', padding: 10, alignItems: 'center', justifyContent: 'center', flex:1}}>
                            <Text style={styles.desc}>{this.props.promo.descontoPromo}%</Text>
                            <Text style={styles.deDesconto}>de desconto</Text>
                        </View>
    
                        <View style={{alignItems:'center', justifyContent:'space-around', flex:1, padding:5}}>
                            <Text>de R$: <Text style={{fontSize: 24, textDecorationLine: 'line-through'}}>{this.props.promo.valorInicialPromo},00</Text></Text>
                            <Text>por R$: <Text style={{fontSize: 24, color: '#b30404', fontFamily: 'segoeuib'}}>{this.calculaPreco()},00</Text></Text>
                        </View>
    
                        <View style={{alignItems: 'center', justifyContent:'flex-start', flex:2}}>
                            <Text style={styles.estab}>{this.props.promo.nomePromo}</Text>
                            <Text style={[styles.txtBasico, {alignSelf: 'stretch', textAlign: 'left'}]}>{this.props.promo.descricaoPromo}</Text>
                        </View>
                    </View>
                        
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalVisible}
    
                        onRequestClose={() => this.setModalVisible(!this.state.modalVisible)}
                        >
                        <View style={{ padding:40,flex:1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center'}}>
                        </View>
                    </Modal>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        backgroundColor="transparent"
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            this.props.resetResgate();
                            this.setModalVisible(!this.state.modalVisible)
                        }}
                        >
                        <View style={{ padding:40,flex:1, backgroundColor: 'rgba(0, 0, 0, 0)', justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{backgroundColor:'#fff', borderRadius: 5, padding: 20, borderColor: '#881518', borderWidth: 1, borderStyle: 'solid', alignSelf: 'stretch'}}>
                                <TouchableOpacity onPress={() => {this.props.resetResgate();this.setModalVisible(false)}}>
                                    <Icon name='close'  underlayColor="#999" containerStyle={{borderRadius: 5, alignSelf: 'flex-end'}}/>
                                </TouchableOpacity>
                                
                                <Text style={{marginBottom: 20, fontSize: 24,textAlign: 'center'}}>Cupom resgatado e adicionado em sua lista!</Text>
    
                                <TouchableOpacity onPress={() => {
                                    this.setModalVisible(false);
                                    this.props.resetResgate();
                                    Actions.cuponsPerfil();} }>
                                    <Text style={styles.btnVoltar}>Meus Cupons</Text>
                                </TouchableOpacity>
                            </View>                     
                        </View>
                    </Modal>

                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.mapaVisible}
    
                        onRequestClose={() => this.setModalVisible(!this.state.mapaVisible)}
                        >
                        <View style={{ padding:40,flex:1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center'}}>
                        </View>
                    </Modal>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        backgroundColor="transparent"
                        visible={this.state.mapaVisible}
                        onRequestClose={() => {
                            this.props.resetResgate();
                            this.setMapaVisible(!this.state.mapaVisible)
                        }}
                        >
                        <View style={{ marginHorizontal:35,marginVertical: 80,flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'flex-start', padding: 10}}>
                            <View style={styles.mapBox}>
                                <MapView
                                    style={styles.map}
                                    region={this.state.region}
                                    ref={map => { this.map = map }}
                                    rotateEnabled={false}
                                    minZoomLevel={15}
                                    maxZoomLevel={18}
                                >
                                    <Marker pinColor='#ff9900' coordinate={this.state.latlng}/>
                                </MapView>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 10}}>
                                <TouchableOpacity style={[styles.btnModalMapa, { marginRight: 5}]} onPress={() => this.comoChegar()}>
                                    <Text style={styles.btnModalMapaTxt}>Como chegar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.btnModalMapa, { marginLeft: 5}]} onPress={() => this.setMapaVisible(false)}>
                                    <Text style={styles.btnModalMapaTxt}>Fechar</Text>
                                </TouchableOpacity>
                                  
                            </View>         
                        </View>
                    </Modal>


                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.reportVisible}
    
                        onRequestClose={() => this.setReportVisible(!this.state.reportVisible)}
                        >
                        <View style={{ padding:40,flex:1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center'}}>
                        </View>
                    </Modal>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        backgroundColor="transparent"
                        visible={this.state.reportVisible}
                        onRequestClose={() => {
                            this.props.resetResgate();
                            this.setReportVisible(!this.state.reportVisible)
                        }}
                        >
                        <Animated.View style={{ marginHorizontal:35,marginVertical: marginVerticalModal,flex:1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'flex-start', padding: 10}}>
                            <View style={styles.mapBox}>
                                <Text style={{fontFamily:'segoeuiz', fontSize:18, marginBottom:10}}>Ocorreu algum problema com a promoção?</Text>
                                <TextInput 
                                    placeholder='Fale conosco sobre incoerência nas informações, conteúdo imprópio ou mau atendimento, por exemplo.'
                                    placeholderTextColor='#666'
                                    multiline
                                    value={this.state.reportTxt}
                                    onChangeText={(reportTxt) => this.setState({reportTxt})}
                                    style={{flex: 1, textAlign:'left', backgroundColor:'#ededed', alignSelf:'stretch', textAlignVertical:'top', fontFamily:'segoeui'}}
                                    // onFocus={() => this.keyboardDidShow()}
                                    // onBlur={() => this.keyboardDidHide()}
                                />
                                
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 10}}>
                                <TouchableOpacity style={[styles.btnModalMapa, { marginRight: 5}]} onPress={() => this._report()}>
                                    <Text style={styles.btnReportar}>Reportar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.btnModalMapa, { marginLeft: 5}]} onPress={() => this.setReportVisible(false)}>
                                    <Text style={styles.btnModalMapaTxt}>Fechar</Text>
                                </TouchableOpacity>
                                  
                            </View>         
                        </Animated.View>
                    </Modal>
                </ScrollView>

                    <View style={styles.tabbar}>
                        {this.renderResgatar(alreadyHave)}
                        <TouchableOpacity onPress={() => this.setMapaVisible(true)}>
                            <Icon name='location-on' color='#b30404' size={24} />
                            <Text style={styles.tabTxt}>MAPA</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setReportVisible(true)}>
                            <Icon name='warning' color='#b30404' size={24} />
                            <Text style={styles.tabTxt}>REPORTAR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setFavorite(!this.state.favorite)}>
                            <Icon name={favIcon} color='#b30404' size={24} />
                            <Text style={styles.tabTxt}>FAVORITAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        
            );
        }else{
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size="large" color='#b30404'/>
                </View>
            );
        }

        
    }

}

const { height, width } = Dimensions.get('window');
const mapHeight = height - 110;

const mapStateToProps = state => {

    const cupons = _.map(state.AppReducer.cupons, (val, uid) => {     
        return {...val, uid}
    });

    return ({
        geraCupomStatus: state.AppReducer.geraCupomStatus,
        loginAs: state.AutenticacaoReducer.loginAs,
        promo: state.AppReducer.promo,
        cupons: _.without(cupons, undefined)
    })
} 

export default connect(
    mapStateToProps, 
    {
        geraCupom,
        resetResgate,
        report
    }
)(Promocao);

const styles = StyleSheet.create({
    tabTxt: {
        color:'#b30404',
        textAlign:'center',
        fontSize:11,
        fontFamily: 'segoeui'
    },
    tabbar: {
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        backgroundColor:'white',
        borderTopWidth:5,
        borderTopColor: '#b30404',        
        alignSelf:'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 10,
        elevation:20
    },
    btnModalMapa: {
        elevation:8,
        alignSelf:'stretch',
        flex: 1
    },
    btnModalMapaTxt: {fontFamily: 'segoeuib', fontSize:16, textAlign:'center', backgroundColor:'#ededed', color:'#333', padding: 10},
    mapBox: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    textCodigo:{
        fontSize: 30,
        color: '#881518',
        textAlign: 'center'
    },
    valorInicial:{
        fontSize:16,
        color: '#555',
        textAlign: 'right'
    },
    preco:{
        fontSize: 35,
        color: '#333',
        textAlign: 'right'
    },
    boxAvatar: { 
        elevation: 2,
        backgroundColor: '#ededed',
        width: 100, 
        height: 100, 
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 10
    },
    titulo: {
        fontSize: 30,
        color: '#333',
        fontWeight: 'bold'
    },
    estab:{
        color: '#b30404',
        fontSize: 20,
        marginHorizontal: 5,
        textAlign: 'left',
        fontFamily:'segoeuib',
        alignSelf:'stretch'
    },
    txtBasico:{
        color: '#666',
        fontSize: 16,
        marginHorizontal: 5,
        textAlign: 'center',
        fontFamily:'segoeuii'
    },
    desc:{
        fontSize:32,
        color: 'white',
        fontFamily: 'segoeuib',
        marginHorizontal: -10
    },
    deDesconto:{
        fontFamily: 'segoeuii',
        color: '#ff9900'
    },
    container: {
        justifyContent:'flex-start',
        alignItems: 'center', 
        backgroundColor: '#fff',
        flex: 1
    },
    descricao:{
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
        alignSelf: 'center',
        paddingHorizontal: 40
    },
    regula:{
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
        alignSelf: 'center',
        textDecorationLine: 'underline',
        marginBottom: 20
    },
    meio:{
        alignItems: 'center',
        padding: 8,
        backgroundColor: 'white',
    },
    btnResgatar: {
        paddingVertical: 10,
        paddingHorizontal: 100,
        backgroundColor: '#b30404',
        color: 'white',
        fontSize: 18,
        fontFamily: 'segoeuib',
        textAlign: 'center',
        elevation: 2,
        marginBottom: 60
    },
    btnVoltar:{
        paddingVertical: 10,
        alignSelf: 'stretch',
        backgroundColor: '#b30404',
        color: 'white',
        fontSize: 18,
        fontFamily: 'segoeuib',
        textAlign: 'center',
        elevation: 2,
        marginBottom: 5
    },
    btnReportar:{fontFamily: 'segoeuib', fontSize:16, textAlign:'center', backgroundColor:'#b30404', color:'#fff', padding: 10},
    txtDia: {
        backgroundColor:'#999',
        color: 'white',
        marginHorizontal: 1,
        paddingHorizontal: 5,
        paddingVertical: 0,
        fontFamily: 'segoeuib',
        fontSize: 10,
        borderRadius: 2,
    },
    txtDiaValid: {
        backgroundColor: '#b30404',
        color: 'white',
        marginHorizontal: 1,
        paddingHorizontal: 5,
        paddingVertical: 0,
        fontFamily: 'segoeuib',
        fontSize: 10,
        borderRadius: 2
    }
});