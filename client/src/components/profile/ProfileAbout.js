import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({ profile: { bio, skills } }) => (
	<div className='p-4  mt-3 transparent-bg'>
		{bio && (
			<Fragment>
				<h5 className='text-light text-center'>A Short Biography</h5>
				<p className='text-center lead-small'>{bio}</p>
				<div className='line' />
			</Fragment>
		)}
		<h6 className='text-center'>Skill Set</h6>
		<div className='lead-small text-center d-flex justify-content-center flex-wrap'>
			{skills.map((skill, index) => (
				<div key={index} className='p-1 mx-2'>
					<i className='fa fa-free-code-camp' /> {skill}
				</div>
			))}
		</div>
	</div>
);

ProfileAbout.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileAbout;
