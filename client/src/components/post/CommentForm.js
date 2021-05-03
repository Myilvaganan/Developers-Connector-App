import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/postAction';
import { Form, Col, Button, Row, Container } from 'react-bootstrap';
const CommentForm = ({ postId, addComment }) => {
	const [ text, setText ] = useState('');

	return (
		<Container>
			<Row className='justify-content-md-center'>
				<Col md={8} className='text-center'>
					<Form
						onSubmit={(e) => {
							e.preventDefault();
							addComment(postId, { text });
							setText('');
						}}
					>
						<Form.Group>
							<Form.Label className='p-2'>Leave a Comment</Form.Label>
							<Form.Control
								as='textarea'
								rows={3}
								name='text'
								placeholder='Comment the post'
								value={text}
								onChange={(e) => setText(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group>
							<Button className='btn-signup ' type='submit' value='Submit'>
								COMMENT
							</Button>
						</Form.Group>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired
};

export default connect(null, { addComment })(CommentForm);
