import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Col, Container, Button } from 'react-bootstrap';
import { addExperience } from '../../actions/profileAction';

const AddExperience = ({ addExperience, history }) => {
	const [ formData, setFormData ] = useState({
		company: '',
		title: '',
		location: '',
		from: '',
		to: '',
		current: false,
		description: ''
	});

	const { company, title, location, from, to, current, description } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	return (
		<Container className='addExperience mt-1'>
			<h3 className='text-center'>Add an Experience</h3>
			<p className='lead text-center'>
				<i className='fas fa-code-branch' /> Add any developer/programming positions that you have worked in the
				past
			</p>
			<Form
				className='experience-form text-start d-flex flex-wrap'
				onSubmit={(e) => {
					e.preventDefault();
					addExperience(formData, history);
				}}
			>
				<Form.Group as={Col} md='3' controlId='jobTitle'>
					<Form.Label>Job Title</Form.Label>
					<Form.Control
						type='text'
						placeholder='Eg., Senior Developer'
						name='title'
						value={title}
						onChange={onChange}
						required
					/>
				</Form.Group>

				<Form.Group as={Col} md='6' controlId='companyName'>
					<Form.Label>Company Name</Form.Label>
					<Form.Control
						type='text'
						placeholder='Eg., ABC Private Limited'
						name='company'
						value={company}
						onChange={onChange}
						required
					/>
				</Form.Group>

				<Form.Group as={Col} md='3' controlId='location'>
					<Form.Label>Location</Form.Label>
					<Form.Control
						type='text'
						placeholder='Eg., Salem, TamilNadu'
						name='location'
						value={location}
						onChange={onChange}
					/>
				</Form.Group>

				<Form.Group as={Col} md='3' controlId='dateFrom'>
					<Form.Label>From</Form.Label>
					<Form.Control type='date' name='from' value={from} onChange={onChange} />
				</Form.Group>

				<Form.Group as={Col} md='2' className='text-center checkbox-hover' controlId='checkbox'>
					<Form.Label>Current Job</Form.Label>
					<Form.Control
						type='checkbox'
						name='current'
						checked={current}
						value={current}
						onChange={() => {
							setFormData({ ...formData, current: !current });
						}}
					/>
				</Form.Group>

				<Form.Group as={Col} md='3' controlId='dateTo'>
					<Form.Label>To</Form.Label>
					<Form.Control type='date' name='to' value={to} onChange={onChange} disabled={current} />
				</Form.Group>

				<Form.Group as={Col} md='12'>
					<Form.Label>Job Description</Form.Label>
					<Form.Control
						as='textarea'
						rows={4}
						placeholder='For Eg., Reviewing code work for accuracy and functionality. Creating and implementing design plans. Analyzing code segments regularly. Delegating tasks to team members. Keeping up-to-date with industry trends and technology developments.'
						name='description'
						value={description}
						onChange={onChange}
					/>
				</Form.Group>
				<Form.Group className='text-center' as={Col} md='12'>
					<Button className='btn-signup' type='submit'>
						ADD
					</Button>
					<Link className='btn btn-login my-1' to='/dashboard'>
						CANCEL
					</Link>
				</Form.Group>
			</Form>
		</Container>
	);
};

AddExperience.propTypes = {
	addExperience: PropTypes.func.isRequired
};

export default connect(null, { addExperience })(withRouter(AddExperience));
