import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const Landing = ({ isAuthenticated }) => {
	
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
	return (
		<section className='landing'>
			<div className='dark-overlay'>
				<div className='landing-inner'>
					<h1 className='head'>Developer Community</h1>
					<p className='lead'>Use this platform with impressive portfolio and engage with other developers</p>
					<div className='buttons'>
						<Link to='/register' className='btn btn-signup'>
							SIGN UP
						</Link>
						<Link to='/login' className='btn btn-login'>
							LOGIN
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps)(Landing);