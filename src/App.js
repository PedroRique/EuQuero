import React, { Component } from 'react';
import { StatusBar} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import SplashScreen from 'react-native-splash-screen';

import Routes from './Routes';
import reducers from './reducers';

export default class App extends Component{
	
	componentWillMount(){
		var config = {
			apiKey: "AIzaSyA1JiyMJSFtSJ5tPEsrpMsGMpyyaX5pWBQ",
			authDomain: "euquerovantagens.firebaseapp.com",
			databaseURL: "https://euquerovantagens.firebaseio.com",
			projectId: "euquerovantagens",
			storageBucket: "euquerovantagens.appspot.com",
			messagingSenderId: "314049588599"
		  };

		if (!firebase.apps.length) {
			firebase.initializeApp(config);
		}
	}

	componentDidMount(){
		SplashScreen.hide();
	}

	render(){
		return(
			<Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
				<Routes />
			</Provider>
		);
	}

} 
