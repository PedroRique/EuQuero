const INITIAL_STATE = {
    nome: 'Estabelecimento',
    email: 'estab1@teste.com',
    senha: '123456',
    erroCadastro: '',
    erroLogin: '',
    sendoExibido: false,
    loadingLogin: false,
    loadingCadastro: false,
    chaveEntrada: '',
    loginAs: true, //false eh Cliente, true eh Estabelecimento
    perfilImg: '',
    chave: ''
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
            return { ...state, nome: action.payload.nome, email: action.payload.email, senha: '', erroLogin: '', erroCadastro: '', loadingLogin: false, chave: action.payload.chave}

        case 'loading_login':
            return { ...state, loadingLogin: true }
        
        case 'loading_cadastro':
            return { ...state, loadingCadastro: true }
        
        case 'modifica_login_as':
            return { ...state, loginAs: action.payload}

        case 'logout_usuario':
            return { ...state, nome: '', email: ''}

        default:
            return state;
    }

}