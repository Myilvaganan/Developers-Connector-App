import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postAction';
import { Form, Col, Button, Row, Container } from 'react-bootstrap';

const PostForm = ({ addPost }) => {
	const [ text, setText ] = useState('');
	return (
		<Container>
			<Row className='justify-content-md-center'>
				<Col md={8} className='text-center'>
					<Form
						onSubmit={(e) => {
							e.preventDefault();
							addPost({ text });
							setText('');
						}}
					>
						<Form.Group>
							<Form.Label className='p-2'>Create a Post and Explore the community</Form.Label>
							<Form.Control
								as='textarea'
								rows={5}
								placeholder='Write Something and explore your need!!!'
								name='text'
								value={text}
								onChange={(e) => setText(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group>
							<Button className='btn-signup ' type='submit' value='Submit'>
								POST &nbsp; <i className='fa fa-plus-circle' aria-hidden='true' />
							</Button>
						</Form.Group>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(PostForm);
