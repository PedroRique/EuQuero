const INITIAL_STATE = {
    nome: 'Estabelecimento',
    email: 'estab4@teste.com',
    senha: '123456',
    cnpf: '',
    cpf: '',
    endereco: '',
    placeObj: {},
    avatarURL: '',
    stringCateg: '',
    coords: {},
    erroCadastro: '',
    erroLogin: '',
    sendoExibido: false,
    loadingLogin: false,
    loadingCadastro: false,
    chaveEntrada: '',
    loginAs: true, //false eh Cliente, true eh Estabelecimento
    perfilImg: '',
    chave: '',
    categTotal: 0
}

export default (state = INITIAL_STATE, action) => {

    switch(action.type){
        case 'modifica_email':
            return { ...state, email: action.payload}

        case 'modifica_senha':
            return { ...state, senha: action.payload }

        case 'modifica_nome':
            return { ...state, nome: action.payload }

        case 'modifica_chave_entrada':
            return { ...state, chaveEntrada: action.payload}

        case 'modifica_endereco':
            return { ...state, endereco: action.payload.address, placeObj: action.payload}

        case 'modifica_cpf':
            return { ...state, cpf: action.payload}

        case 'modifica_cnpj':
            return { ...state, cnpj: action.payload}

        case 'modifica_avatar':
            return { ...state, avatarURL: action.payload}

        case 'cadastra_usuario_erro':
            return { ...state, erroCadastro: action.payload, loadingCadastro: false }

        case 'cadastro_usuario_sucesso':
            return { ...state, nome: '', senha: '', erroCadastro: '', erroLogin: '', loadingCadastro: false }
        
        case 'login_usuario_erro':
            return { ...state, erroLogin: action.payload, loadingLogin: false}

        case 'login_usuario_limpa_erro_login':
            return { ...state, erroLogin: '', alertSendoExibido: false}
        
        case 'modifica_sendo_exibido':
            return { ...state, alertSendoExibido: action.payload}

        case 'login_usuario_sucesso':
            if(action.payload.tipo == 'estab'){
                return { ...state, nome: action.payload.nome, email: action.payload.email, senha: '', erroLogin: '', erroCadastro: '', loadingLogin: false, chave: action.payload.chave, avatarURL: action.payload.avatarURL, placeObj: action.payload.placeObj, stringCateg: action.payload.stringCateg}
            }else{
                return { ...state, nome: action.payload.nome, email: action.payload.email, senha: '', erroLogin: '', erroCadastro: '', loadingLogin: false, chave: action.payload.chave, avatarURL: action.payload.avatarURL}
            }
            

        case 'loading_login':
            return { ...state, loadingLogin: true }
        
        case 'loading_cadastro':
            return { ...state, loadingCadastro: true }
        
        case 'modifica_login_as':
            return { ...state, loginAs: action.payload}

        case 'logout_usuario':
            return { ...state, nome: '', email: ''}

        case 'modifica_categ_total':
            return { ...state, categTotal: action.payload}

        default:
            return state;
    }

}