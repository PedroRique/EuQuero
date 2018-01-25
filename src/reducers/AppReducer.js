const INITIAL_STATE = {
    loadingPromocoes: false,
    loadingFormPromo: false,
    menuIsOpen: false,
    nomePromo: '',
    valorInicialPromo: '',
    descontoPromo: '',
    descricaoPromo: '',
    diasValidosPromo: [
        {dia: 'D', isValid: false, key: 0},
        {dia: 'S', isValid: false, key: 1},
        {dia: 'T', isValid: false, key: 2},
        {dia: 'Q', isValid: false, key: 3},
        {dia: 'Q', isValid: false, key: 4},
        {dia: 'S', isValid: false, key: 5},
        {dia: 'S', isValid: false, key: 6}
    ], //DOM, SEG ... SAB // 1 é Valido, 0 é Inválido
    diasChanged: true,
    isExclusive: true,
    dataIni: '',
    dataFim: '',
    promos: [{nomePromo: ""}],
    minhasPromos: [{nomePromo: ""}],
    userLocation: {},
    filtros: { texto: '' },
    filtroTexto: '',
    cupons: [],
    validaErro: ''
};

export default (state = INITIAL_STATE, action) => {

    switch(action.type){
        case 'lista_promocoes_sucesso':
            return { ...state, loadingPromocoes: action.payload}

        case 'nova_promocao_sucesso':
            return { ...state, loadingFormPromo: action.payload}

        case 'toggle_menu':
            return{ ...state, menuIsOpen: !state.menuIsOpen}
            
        case 'atualiza_is_open':
            return { ...state, menuIsOpen: action.payload}

        case 'modifica_nome_promo':
            return { ...state, nomePromo: action.payload}
        
        case 'modifica_tipo_promo':
            return { ...state, isExclusive: !state.isExclusive}

        case 'loading_save_promo':
            return { ...state, loadingFormPromo: !state.loadingFormPromo}

        case 'lista_promos':
            return { ...state, promos: action.payload}

        case 'lista_cupons':
            return {...state, cupons: action.payload}
        
        case 'lista_minhas_promos':
            return {...state, minhasPromos: action.payload}

        case 'modifica_valor_inicial_promo':
            return { ...state, valorInicialPromo: action.payload}

        case 'modifica_desconto_promo':
            return { ...state, descontoPromo: action.payload}

        case 'modifica_descricao_promo':
            return { ...state, descricaoPromo: action.payload}

        case 'modifica_data_ini':
            return { ...state, dataIni: action.payload}

        case 'modifica_data_fim':
            return { ...state, dataFim: action.payload}
        
        case 'modifica_dias_validos':
            return { ...state, diasValidosPromo: action.payload, diasChanged: !state.diasChanged}

        case 'get_user_location':
            return { ...state, userLocation: action.payload}

        case 'modifica_filtros':
            return { ...state, filtros: action.payload}

        case 'limpa_filtros':
            return { ...state, filtros: {}}

        case 'gera_cupom':
            return { ...state};
        
        case 'gera_cupom_erro':
            return { ...state};
        
        case 'valida_cupom':
            return { ...state};
        
        case 'valida_cupom_erro':
            return { ...state, validaErro: action.payload};

        default: 
            return state;
    }
}