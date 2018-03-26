const INITIAL_STATE = {
    loadingPromocoes: true,
    loadingMinhasPromocoes: true,
    loadingFormPromo: false,
    loadingCupons: true,
    menuIsOpen: false,
    nomePromo: '',
    valorInicialPromo: '',
    descontoPromo: '',
    descricaoPromo: '',
    regulamentoPromo: '',
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
    promos: [{nomePromo: "", stringCateg:"", initial: true}],
    minhasPromos: [{nomePromo: ""}],
    userLocation: {},
    filtrosTexto: { texto: '', categs: []},
    filtros: { categs: [], diasValidos: [], distancia: 10, stringCateg: '',diasValidosContador:0},
    pesquisa: '',
    recentes: [],
    cupons: [],
    validaErro: '',
    rede: [0,0,0],
    validaCupomStatus: false,
    geraCupomStatus: false,
    userCoords: {},
    categs: [
        { id: 'gastronomia', name: 'Gastronomia', status: false, icon: 'restaurant-menu', key: 0},
        { id: 'bemestar', name: 'Bem-Estar', status: false, icon: 'favorite', key: 1 },
        { id: 'cultura', name: 'Cultura', status: false, icon: 'theaters', key: 2 },
        { id: 'mercados', name: 'Mercados', status: false, icon: 'shopping-cart', key: 3 },
        { id: 'servicos', name: 'Serviços', status: false, icon: 'work', key: 4 },
        { id: 'esportelazer', name: 'Esporte e Lazer', status: false, icon: 'fitness-center', key: 5 },
        { id: 'saudebeleza', name: 'Saúde e Beleza', status: false, icon: 'local-hospital', key: 6 }
    ],
    promo: {}
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
            return { ...state, promos: action.payload, loadingPromocoes: false}

        case 'lista_cupons':
            return {...state, cupons: action.payload, loadingCupons: false}
        
        case 'lista_minhas_promos':
            return {...state, minhasPromos: action.payload, loadingMinhasPromocoes: false}

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

        case 'modifica_regulamento':
            return { ...state, regulamentoPromo: action.payload}

        case 'get_user_location':
            return { ...state, userLocation: action.payload}

        case 'modifica_filtros_texto':
            return { ...state, filtros: action.payload}

        case 'limpa_filtros':
            return { ...state, filtros: {}}

        case 'gera_cupom':
            return { ...state, geraCupomStatus: true};
        
        case 'gera_cupom_erro':
            return { ...state, geraCupomStatus: false};
        
        case 'valida_cupom':
            return { ...state, validaCupomStatus: true};
        
        case 'valida_cupom_erro':
            return { ...state, validaErro: action.payload, validaCupomStatus: false};

        case 'conta_rede_sucesso':
            return { ...state, rede: action.payload}
        
        case 'reset_validacao':
            return { ...state, validaCupomStatus: false}

        case 'reset_resgate':
            return { ...state, geraCupomStatus: false}

        case 'modifica_coords': 
            return { ...state, userCoords: action.payload}

        case 'modifica_filtros':
            return { ...state, filtros: action.payload}

        case 'modifica_pesquisa':
            return { ...state, pesquisa: action.payload}

        case 'lista_recentes':
            return { ...state, recentes: action.payload}

        case 'modifica_promo_atual':
            return { ...state, promo: action.payload}
        
        default: 
            return state;
    }
}