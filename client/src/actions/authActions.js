import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT
} from './constants';
import { setAlert } from './alertAction';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';
/* import api from '../utils/api';
 */
// Load User
export const loadUser = () => async (dispatch) => {

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	} 
	try {
		const res = await axios.get('/api/auth');
		console.log(res.data);
		dispatch({
			type: USER_LOADED,
			payload: res.data
		});
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.message, 'danger')));
		}
		dispatch({
			type: AUTH_ERROR
		});
	}
};

/* Register User */
export const register = ({ name, email, password }) => async (dispatch) => {


	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}

	try {
		const res = await axios.post('/api/users', { name, email, password }, config);

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});
		
		dispatch(loadUser());

	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.message, 'danger')));
		}

		dispatch({
			type: REGISTER_FAIL
		});
	}
};

// Login User
export const login = (email, password) => async (dispatch) => {
	const body = { email, password };
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}


	try {
		const res = await axios.post('/api/auth', body, config);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		});

		dispatch(loadUser());
		
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.message, 'danger')));
		}

		dispatch({
			type: LOGIN_FAIL
		});
	}
};

// Logout //clear profile
export const logout = () => dispatch => {
	dispatch({ type: LOGOUT})
}
