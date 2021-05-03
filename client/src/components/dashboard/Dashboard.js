import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileAction';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { Button } from 'react-bootstrap';

const Dashboard = ({ getCurrentProfile, deleteAccount, auth: { user }, profile: { profile, loading } }) => {
	useEffect(
		() => {
			getCurrentProfile();
		},
		[ getCurrentProfile ]
	);

	return  (
		<Fragment>
			<h3 >Dashboard</h3>
			<p className='lead'>
				<i className='fas fa-user' /> Welcome! <span className='text-color-g'> {user && user.name}</span>
			</p>
			{profile !== null ? (
				<Fragment>
					<DashboardActions />
					<Experience experience={profile.experience} />
					<Education education={profile.education} />

					<div className='my-5'>
						<Button variant='danger' onClick={() => deleteAccount()}>
							<i className='fas fa-trash' /> &nbsp;Delete Account Permanently
						</Button>
					</div>
				</Fragment>
			) : (
				<Fragment>
					<p>You have not yet setup a profile, please add some information</p>
					<Link to='/createProfile' className='btn btn-primary my-1'>
						Create Profile
					</Link>
				</Fragment>
			)}
		</Fragment>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.authReducer,
	profile: state.profileReducer
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
