import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Image, ListGroup, Col } from 'react-bootstrap';

const ProfileItem = ({ profile: { user: { _id, name, avatar }, status, company, location, skills } }) => {
	return (
		<Col sm={12} md={6} className="my-3">
			<Card className='text-center  card my-2'>
				<Card.Body>
					<Image
						className='text-center card-image'
						variant='top'
						src={avatar}
						roundedCircle
						height='100px'
						width='100px'
					/>
					<Card.Title className='mt-3 text-color-g'>{name}</Card.Title>

					<Card.Text>
						{status} {company && <span> at {company}</span>}, @ {location}
					</Card.Text>
					<ListGroup horizontal='lg' className='justify-content-center'>
						{skills.slice(0, 4).map((skill, index) => (
							<ListGroup.Item className='list-card' key={index}>
								<i className='fa fa-free-code-camp' /> {skill}
							</ListGroup.Item>
						))}
					</ListGroup>
					<Link to={`/profile/${_id}`} className='btn submit m-3'>
						View Profile
					</Link>
				</Card.Body>
			</Card>
		</Col>
	);
};

ProfileItem.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileItem;
