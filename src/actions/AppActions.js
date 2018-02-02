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

export const modificaDataIni = (dataIni) => {
    return {
        type: 'modifica_data_ini',
        payload: dataIni
    }
}

export const modificaDataFim = (dataFim) => {
    return {
        type: 'modifica_data_fim',
        payload: dataFim
    }
}

export const savePromo = ({nomePromo, isExclusive, currentUser, nomeEstab, valorInicialPromo, descontoPromo, descricaoPromo, diasValidosPromo, dataIni, dataFim, uri, imageURL, imageKey}) => {

    return dispatch => {

        dispatch({ type: 'loading_save_promo' });

        const emailEstab = currentUser.email;
        emailEstabB64 = b64.encode(emailEstab);

        const numeroCupons = {
            ativos: 0,
            utilizados: 0,
            total: 0
        }
        
        let estabImageURL;

        firebase.storage().ref(`/images/avatars/${emailEstabB64}`).getDownloadURL()
            .then((url) => {
                estabImageURL = url;
                firebase.database().ref(`/promocoes_estab/${emailEstabB64}`)
                .push({nomePromo, isExclusive, emailEstab, emailEstabB64, nomeEstab, valorInicialPromo, descontoPromo, descricaoPromo,diasValidosPromo, dataIni, dataFim, imageURL, imageKey, estabImageURL, numeroCupons})
                .once('value')
                .then((data) => {
    
                    firebase.database().ref(`/promocoes/${data.key}`)
                        .set({nomePromo, isExclusive, emailEstab, emailEstabB64, nomeEstab, valorInicialPromo, descontoPromo, descricaoPromo, diasValidosPromo, dataIni, dataFim, imageURL, imageKey, estabImageURL, numeroCupons})
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
                dispatch({ type: 'loading_save_promo' });
            });
    }

}

export const listaPromoFetch = () => {
    return (dispatch) => {
        firebase.database().ref(`/promocoes`)
            .on('value', snapshot => {
                dispatch({ type: 'lista_promos', payload: snapshot.val()})
            });
    }
}

export const listaPromosFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        currentEmail = currentUser ? currentUser.email : 'teste3@teste.com';
        let emailEstabB64 = b64.encode(currentEmail);

        firebase.database().ref(`/promocoes_estab/${emailEstabB64}`)
            .on('value', snapshot => {
                dispatch({ type: 'lista_minhas_promos', payload: snapshot.val()})
            });
    }
}

export const geraCupom = ({item, codigo}) => {
    return dispatch => {

        const { currentUser } = firebase.auth();

        currentEmail = currentUser ? currentUser.email : 'teste3@teste.com';
        let emailClientB64 = b64.encode(currentEmail);

        firebase.database().ref(`/cupons/${codigo}`).set({promo:item, codigo, emailClientB64}).then(data => {

            firebase.database().ref(`/cupons_client/${emailClientB64}/${codigo}`).set({promo: item, codigo, emailClientB64}).then(data2 => {
                
                firebase.database().ref(`/promocoes_estab/${item.emailEstabB64}/${item.uid}/cupons/${codigo}`).set({promo: item, codigo, emailClientB64}).then(() =>{

                    firebase.database().ref(`/promocoes_estab/${item.emailEstabB64}/${item.uid}/numeroCupons`)    
                    .transaction((n) => {
                        if(n != null){
                            n.ativos++;
                            n.total++;
                            return n;
                        }else{
                            return 0;
                        }
                    },
                    (error, committed, snapshot) => {
                        if (error) {
                            dispatch({type: 'gera_cupom_erro'});
                        } else if (!committed) {
                            dispatch({type: 'gera_cupom_erro'});
                        } else {
                            dispatch({type: 'gera_cupom'});
                        }
                    },true);
                    
                }).catch(() => {
                    dispatch({type: 'gera_cupom_erro'});
                })
                
            }).catch( () => {
                dispatch({type: 'gera_cupom_erro'});
            })

        }).catch(() => {
            dispatch({ type: 'gera_cupom_erro'});
        });

    }
}

export const validarCupom = ({item, codigo}) => {

    return dispatch => {

        firebase.database().ref(`/promocoes_estab/${item.emailEstabB64}/${item.uid}/cupons/${codigo}`).once('value').then(snapshot => {
            if(snapshot.val() != null){

                firebase.database().ref(`/promocoes_estab/${item.emailEstabB64}/${item.uid}/cupons/${codigo}`).remove();
                firebase.database().ref(`/cupons_client/${snapshot.val().emailClientB64}/${codigo}`).remove();

                firebase.database().ref(`/promocoes_estab/${item.emailEstabB64}/${item.uid}/numeroCupons`)
                .transaction((n) => {
                    if(n != null){
                        n.ativos--;
                        n.utilizados++;
                        return n;
                    }else{
                        return 0;
                    }
                },
                (error, committed, snapshot) => {
                    if (error) {
                        dispatch({type: 'valida_cupom_erro'});
                    } else if (!committed) {
                        dispatch({type: 'valida_cupom_erro'});
                    } else {
                        dispatch({type: 'valida_cupom'});
                    }
                },true);
                
            }else{
                dispatch({type: 'valida_cupom_erro', payload: 'Cupom inexistente!'});
            }
        }).catch(()=>{
            dispatch({type: 'valida_cupom_erro', payload: 'Ocorreu um erro!'});
        })
    }

}

export const resetValidacao = () => {
    
    Actions.minhasPromos();
    
    return{
        type: 'reset_validacao'
    }

}

export const resetResgate = () => {
    
    return{
        type: 'reset_resgate'
    }
}

export const listaCuponsFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        currentEmail = currentUser ? currentUser.email : 'teste3@teste.com';
        let emailUserB64 = b64.encode(currentEmail);

        firebase.database().ref(`/cupons_client/${emailUserB64}`)
            .on('value', snapshot => {
                dispatch({ type: 'lista_cupons', payload: snapshot.val()})
            });
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

export const contaRede = (chave) => {

    return dispatch => {
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
            dispatch({type: 'conta_rede_sucesso', payload: arr});
        })
        .catch(error => {
            dispatch({type: 'conta_rede_erro'});
        })
    }
    
}

export const modificaCoords = (coords) => {
    return {
        type: 'modifica_coords',
        payload: coords
    }
}