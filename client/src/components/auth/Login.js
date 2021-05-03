import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';

import { Row, Col, Form, Button } from 'react-bootstrap';

const Login = ({ login, isAuthenticated }) => {
	const [ formData, setFormData ] = useState({
		email: '',
		password: '',
		passwordConfirm: ''
	});

	const { email, password, passwordConfirm } = formData;

	const onChange = (e) =>
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});

	const onSubmit = (e) => {
		e.preventDefault();

		login(email, password);
	};

	//Redirect if user logged in

	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<Fragment>
			<Row className='justify-content-md-center login-form'>
				<Col lg={12} sm={12}>
					<h3 className='texts-primary'>Log In</h3>
					<p className='lead-1 text-center'>
						<i className='fas fa-user mr-2 ' /> Sign in Your Account
					</p>
				</Col>
				<Col lg={5}>
					<Form className='form' onSubmit={(e) => onSubmit(e)}>
						<Form.Group controlId='formBasicEmail'>
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter email'
								name='email'
								value={email}
								required
								onChange={(e) => onChange(e)}
							/>
							<Form.Text className='text-muted'>We'll never share your email with anyone else.</Form.Text>
						</Form.Group>

						<Form.Group className='Col-6' controlId='formBasicPassword'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								placeholder='Password'
								name='password'
								minLength='8'
								value={password}
								required
								onChange={(e) => onChange(e)}
							/>
						</Form.Group>

						<Form.Group className='Col-6' controlId='formBasicConfirmPassword'>
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control
								type='confirmPassword'
								placeholder='Confirm Password'
								name='passwordConfirm'
								value={passwordConfirm}
								minLength='8'
								required
								onChange={(e) => onChange(e)}
							/>
						</Form.Group>

						<Row>
							<Col lg={2}>
								<Button className='submit' size='md' type='submit'>
									Login
								</Button>
							</Col>
							<Col lg={10} className='d-flex align-items-center'>
								{' '}
								<p className='tag-line my-1'>
									Not having one ? &nbsp; Create a new account {' '}
									<Link className='text-warning mx-2' to='/register'>
										Register
									</Link>
								</p>
							</Col>
						</Row>
					</Form>
				</Col>
			</Row>
		</Fragment>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
