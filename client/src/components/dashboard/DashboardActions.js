import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';

const DashboardActions = () => {
	const placement = 'bottom';
	return (
		<Container>
			<Row className='text-center'>
				<Col sm={12} md={2} className="my-2">
					<OverlayTrigger
						key={placement}
						placement={placement}
						overlay={<Tooltip id={`tooltip-${placement}`}>Edit Your Profile Here!</Tooltip>}
					>
						<Link to='/editProfile' className='btn submit mr-2'>
							<i className='fas fa-edit' /> Edit Profile
						</Link>
					</OverlayTrigger>
				</Col>

				<Col sm={12} md={2} className="my-2">
					<OverlayTrigger
						key={placement}
						placement={placement}
						overlay={<Tooltip id={`tooltip-${placement}`}>Add Your Experience Here!</Tooltip>}
					>
						<Link to='/addExperience' className='btn submit mr-2'>
							<i className='fab fa-black-tie' /> Experience
						</Link>
					</OverlayTrigger>
				</Col>
				<Col sm={12} md={2} className="my-2">
					<OverlayTrigger
						key={placement}
						placement={placement}
						overlay={<Tooltip id={`tooltip-${placement}`}>Add Your Education Here!</Tooltip>}
					>
						<Link to='/addEducation' className='btn submit mr-2'>
							<i className='fas fa-graduation-cap' /> Education
						</Link>
					</OverlayTrigger>
				</Col>
			</Row>
		</Container>
	);
};

export default DashboardActions;
