import React from 'react';
import PropTypes from 'prop-types';
import { Image} from 'react-bootstrap';

const ProfileTop = ({ profile: { status, company, location, website, social, user: { name, avatar } } }) => {
	return (
		<div className='text-center p-4 transparent-bg'>
			<Image
				className='text-center card-image'
				variant='top'
				src={avatar}
				roundedCircle
				height='150px'
				width='150px'
			/>
			<h3 className=' pt-2'>{name}</h3>
			<p className='lead'>
				{status} {company && <span> at {company}</span>} @{' '}
				{location && <span className='text-color-g'>{location}</span>}
			</p>

			<div className='d-flex justify-content-center my-1'>
				{website && (
					<a href={website} target='_blank' rel='noopener noreferrer' className="mx-1 globe">
						<i className='fas fa-globe fa-2x' />
					</a>
				)}
				{social &&
				social.twitter && (
					<a href={social.twitter} target='_blank' rel='noopener noreferrer'  className="mx-1 tw">
						<i className='fab fa-twitter fa-2x' />
					</a>
				)}
				{social &&
				social.facebook && (
					<a href={social.facebook} target='_blank' rel='noopener noreferrer'  className="mx-1 fb">
						<i className='fab fa-facebook fa-2x' />
					</a>
				)}
				{social &&
				social.linkedin && (
					<a href={social.linkedin} target='_blank' rel='noopener noreferrer' className="mx-1 ln">
						<i className='fab fa-linkedin fa-2x' />
					</a>
				)}
				{social &&
				social.youtube && (
					<a href={social.youtube} target='_blank' rel='noopener noreferrer'  className="mx-1 yt">
						<i className='fab fa-youtube fa-2x' />
					</a>
				)}
				{social &&
				social.instagram && (
					<a href={social.instagram} target='_blank' rel='noopener noreferrer'  className="mx-1 ins">
						<i className='fab fa-instagram fa-2x' />
					</a>
				)}
			</div>
		</div>
	);
};

ProfileTop.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileTop;
