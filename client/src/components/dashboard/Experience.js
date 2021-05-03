import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profileAction'; 
import formatDate from '../../utils/formatDate';
import { Table, Button } from 'react-bootstrap';

const Experience = ({ experience,  deleteExperience }) => {


	const experiences = experience.map((exp) => (
		<tr key={exp._id}>
			<td>{exp.company}</td>
			<td>{exp.title}</td>
			<td>
				{formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : 'Present'}
			</td>
			<td>
				<Button  onClick={() => deleteExperience(exp._id)}  variant='warning'>Remove</Button>
			</td>
		</tr>
	));

	return (
		<Fragment>
			<h4 className='my-3 mb-4'>Experience Credentials</h4>
			<Table className='text-center table' responsive striped variant='transparent' >
				<thead>
					<tr>
						<th>Company</th>
						<th>Title</th>
						<th>Years</th>
						<th />
					</tr>
				</thead>
				<tbody>{experiences}</tbody>
			</Table>
		</Fragment>
	);
};

Experience.propTypes = {
	experience: PropTypes.array.isRequired,
	deleteExperience: PropTypes.func.isRequired 
};

export default connect(null, {deleteExperience})(Experience);
