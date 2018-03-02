import firebase from 'firebase';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import b64 from 'base-64';
import Voucher from 'voucher-code-generator';
import _ from 'lodash';

export const modificaEmail = (texto) => {
    return {
        type: 'modifica_email',
        payload: texto
    }
}

export const modificaSenha = (texto) => {
    return {
        type: 'modifica_senha',
        payload: texto
    }
}

export const modificaNome = (texto) => {
    return {
        type: 'modifica_nome',
        payload: texto
    }
}

export const modificaCategTotal = (n) => {
    return {
        type: 'modifica_categ_total',
        payload: n
    }
}

export const modificaEndereco = (placeObj) => {
    return {
        type: 'modifica_endereco',
        payload: placeObj
    }
}

export const modificaCPF = (cpf) => {
    return {
        type: 'modifica_cpf',
        payload: cpf
    }
}

export const modificaCNPJ = (cnpj) => {
    return {
        type: 'modifica_cnpj',
        payload: cnpj
    }
}

export const cadastraUsuario = ({nome, email, senha, tipo, chaveEntrada, cpf, cnpj, endereco, placeObj, stringCateg}) => {
    return dispatch => {

        dispatch({ type: 'loading_cadastro' });

        const novaChave = geraChave();

        firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(user => {
            let emailB64 = b64.encode(email);

            let objEnvio = {nome, email, tipo, chaveEntrada, chave: novaChave};

            if(tipo == 'estab') {
                objEnvio.cnpj = cnpj;
                objEnvio.endereco = endereco;
                objEnvio.placeObj = placeObj;
                objEnvio.stringCateg = stringCateg;
            }else if(tipo == 'client'){
                objEnvio.cpf = cpf;
            }
            
            firebase.database().ref(`/contatos/${emailB64}`)
                .set(objEnvio)
                .then(value => {
                    firebase.database().ref(`chaves`).once('value')
                    .then(snapshot => {
                        if(snapshot.val() != null){
            
                            atualizaRede(snapshot.val(), chaveEntrada, novaChave, 0);
            
                            firebase.database().ref(`chaves/${novaChave}`).set({chaveEntrada, tipo});

                            cadastraUsuarioSucesso(dispatch);
            
                        }else{
                            cadastraUsuarioErro({message:"Chave de Entrada inválida"}, dispatch);
                        }
                    })
                })
                .catch((error) => {
                    cadastraUsuarioErro({message:"Chave de Entrada inválida"}, dispatch);
                })

        })
        .catch(erro => cadastraUsuarioErro(erro, dispatch)); 

    }
}

const atualizaRede = (chaves, chaveEntrada, novaChave, i) => {

    firebase.database().ref(`chaves/${chaveEntrada}/rede`).child(novaChave).set({linha: i})
    .then(() => {
        if(chaves[chaveEntrada].chaveEntrada != "VANTAGEM" && i < 3){
            atualizaRede(chaves, chaves[chaveEntrada].chaveEntrada, novaChave, ++i);
        }
    })
}

const geraChave = () => {
    let codigo = Voucher.generate({
        length: 8,
        count: 1,
        charset: Voucher.charset("alphabetic")
    });

    return codigo.toString().toUpperCase();
}

const cadastraUsuarioSucesso = (dispatch) => {
    dispatch({ type: 'cadastro_usuario_sucesso'});
    Actions.formLogin();
}

const cadastraUsuarioErro = (erro, dispatch) => {
    dispatch({ type: 'cadastra_usuario_erro', payload: erro.message });
}

export const autenticaUsuario = ({ email, senha, tipo }) => {
    return dispatch => {

        dispatch({ type: 'loading_login' });

        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(user => {

                emailUsuarioB64 = b64.encode(email);

                firebase.database().ref(`/contatos/${emailUsuarioB64}`)
                .once('value')
                .then( snapshot => {
                    if(snapshot.val().tipo !== tipo){
                        throw {message: 'Tipo errado'};
                    }
                    autenticaUsuarioSucesso(snapshot, dispatch);
                })
                .catch(erroTipo => autenticaUsuarioErro(erroTipo, dispatch));

            })
            .catch(erro => autenticaUsuarioErro(erro, dispatch));
    }
}

//autenticaUsuarioSucesso(dispatch)

const autenticaUsuarioSucesso = (snapshot, dispatch) => {
    dispatch({ type: 'login_usuario_sucesso', payload: snapshot.val()});
    Actions.promocoes();
}

const autenticaUsuarioErro = (erro, dispatch) => {
    dispatch({ type: 'login_usuario_erro', payload: erro.message });
}


export const limpaErroLogin = () => {
    return {
        type: 'login_usuario_limpa_erro_login'
    }
}

export const modificaSendoExibido = (status) => {
    return {
        type: 'modifica_sendo_exibido',
        payload: status
    }
}

export const modificaLoginAs = (newValue) => {
    
    return {
        type: 'modifica_login_as',
        payload: newValue
    }
}

export const modificaChaveEntrada = (chave) => {
    return {
        type: 'modifica_chave_entrada',
        payload: chave
    }
}

export const logoutUsuario = () => {
    return dispatch => {
        firebase.auth().signOut()
        .then(() => logoutSucesso(dispatch));       
    }
}

const logoutSucesso = (dispatch) => {

    Alert.alert(
        'Sair',
        'Você tem certeza que deseja sair?',
        [
          {text: 'Sim', onPress: () => {
            dispatch({type: 'logout_usuario'});
            Actions.formLogin();
          }},
          {text: 'Cancelar', onPress: () => false, style: 'cancel'},
        ],
        { cancelable: true }
      )
}