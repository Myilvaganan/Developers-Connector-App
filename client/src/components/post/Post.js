import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../spinner/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { getPost } from '../../actions/postAction';

const Post = ({ getPost, post: { post, loading }, match }) => {
	useEffect(
		() => {
			getPost(match.params.id);
		},
		[ getPost, match.params.id ]
	);

	return loading || post === null ? (
		<Spinner />
	) : (
		<Fragment>
			<Link to='/posts' className='btn submit'>
				<i className='fas fa-chevron-left' /> Back To Posts
			</Link>
			<PostItem post={post} showActions={false} />
			
			<div className='comments'>
				{post.comments.map((comment) => <CommentItem key={comment._id} comment={comment} postId={post._id} />)}
			</div><CommentForm postId={post._id} />
		</Fragment>
	);
};

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	post: state.postReducer
});

export default connect(mapStateToProps, { getPost })(Post);
