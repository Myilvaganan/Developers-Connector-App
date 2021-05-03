import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../spinner/Spinner';
import { getProfileById } from '../../actions/profileAction';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import { Container, Row, Col } from 'react-bootstrap';

const Profile = ({ getProfileById, profile: { profile, loading }, auth, match }) => {
	useEffect(
		() => {
			getProfileById(match.params.id);
		},
		[ getProfileById, match.params.id ]
	);

	return (
		<Fragment>
			{profile === null || loading ? (
				<Spinner />
			) : (
				<Fragment>
					<Link to='/profiles' className='btn btn-dark p-2'>
						<i className='fas fa-chevron-left' /> Go To Profiles
					</Link>
					{auth.isAuthenticated &&
					auth.loading === false &&
					auth.user._id === profile.user._id && (
						<Link to='/editProfile' className='btn submit mx-2 p-2'>
							<i className='fas fa-edit' /> Edit Profile
						</Link>
					)}

					<Container>
						<Row>
							<Col>
								<ProfileTop profile={profile} />
								<ProfileAbout profile={profile} />
							</Col>
						</Row>

						<Row className='my-3 py-4 text-center transparent-bg'>
							<Col>
								<h5 className='text-light'>Experience</h5>
								{profile.experience.length > 0 ? (
									<Fragment>
										{profile.experience.map((experience) => (
											<ProfileExperience key={experience._id} experience={experience} />
										))}
									</Fragment>
								) : (
									<h6 className='lead'>Haven't added any Experiences</h6>
								)}
							</Col>
						</Row>

						<Row className='my-3 py-4 text-center transparent-bg'>
							<Col>
							
									<h5 className='text-light'>Education</h5>
									{profile.education.length > 0 ? (
										<Fragment>
											{profile.education.map((education) => (
												<ProfileEducation key={education._id} education={education} />
											))}
										</Fragment>
									) : (
										<h6 className='lead'>Haven't added any Education</h6>
									)}
							
							</Col>
						</Row>
						<Row className='my-3 p-3 transparent-bg text-center'>
							<Col>
							{profile.githubusername && (<><h5 className='text-light  my-1'>Github Repos</h5>
							<ProfileGithub username={profile.githubusername} /> </>)}</Col>
						</Row>
					</Container>
				</Fragment>
			)}
		</Fragment>
	);
};

Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profileReducer,
	auth: state.authReducer
});

export default connect(mapStateToProps, { getProfileById })(Profile);
