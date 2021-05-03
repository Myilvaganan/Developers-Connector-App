import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profileAction';
import formatDate from '../../utils/formatDate';
import { Table, Button } from 'react-bootstrap';

const Education = ({ education, deleteEducation }) => {
	const educations = education.map((exp) => (
		<tr key={exp._id}>
			<td>{exp.school}</td>
			<td>{exp.degree}</td>
			<td>
				{formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : 'Present'}
			</td>
			<td>
				<Button onClick={() => deleteEducation(exp._id)} variant='warning'>
					Remove
				</Button>
			</td>
		</tr>
	));

	return (
		<Fragment>
			<h4 className='mt-3 mb-4'>Education Credentials</h4>
			<Table className='text-center table' responsive striped variant='transparent'>
				<thead>
					<tr>
						<th>Institute</th>
						<th>Degree</th>
						<th>Years</th>
						<th />
					</tr>
				</thead>
				<tbody>{educations}</tbody>
			</Table>
		</Fragment>
	);
};

Education.propTypes = {
	education: PropTypes.array.isRequired,
	deleteEducation: PropTypes.func.isRequired
};

export default connect(null, { deleteEducation })(Education);
