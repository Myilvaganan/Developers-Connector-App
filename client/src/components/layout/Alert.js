import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';

const AlertCard = ({ alerts }) => {
	return (
		alerts !== null &&
		alerts.length > 0 &&
		alerts.map(({ id, alertType, message }) => (
			<Alert key={id} variant={alertType} className='p-2 h6 alert'>
				{message}
			</Alert>
		))
	);
};

//PropType Declaration
AlertCard.propTypes = {
	alerts: PropTypes.array.isRequired
};


//Getting State from Combined Reducer
const mapStateToProps = (state) => ({
	alerts: state.alertReducer
});

//connecting with store
export default connect(mapStateToProps)(AlertCard);
