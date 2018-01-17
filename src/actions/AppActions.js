import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';
import b64 from 'base-64';
import { Actions } from 'react-native-router-flux';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export const listaPromocoes = (status) => {

    return {
        type: 'lista_promocoes_sucesso',
        payload: status
    }
}

export const toggleMenu = () => {
    return {
        type: 'toggle_menu'
    }
}

export const atualizaIsOpen = (isOpen) => {
    return {
        type: 'atualiza_is_open',
        payload: isOpen
    }
}

export const modificaNomePromo = (texto) => {
    return {
        type: 'modifica_nome_promo',
        payload: texto
    }
}

export const modificaTipoPromo = () => {
    return {
        type: 'modifica_tipo_promo'
    }
}

export const savePromo = ({nomePromo, isExclusive, currentUser, nomeEstab, valorInicialPromo, descontoPromo, descricaoPromo, diasValidosPromo, uri, imageURL, imageKey}) => {

    return dispatch => {

        dispatch({ type: 'loading_save_promo' });

        const emailEstab = currentUser.email;
        emailEstabB64 = b64.encode(emailEstab);
        
        let estabImageURL;

        firebase.storage().ref(`/images/avatars/${emailEstabB64}`).getDownloadURL()
            .then((url) => {
                estabImageURL = url;
                firebase.database().ref(`/promocoes_estab/${emailEstabB64}`)
                .push({nomePromo, isExclusive, emailEstab, emailEstabB64, nomeEstab, valorInicialPromo, descontoPromo, descricaoPromo,diasValidosPromo, imageURL, imageKey, estabImageURL})
                .once('value')
                .then(() => {
    
                    firebase.database().ref(`/promocoes`)
                        .push({nomePromo, isExclusive, emailEstab, emailEstabB64, nomeEstab, valorInicialPromo, descontoPromo, descricaoPromo, diasValidosPromo, imageURL, imageKey, estabImageURL})
                        .once('value')
                        .then(() => {
                            Actions.principal();
                            dispatch({ type: 'loading_save_promo' });
                        })
                        .catch(() => {
                            dispatch({ type: 'loading_save_promo' });
                        })
     
                })
                .catch(() => {
                    dispatch({ type: 'loading_save_promo' });
                })
            }).catch((e) => {
                console.log(e);
                dispatch({ type: 'loading_save_promo' });
            });
        
        

        
    }

}

export const listaPromoFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        currentEmail = currentUser ? currentUser.email : 'teste3@teste.com';
        let emailEstabB64 = b64.encode(currentEmail);

        firebase.database().ref(`/promocoes`)
            .on('value', snapshot => {
                dispatch({ type: 'lista_promos', payload: snapshot.val()})
            });

    }
}

export const listaCuponsFetch = () => {
    const { currentUser } = firebase.auth();

    return(dispatch) => {
        currentEmail = currentUser ? currentUser.email : 'teste3@teste.com';
        let emailUserB64 = b64.encode(currentEmail);

        firebase.database().ref(`/cupons/${emailUserB64}`)
            .on('value', snapshot => {
                dispatch({ type: 'lista_cupons', payload: snapshot.val()})
            })
    }
}

export const modificaValorInicialPromo = (valor) => {
    return {
        type: 'modifica_valor_inicial_promo',
        payload: valor
    }
}

export const modificaDescontoPromo = (desc) => {
    return {
        type: 'modifica_desconto_promo',
        payload: desc
    }
}

export const modificaDescricaoPromo = (desc) => {
    return {
        type: 'modifica_descricao_promo',
        payload: desc
    }
}

export const modificaDiasValidos = (dias) => {
    return {
        type: 'modifica_dias_validos',
        payload: dias
    }
}

export const getUserLocation = () => {

    return dispatch => {

        // navigator.geolocation.getCurrentPosition((position) => {alert(position)}, (error) => {alert(error)}, {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000});

        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                dispatch({
                    type: 'get_user_location',
                    payload: position
                })
            },
            (error) => {
                dispatch({
                    type: 'get_user_location_error',
                    payload: error
                })
            }, 
            {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
        )
    }

}

export const modificaFiltros = (filtro) => {
    return {
        type: 'modifica_filtros',
        payload: {texto: filtro}
    }
}

export const limpaFiltros = () => {
    return {
        type: 'limpa_filtros'
    }
}

export const contaRede = () => {

    return dispatch => {
        let chave = 'KPRMNBXP';
        firebase.database().ref(`chaves/${chave}`).once('value')
        .then(snapshot => {

            var arr = [0,0,0];
            const data = snapshot.val();
            Object.keys(data.rede).map(
                function(a,b){
                    var x = data.rede[a].linha;
                    
                    switch(x){
                        case 0:
                            arr[0]++;
                            break;
                        case 1:
                            arr[1]++;
                            break;
                        case 2:
                            arr[2]++;
                            break;
                    }       
            });

            alert(arr[0] + ',' + arr[1] + ',' + arr[2]);
            dispatch({type: 'conta_rede_sucesso'});
        })
        .catch(error => {
            alert('e');
            console.log(error);
            dispatch({type: 'conta_rede_sucesso'});
        })
    }
    
}