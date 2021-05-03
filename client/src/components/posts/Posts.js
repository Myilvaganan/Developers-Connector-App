import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postAction';
import Spinner from '../spinner/Spinner';
import PostForm from './PostForm';
import PostItem from './PostItem';

const Posts = ({ getPosts, posts: { posts, loading } }) => {
	useEffect(
		() => {
			getPosts();
		},
		[ getPosts ]
	);

	return loading ? (
		<Spinner />
	) : (
		<Fragment>
			<h5 className='posts text-center'>Posts</h5>
			<p className='lead text-center'>
				<i className='fas fa-user' /> Welcome to the community
			</p>
			<PostForm />
			<div className='postsContainer'>{posts.map((post) => <PostItem key={post._id} post={post} />)}</div>
		</Fragment>
	);
};

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	posts: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	posts: state.postReducer
});

export default connect(mapStateToProps, { getPosts })(Posts);
