import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import Register from '../auth/Register';
import Login from '../auth/Login';
import CreateProfile from '../profileForms/CreateProfile';
import EditProfile from '../profileForms/EditProfile';
import AddExperience from '../profileForms/AddExperience';
import AddEducation from '../profileForms/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import NotFound from '../layout/FourNotFour';
import AlertCard from '../layout/Alert';
import { Col } from 'react-bootstrap';
import PrivateRoute from './PrivateRoute';

const Routes = () => {
	return (
		<section className='container'>
			<Col className='text-center d-flex justify-content-around'>
				<AlertCard />
			</Col>
			<Switch>
				<Route exact path='/register' component={Register} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/profiles' component={Profiles} />
				<Route exact path='/profile/:id' component={Profile} />
				<PrivateRoute exact path='/dashboard' component={Dashboard} />
				<PrivateRoute exact path='/createProfile' component={CreateProfile} />
				<PrivateRoute exact path='/editProfile' component={EditProfile} />
				<PrivateRoute exact path='/addExperience' component={AddExperience} />
				<PrivateRoute exact path='/addEducation' component={AddEducation} />
				<PrivateRoute exact path='/posts' component={Posts} />
				<PrivateRoute exact path='/posts/:id' component={Post} />
				<Route component={NotFound} />
			</Switch>
		</section>
	);
};

export default Routes;
