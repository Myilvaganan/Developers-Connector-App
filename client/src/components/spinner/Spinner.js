import React, { Fragment } from 'react';
import spinner from '../../images/spinner.gif'

const Spinner = () => {
	return (
		<Fragment>
			<img src={spinner} alt="Loading..." style={{ width: '70px', margin: '10rem auto', display: 'block' }} />
		</Fragment>
	);
};

export default Spinner;
