import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

const ProfileExperience = ({ experience: { company, title, location, current, to, from, description } }) => (
	<div>
		<h5 className='text-color-g mt-3'>{company}</h5>
		<p className='lead'>
			<Moment format='YYYY/MM/DD'>{moment.utc(from)}</Moment> -{' '}
			{!to ? ' Present' : <Moment format='YYYY/MM/DD'>{moment.utc(to)}</Moment>}, {title}, @{location}
		</p>
		<p className='lead-small'>{description}</p>
	</div>
);

ProfileExperience.propTypes = {
	experience: PropTypes.object.isRequired
};

export default ProfileExperience;
