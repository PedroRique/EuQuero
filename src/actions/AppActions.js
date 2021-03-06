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

export const modificaRegulamentoPromo = (regulamento) => {
    return{
        type: 'modifica_regulamento',
        payload: regulamento
    }
}

export const savePromo = ({nomePromo, currentUser, nomeEstab, valorInicialPromo, descontoPromo, descricaoPromo, diasValidosPromo, dataIni, dataFim, uri, imageURL, imageKey, placeObj, stringCateg, regulamentoPromo}) => {

    return dispatch => {

        dispatch({ type: 'loading_save_promo' });

        const emailEstab = currentUser.email;
        emailEstabB64 = b64.encode(emailEstab);

        const numeroCupons = {
            ativos: 0,
            utilizados: 0,
            total: 0
        }

        let objEnvio = {nomePromo, emailEstab, emailEstabB64, nomeEstab, valorInicialPromo, descontoPromo, descricaoPromo,diasValidosPromo, dataIni, dataFim, imageURL, imageKey, numeroCupons, placeObj, stringCateg, regulamentoPromo};

        firebase.storage().ref(`/images/avatars/${emailEstabB64}`).getDownloadURL()
            .then((url) => {
                objEnvio.estabImageURL = url;

                firebase.database().ref(`/promocoes_estab/${emailEstabB64}`)
                .push(objEnvio)
                .once('value')
                .then((data) => {
    
                    firebase.database().ref(`/promocoes/${data.key}`)
                        .set(objEnvio)
                        .then(() => {
                            Actions.pop();
                            dispatch({ type: 'loading_save_promo' });
                        })
                        .catch((e) => {
                            dispatch({ type: 'loading_save_promo' });
                        })
     
                })
                .catch((e) => {
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

export const geraCupom = ({promo, codigo}) => {
    return dispatch => {

        const { currentUser } = firebase.auth();

        currentEmail = currentUser ? currentUser.email : 'teste3@teste.com';
        let emailClientB64 = b64.encode(currentEmail);

        let objEnvio = {promo, codigo, emailClientB64};

        objEnvio.dataResgate = new Date().toLocaleString();

        firebase.database().ref(`/cupons/${codigo}`).set(objEnvio).then(data => {

            firebase.database().ref(`/cupons_client/${emailClientB64}/${codigo}`).set(objEnvio).then(data2 => {
                
                firebase.database().ref(`/promocoes_estab/${promo.emailEstabB64}/${promo.uid}/cupons/${codigo}`).set(objEnvio).then(() =>{

                    firebase.database().ref(`/promocoes_estab/${promo.emailEstabB64}/${promo.uid}/numeroCupons`)    
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

                const emailClientB64 = snapshot.val().emailClientB64;
                const dataUso = new Date();

                firebase.database().ref(`/promocoes_estab/${item.emailEstabB64}/${item.uid}/cupons/${codigo}/valido`).set(false);
                firebase.database().ref(`/cupons_client/${emailClientB64}/${codigo}/valido`).set(false);
                firebase.database().ref(`/promocoes_estab/${item.emailEstabB64}/${item.uid}/cupons/${codigo}/dataUso`).set(dataUso.toString());
                firebase.database().ref(`/cupons_client/${emailClientB64}/${codigo}/dataUso`).set(dataUso.toString());

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

export const modificaPesquisa = (text) => {
    return {
        type: 'modifica_pesquisa',
        payload: text
    }
}

export const getUserLocation = () => {

    return dispatch => {

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

export const modificaFiltrosTexto = (filtro) => {
    return {
        type: 'modifica_filtros_texto',
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

export const modificaFiltros = (filtros) => {
    return {
        type: 'modifica_filtros',
        payload: filtros
    }
}

export const modificaPromoAtual = (promo) => {
    return {
        type: 'modifica_promo_atual',
        payload: promo
    }
}

export const report = (promo) => {
    return dispatch => {
        const email = firebase.auth().currentUser.email;
        emailB64 = b64.encode(email);
        let dataReport = new Date();

        firebase.database().ref(`/reports/${promo.emailEstabB64}/${promo.uid}`).push({promo, emailB64, dataReport})
        .then((data) => {
            dispatch({type: 'report_success'});
        }).catch((e) => {
            dispatch({type: 'report_error'});
        });
    }
}

export const saveRecent = (promo) => {
    return dispatch => {
        const email = firebase.auth().currentUser.email;
        emailB64 = b64.encode(email);

        firebase.database().ref(`/contatos/${emailB64}/recents/${promo.uid}`).set(promo)
        .then((data) => {
            dispatch({type: 'save_recent_success'});
        }).catch((e) => {
            dispatch({type: 'save_recent_error'});
        })
    }
}

export const listaRecentesFetch = () => {
    return dispatch => {
        const email = firebase.auth().currentUser.email;
        emailB64 = b64.encode(email);

        firebase.database().ref(`/contatos/${emailB64}/recents`).on('value', snapshot => {
            dispatch({ type: 'lista_recentes', payload: snapshot.val()})
        });

    }
}

export const removeRecente = (uid) => {
    return dispatch => {
        const email = firebase.auth().currentUser.email;
        emailB64 = b64.encode(email);
        firebase.database().ref(`/contatos/${emailB64}/recents/${uid}`).remove();

        dispatch({type: 'remove_recente'});
    }
}