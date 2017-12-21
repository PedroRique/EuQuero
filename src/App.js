import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

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
		//firebase.initializeApp(config);

		if (!firebase.apps.length) {
			firebase.initializeApp(config);
		}
		
	}

	render(){
		return(
			<Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
				<Routes />
			</Provider>
		);
	}

} 
