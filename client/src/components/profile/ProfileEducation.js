import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

const ProfileEducation = ({ education: { school, degree, fieldofstudy, current, to, from, description } }) => (
	<div>
		<h5 className='text-color-g'>{school}</h5>
		<p className='lead'>
			<Moment format='YYYY/MM/DD'>{moment.utc(from)}</Moment> -{' '}
			{!to ? ' Present' : <Moment format='YYYY/MM/DD'>{moment.utc(to)}</Moment>}, {degree}, {fieldofstudy}
		</p>
		<p className='lead-small'>{description}</p>
	</div>
);

ProfileEducation.propTypes = {
	education: PropTypes.object.isRequired
};

export default ProfileEducation;
