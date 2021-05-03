const express = require('express');
const Router = express.Router();
const { check, validationResult } = require('express-validator');
const protectedUser = require('../../middlewares/auth');

const PostCollection = require('../../models/PostSchema');
const UserCollection = require('../../models/UserSchema');
const checkObjectId = require('../../middlewares/checkId');

/*
****route**** Method: POST // $EndPoint: api/posts
****Desc***** Create a Post
****Access*** Private
*/

Router.post('/', protectedUser, check('text', 'Text is required').notEmpty(), async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const user = await UserCollection.findById(req.user.id).select('-password');

		const newPost = new PostCollection({
			text: req.body.text,
			name: user.name,
			avatar: user.avatar,
			user: req.user.id
		});

		const post = await newPost.save();

		res.json(post);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

/*
****route**** Method: GET // $EndPoint: api/posts
****Desc***** Get all Posts
****Access*** Private
*/

Router.get('/', protectedUser, async (req, res) => {
	try {
		const posts = await PostCollection.find().sort({ date: -1 });
		res.json(posts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

/*
****route**** Method: GET // $EndPoint: api/posts/:id
****Desc***** Get post By ID
****Access*** Private
*/

Router.get('/:id', protectedUser, checkObjectId('id'), async (req, res) => {
	try {
		const post = await PostCollection.findById(req.params.id);

		if (!post) {
			return res.status(404).json({ message: 'Post not found' });
		}

		res.json(post);
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Server Error');
	}
});

/*
****route**** Method: DELETE // $EndPoint: api/posts/:id
****Desc***** Delete a post
****Access*** Private
*/

Router.delete('/:id', protectedUser, checkObjectId('id'), async (req, res) => {
	try {
		const post = await PostCollection.findById(req.params.id);

		if (!post) return res.status(404).json({ message: 'Post Not Found' });

		if (post.user.toString() !== req.user.id) return res.status(401).json({ message: 'User Not Authorized!' });

		await post.remove();

		res.json({ message: 'Post Removed' });
	} catch (error) {
		console.error(error.message);
		res.status(404).json({ message: 'Server Error' });
	}
});

/*
****route**** Method: PUT // $EndPoint: api/posts/like/:id
****Desc***** Like a post
****Access*** Private
*/

Router.put('/like/:id', protectedUser, checkObjectId('id'), async (req, res) => {
	try {
		const post = await PostCollection.findById(req.params.id);

		//Check Post if already liked
		if (post.likes.some((like) => like.user.toString() === req.user.id)) {
			return res.status(400).json({ msg: 'Post already liked' });
		}

		post.likes.unshift({ user: req.user.id });

		await post.save();

		return res.json(post.likes);
	} catch (error) {
		console.error(error.message);
		res.status(404).json({ message: 'Server Error' });
	}
});

/*
****route**** Method: PUT // $EndPoint: api/posts/unlike/:id
****Desc***** unLike a post
****Access*** Private
*/

Router.put('/unlike/:id', protectedUser, checkObjectId('id'), async (req, res) => {
	try {
		const post = await PostCollection.findById(req.params.id);

		//Check if the post has not yet been liked
		if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
			return res.status(400).json({ msg: 'Post has not been already liked' });
		}

		// remove the like
		post.likes = post.likes.filter(({ user }) => user.toString() !== req.user.id);

		await post.save();

		return res.json(post.likes);
	} catch (error) {
		console.error(error.message);
		res.status(404).json({ message: 'Server Error' });
	}
});

/*
****route**** Method: POST // $EndPoint: api/posts/comment/:id
****Desc***** Comment a post
****Access*** Private
*/

Router.post(
	'/comment/:id',
	protectedUser,
	checkObjectId('id'),
	check('text', 'Text is required').notEmpty(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await UserCollection.findById(req.user.id).select('-password');
			const post = await PostCollection.findById(req.params.id);

			const newComment = {
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id
			};

			post.comments.unshift(newComment);

			await post.save();

			res.json(post.comments);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

/*
****route**** Method: DELETE // $EndPoint: api/posts/comment/:id/:comment_id
****Desc***** Delete a comment
****Access*** Private
*/

Router.delete('/comment/:id/:comment_id', protectedUser, async (req, res) => {
	try {
		const post = await PostCollection.findById(req.params.id);

		// Pull out comment
		const comment = post.comments.find((comment) => comment.id === req.params.comment_id);

		// Make sure comment exists
		if (!comment) {
			return res.status(404).json({ msg: 'Comment does not exist' });
		}

		// Check user
		if (comment.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}

		// Get remove index
		const removeIndex = post.comments.map((comment) => comment.id).indexOf(req.params.comment_id);

		post.comments.splice(removeIndex, 1);

		await post.save();

		return res.json(post.comments);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = Router;
