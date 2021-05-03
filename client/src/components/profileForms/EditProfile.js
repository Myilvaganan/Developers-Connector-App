import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, createProfile } from '../../actions/profileAction';
import { Form, Col, Container, InputGroup, Button } from 'react-bootstrap';

const initialState = {
	company: '',
	website: '',
	location: '',
	status: '',
	skills: '',
	githubusername: '',
	bio: '',
	twitter: '',
	facebook: '',
	linkedin: '',
	youtube: '',
	instagram: ''
};

const EditProfile = ({ profile: { profile, loading }, getCurrentProfile, createProfile, history }) => {
	const [ formData, setFormData ] = useState(initialState);

	useEffect(
		() => {
			if (!profile) getCurrentProfile();
			if (!loading && profile) {
				const profileData = { ...initialState };
				for (const key in profile) {
					if (key in profileData) profileData[key] = profile[key];
				}
				for (const key in profile.social) {
					if (key in profileData) profileData[key] = profile.social[key];
				}
				if (Array.isArray(profileData.skills)) profileData.skills = profileData.skills.join(', ');
				setFormData(profileData);
			}
		},
		[ loading, getCurrentProfile, profile ]
	);

	const {
		company,
		website,
		location,
		status,
		skills,
		githubusername,
		bio,
		twitter,
		facebook,
		linkedin,
		youtube,
		instagram
	} = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		createProfile(formData, history, true);
	};

	return (
		<Fragment>
			<Container className='createProfile mt-1'>
				<h3 className='edit-profile text-center'>Modify Your Profile</h3>
				<p className='lead text-center'>
					<i className='fas fa-edit' /> Add some changes to your profile
				</p>
				<Form className='profile-form text-start d-flex flex-wrap' onSubmit={(e) => onSubmit(e)}>
					<Form.Group as={Col} md='12' controlId='companyName'>
						<Form.Label>Working Company Name</Form.Label>
						<Form.Control
							type='text'
							placeholder='ABC Infotech Private Limited '
							name='company'
							value={company}
							onChange={onChange}
							required
						/>
					</Form.Group>
					<Form.Group as={Col} md='6' controlId='selectDesignation'>
						<Form.Label>Designation</Form.Label>
						<Form.Control as='select' custom name='status' value={status} required onChange={onChange}>
							<option>* Select Professional Status</option>
							<option value='Developer'>Developer</option>
							<option value='Junior Developer'>Junior Developer</option>
							<option value='Senior Developer'>Senior Developer</option>
							<option value='Manager'>Manager</option>
							<option value='Student or Learning'>Student or Learning</option>
							<option value='Instructor'>Instructor or Teacher</option>
							<option value='Intern'>Intern</option>
							<option value='Other'>Other</option>
						</Form.Control>
					</Form.Group>

					<Form.Group as={Col} md='6' controlId='companyWebsite'>
						<Form.Label>Company Website</Form.Label>
						<InputGroup hasValidation>
							<InputGroup.Prepend>
								<InputGroup.Text id='basic-addon3'>https://</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control
								type='text'
								placeholder='www.abcinfotech.com'
								aria-describedby='inputGroupPrepend'
								name='website'
								value={website}
								onChange={onChange}
								required
							/>
						</InputGroup>
					</Form.Group>

					<Form.Group as={Col} md='3' controlId='location'>
						<Form.Label>Current Location</Form.Label>
						<Form.Control
							type='text'
							placeholder='Salem'
							name='location'
							value={location}
							onChange={onChange}
							required
						/>
					</Form.Group>
					<Form.Group as={Col} md='6' controlId='skills'>
						<Form.Label>Developer Skills</Form.Label>
						<Form.Control
							type='text'
							placeholder='eg. HTML,CSS,JavaScript,PHP'
							name='skills'
							value={skills}
							onChange={onChange}
							required
						/>
						<small className='small-text'>Please use comma separated values </small>
					</Form.Group>
					<Form.Group as={Col} md='3' controlId='githubusername'>
						<Form.Label>GitHub Username</Form.Label>
						<Form.Control
							type='text'
							placeholder='Eg., Myilvaganan'
							name='githubusername'
							value={githubusername}
							onChange={onChange}
							required
						/>
					</Form.Group>
					<Form.Group as={Col} md='12'>
						<Form.Label>Short Bio</Form.Label>
						<Form.Control
							as='textarea'
							rows={4}
							placeholder='A short bio of yourself'
							name='bio'
							value={bio}
							onChange={onChange}
							aria-label='With textarea'
						/>
					</Form.Group>
					<Form.Group as={Col} md='6'>
						<Form.Label>Social Links</Form.Label>
						<div className='d-flex'>
							<i className='fab fa-twitter fa-2x mx-2' />
							<Form.Control
								type='text'
								placeholder='Twitter URL'
								name='twitter'
								value={twitter}
								onChange={onChange}
							/>
						</div>
						<div className='d-flex mt-2'>
							<i className='fab fa-facebook fa-2x mx-2' />
							<Form.Control
								type='text'
								placeholder='Facebook URL'
								name='facebook'
								value={facebook}
								onChange={onChange}
							/>
						</div>
						<div className='d-flex mt-2'>
							<i className='fab fa-youtube fa-2x mx-2' />
							<Form.Control
								type='text'
								placeholder='YouTube URL'
								name='youtube'
								value={youtube}
								onChange={onChange}
							/>
						</div>
					</Form.Group>
					<Form.Group as={Col} md='6'>
						<Form.Label>More Links</Form.Label>
						<div className='d-flex'>
							<i className='fab fa-instagram fa-2x mx-2' />
							<Form.Control
								type='text'
								placeholder='username'
								name='instagram'
								value={instagram}
								onChange={onChange}
							/>
						</div>
						<div className='d-flex mt-2'>
							<i className='fab fa-linkedin fa-2x mx-2' />
							<Form.Control
								type='text'
								placeholder='Linkedin URL'
								name='linkedin'
								value={linkedin}
								onChange={onChange}
							/>
						</div>
					</Form.Group>

					<Form.Group className='text-center' as={Col} md='12'>
						<Button className='btn-signup' type='submit'>
							Submit
						</Button>
						<Link className='btn btn-login my-1' to='/dashboard'>
							Go Back
						</Link>
					</Form.Group>
				</Form>
			</Container>
		</Fragment>
	);
};

EditProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profileReducer
});

export default connect(mapStateToProps, { getCurrentProfile, createProfile })(withRouter(EditProfile));
