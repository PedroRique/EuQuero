const INITIAL_STATE = {
    loadingPromocoes: false,
    loadingFormPromo: false,
    menuIsOpen: false,
    nomePromo: 'Teste',
    valorInicialPromo: '100',
    descontoPromo: '20',
    descricaoPromo: 'Descrição',
    diasValidosPromo: [
        {dia: 'D', isValid: true, key: 0},
        {dia: 'S', isValid: false, key: 1},
        {dia: 'T', isValid: false, key: 2},
        {dia: 'Q', isValid: false, key: 3},
        {dia: 'Q', isValid: false, key: 4},
        {dia: 'S', isValid: false, key: 5},
        {dia: 'S', isValid: true, key: 6}
    ], //DOM, SEG ... SAB // 1 é Valido, 0 é Inválido
    diasChanged: true,
    isExclusive: true,
    promos: [{nomePromo: ""}],
    userLocation: {},
    filtros: { texto: '' },
    filtroTexto: '',
    cupons: [{key: ""}]
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

        case 'modifica_valor_inicial_promo':
            return { ...state, valorInicialPromo: action.payload}

        case 'modifica_desconto_promo':
            return { ...state, descontoPromo: action.payload}

        case 'modifica_descricao_promo':
            return { ...state, descricaoPromo: action.payload}
        
        case 'modifica_dias_validos':
            return { ...state, diasValidosPromo: action.payload, diasChanged: !state.diasChanged}

        case 'get_user_location':
            return { ...state, userLocation: action.payload}

        case 'modifica_filtros':
            return { ...state, filtros: action.payload}

        case 'limpa_filtros':
            return { ...state, filtros: {}}

        default: 
            return state;
    }
}