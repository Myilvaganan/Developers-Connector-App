import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/postAction';
import { Button, Image } from 'react-bootstrap';

const CommentItem = ({ postId, comment: { _id, text, name, avatar, user, date }, auth, deleteComment }) => {
	return (
		<div className='post bg-less-light p-3 my-3'>
			<div>
				<Link to={`/profile/${user}`} className='d-flex flex-wrap align-items-end'>
					<Image
						className='text-center card-image mr-3'
						variant='top'
						src={avatar}
						roundedCircle
						height='30px'
						width='30px'
					/>

					<h6>{name}</h6>
				</Link>
				<p className='pt-3 lead'>{text}</p>
			</div>
			<div className='post-date d-flex align-items-start  justify-content-between '>
				<p className='lead-small'>
					Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
				</p>
				{!auth.loading &&
				user === auth.user._id && (
					<Button
						onClick={() => {
							deleteComment(postId, _id);
						}}
						size="sm"
						type='button'
						variant='danger'
					>
						<i className='fas fa-times' />
					</Button>
				)}
			</div>
		</div>
	);
};
CommentItem.propTypes = {
	postId: PropTypes.string.isRequired,
	comment: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.authReducer
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
