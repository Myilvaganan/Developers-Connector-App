import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profileAction';
import { Form, Col, Container, Button } from 'react-bootstrap';

const AddEducation = ({ addEducation, history }) => {
	const [ formData, setFormData ] = useState({
		school: '',
		degree: '',
		fieldofstudy: '',
		from: '',
		to: '',
		current: false,
		description: ''
	});

	const { school, degree, fieldofstudy, from, to, description, current } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	return (
		<Container className='addEducation mt-1'>
			<h3 className='text-center'>Add Your Education</h3>
			<p className='lead text-center'>
				<i className='fas fa-code-branch' />Add any school or bootcamp that you have attended
			</p>
			<Form
				className='experience-form text-start d-flex flex-wrap'
				onSubmit={(e) => {
					e.preventDefault();
					addEducation(formData, history);
				}}
			>
				<Form.Group as={Col} md='3' controlId='school'>
					<Form.Label>School or Institute Name</Form.Label>
					<Form.Control
						type='text'
						placeholder='Eg., Madras University'
						name='school'
						value={school}
						onChange={onChange}
						required
					/>
				</Form.Group>

				<Form.Group as={Col} md='6' controlId='certificate'>
					<Form.Label>Certificate Name</Form.Label>
					<Form.Control
						type='text'
						placeholder='Eg., Bachelor of Engineering / Full Stack Development'
						name='degree'
						value={degree}
						onChange={onChange}
						required
					/>
				</Form.Group>

				<Form.Group as={Col} md='3' controlId='location'>
					<Form.Label>Field of Study</Form.Label>
					<Form.Control
						type='text'
						placeholder='Eg., Mechatronics'
						name='fieldofstudy'
						value={fieldofstudy}
						onChange={onChange}
					/>
				</Form.Group>

				<Form.Group as={Col} md='3' controlId='dateFrom'>
					<Form.Label>From</Form.Label>
					<Form.Control type='date' name='from' value={from} onChange={onChange} />
				</Form.Group>

				<Form.Group as={Col} md='2' className='text-center checkbox-hover' controlId='checkbox'>
					<Form.Label>Currently Here</Form.Label>
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
						placeholder='For Eg., I am currently studying here and did many academic projects related to web development using ReactJs and NodeJs'
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

AddEducation.propTypes = {
	addEducation: PropTypes.func.isRequired
};

export default connect(null, { addEducation })(AddEducation);
