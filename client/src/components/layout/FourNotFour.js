import React, { Fragment } from 'react';

const NotFound = () => {
  return (
    <Fragment>
      <h1 className='text-color-g'>
        <i className='fas fa-exclamation-triangle' /> Page Not Found
      </h1>
      <p className='h5'>Sorry, this page does not exist</p>
    </Fragment>
  );
};

export default NotFound;