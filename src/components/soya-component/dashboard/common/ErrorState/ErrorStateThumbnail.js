import React from 'react';
import ErrorState from './ErrorState.js';
import BaseService from '../../../base/services/BaseService.js';

const updated = (new Date()).getTime();
const serverError = {
  state: BaseService.STATES.SERVER_ERROR,
  updated: updated,
  errorMessage: 'Server error.'
};
const unauthorized = {
  state: BaseService.STATES.UNAUTHORIZED,
  updated: updated,
  errorMessage: 'Unauthorized.'
};
const notFound = {
  state: BaseService.STATES.NOT_FOUND,
  updated: updated,
  errorMessage: 'Not found.'
};
const unknownError = {
  state: BaseService.STATES.UNKNOWN_ERROR,
  updated: updated,
  errorMessage: 'Unhandled status: 502'
};


export default class ErrorStateThumbnail extends React.Component {
  render() {
    return <div>
      <ErrorState response={serverError} />
      <ErrorState response={unauthorized} />
      <ErrorState response={notFound} />
      <ErrorState response={unknownError} />
    </div>;
  }
}