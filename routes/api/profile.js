const express = require('express');
const axios = require('axios');
const config = require('config');
const Router = express.Router();
const protectedUser = require('../../middlewares/auth');
const { check, validationResult } = require('express-validator');

// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');

const ProfileCollection = require('../../models/ProfileSchema');
const UserCollection = require('../../models/UserSchema');
const PostCollection = require('../../models/PostSchema');

const checkUrlObjectId = require('../../middlewares/checkId');

/*
 ****route**** Method: GET // $EndPoint: api/profile/me
 ****Desc***** GET Current user's profile
 ****Access*** Private
 */

Router.get('/me', protectedUser, async (req, res) => {
	try {
		//find a user profile by ID (from token)
		const profile = await ProfileCollection.findOne({
			user: req.user.id
		}).populate('user', [ 'name', 'avatar' ]);

		if (!profile)
			return res.status(400).json({
				message: 'There is no profile for this user'
			});

		res.json(profile);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

/*
 ****route**** Method: POST // $EndPoint: api/profile/
 ****Desc***** Create or update user profile
 ****Access*** Private
 */

Router.post(
	'/',
	protectedUser,
	[ check('status', 'Status is required').notEmpty(), check('skills', 'Skills is required').notEmpty() ],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array()
			});
		}

		// destructuring the request
		const {
			website,
			skills,
			youtube,
			twitter,
			instagram,
			linkedin,
			facebook,
			// spread the rest of the fields we don't need to check
			...rest
		} = req.body;

		// build a profile
		const profileFields = {
			user: req.user.id,
			website:
				website && website !== ''
					? normalize(website, {
							forceHttps: true
						})
					: '',
			skills: Array.isArray(skills) ? skills : skills.split(',').map((skill) => skill.trim()),
			...rest
		};

		// Build socialFields object
		const socialFields = {
			youtube,
			twitter,
			instagram,
			linkedin,
			facebook
		};

		// normalize social fields to ensure valid url
		for (const [ key, value ] of Object.entries(socialFields)) {
			if (value && value.length > 0)
				socialFields[key] = normalize(value, {
					forceHttps: true
				});
		}

		// add to profileFields
		profileFields.social = socialFields;

		try {
			// Using upsert option (creates new doc if no match is found):
			let profile = await ProfileCollection.findOneAndUpdate(
				{
					user: req.user.id
				},
				{
					$set: profileFields
				},
				{
					new: true,
					upsert: true,
					setDefaultsOnInsert: true
				}
			);

			return res.json(profile);
		} catch (err) {
			console.error(err.message);
			return res.status(500).send('Server Error');
		}
	}
);

/*
 ****route**** Method: GET // $EndPoint: api/profile/
 ****Desc***** Get all Profiles
 ****Access*** Public
 */

Router.get('/', async (req, res) => {
	try {
		const profiles = await ProfileCollection.find().populate('user', [ 'name', 'avatar' ]);
		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

/*
 ****route**** Method: GET // $EndPoint: api/profile/user/:user_id
 ****Desc***** Get user profile by ID
 ****Access*** Public
 */

// req.params.user_id => destructuring as ===> {params: {user_id}}

Router.get('/user/:user_id', checkUrlObjectId('user_id'), async ({ params: { user_id } }, res) => {
	try {
		const profile = await ProfileCollection.findOne({
			user: user_id
		}).populate('user', [ 'name', 'avatar' ]);

		if (!profile)
			return res.status(400).json({
				message: 'Profile not found'
			});

		return res.json(profile);
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({
			message: 'Server error'
		});
	}
});

/*
 ****route**** Method: DELETE // $EndPoint: api/profile
 ****Desc***** Delete Profile, User, Posts
 ****Access*** Private
 */

Router.delete('/', protectedUser, async (req, res) => {
	try {
		await Promise.all([
			PostCollection.deleteMany({
				user: req.user.id
			}),
			ProfileCollection.findOneAndRemove({
				user: req.user.id
			}),
			UserCollection.findOneAndRemove({
				_id: req.user.id
			})
		]);

		res.json({
			message: 'Your Profile has been Deleted Permanently!'
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			message: 'Server error'
		});
	}
});

/*
 ****route**** Method: PUT // $EndPoint: api/profile/experience
 ****Desc***** Add Profile experience
 ****Access*** Private
 */

Router.put(
	'/experience',
	protectedUser,
	[
		check('title', 'Title is required').notEmpty(),
		check('company', 'Company Name is required').notEmpty(),
		check('from', 'From date is required and needs to be from the past')
			.notEmpty()
			.custom((value, { req }) => (req.body.to ? value < req.body.to : true))
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array()
			});
		}

		try {
			const profile = await ProfileCollection.findOne({
				user: req.user.id
			});

			profile.experience.unshift(req.body); //adding profile to first of experience array

			await profile.save();

			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

/*
 ****route**** Method: DELETE // $EndPoint: api/profile/experience/:experience_id
 ****Desc***** DELETE Profile experience
 ****Access*** Private
 */

Router.delete('/experience/:experience_id', protectedUser, async (req, res) => {
	try {
		const profile = await ProfileCollection.findOne({
			user: req.user.id
		});

		profile.experience = profile.experience.filter((exp) => exp._id.toString() !== req.params.experience_id);

		await profile.save();
		console.log(profile);
		return res.status(200).json(profile);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

/*
 ****route**** Method: PUT // $EndPoint: api/profile/education
 ****Desc***** Add Profile Education
 ****Access*** Private
 */

Router.put(
	'/education',
	protectedUser,
	[
		check('school', 'School is required').notEmpty(),
		check('degree', 'Degree is required').notEmpty(),
		check('fieldofstudy', 'Field of study is required').notEmpty(),
		check('from', 'From date is required and needs to be from the past')
			.notEmpty()
			.custom((value, { req }) => (req.body.to ? value < req.body.to : true))
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array()
			});
		}

		try {
			const profile = await ProfileCollection.findOne({
				user: req.user.id
			});

			profile.education.unshift(req.body);

			await profile.save();

			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

/*
 ****route**** Method: DELETE // $EndPoint: api/profile/education/:education_id
 ****Desc***** Delete Profile Education
 ****Access*** Private
 */

Router.delete('/education/:education_id', protectedUser, async (req, res) => {
	try {
		const profile = await ProfileCollection.findOne({
			user: req.user.id
		});
		profile.education = profile.education.filter(
			(education) => education._id.toString() !== req.params.education_id
		);
		await profile.save();
		return res.status(200).json(profile);
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			message: 'Server error'
		});
	}
});

/*
 ****route**** Method: GET // $EndPoint: api/profile/github/:username
 ****Desc***** Get User Repo from Git-hub using axios
 ****Access*** Public
 */

Router.get('/github/:username', async (req, res) => {
	try {
		const uri = `https://api.github.com/users/${req.params
			.username}/repos?per_page=10&sort=created:asc&client_id=${config.get(
			'githubClientId'
		)}&client_secret=${config.get('githubSecretKey')}`;

		const headers = {
			'user-agent': 'node.js'
		};

		const repos = await axios.get(
			uri,
			{
				method: 'GET'
			},
			{
				headers
			}
		);

		return res.json(repos.data);
	} catch (error) {
		console.error(error.message);
		return res.status(404).json({
			message: 'No GitHub User Found'
		});
	}
});

module.exports = Router;
