import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import { loadUser } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';

const App = () => {
	useEffect(() => {
		// check for token in Local Storage in browser
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		store.dispatch(loadUser());
		// log user out from all tabs if they log out in one tab
		/* 	window.addEventListener('storage', () => {
			if (!localStorage.token) return store.dispatch({ type: LOGOUT });
		}); */
	}, []);

	return (
		<Provider store={store}>
			<BrowserRouter>
				<Fragment>
					<NavBar />
					<Switch>
						<Route exact path='/' component={Landing} />
						<Route component={Routes} />
					</Switch>
				</Fragment>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
