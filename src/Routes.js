import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';

import FormLogin from './components/FormLogin';
import FormCadastro from './components/FormCadastro';
import Principal from './components/Principal';
import Promocao from './components/Promocao';
import Perfil from './components/Perfil';
import FormPromo from './components/FormPromo';
import Cupons from './components/Cupons';
import MinhasPromocoes from './components/MinhasPromocoes';
import MinhaPromocao from './components/MinhaPromocao';

export default props => (
    <Router>
        <Stack key='root'>
            <Scene key='formLogin' component={FormLogin} hideNavBar/>
            <Scene key='formCadastro' component={FormCadastro} hideNavBar={false} title='Cadastro'/>
            <Scene key='principal' component={Principal} hideNavBar/>
            <Scene key='promocao' component={Promocao} hideNavBar={false} title='Promoção'/>
            <Scene key='perfil' component={Perfil} hideNavBar={false} title='Perfil'/>
            <Scene key='formPromo' component={FormPromo} hideNavBar={false} title='Nova Promoção'/>
            <Scene key='cupons' component={Cupons} hideNavBar={false} title='Meus Cupons'/>
            <Scene key='minhasPromos' component={MinhasPromocoes} hideNavBar={false} title='Minhas Promoções'/>
            <Scene key='minhaPromocao' component={MinhaPromocao} hideNavBar={false} title='Minha Promoção'/>
        </Stack>       
    </Router>
);