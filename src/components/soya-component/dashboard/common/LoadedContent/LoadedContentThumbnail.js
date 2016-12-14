import React from 'react';

import LoadedContent from './LoadedContent.js';
import BaseService from '../../../base/services/BaseService.js';

var updated = (new Date()).getTime();
var resultNotLoaded = null;
var resultError = {
  state: BaseService.STATES.UNAUTHORIZED,
  updated: updated,
  errorMessage: 'Unauthorized.'
};
var resultLoaded = {
  state: BaseService.STATES.OK,
  updated: updated,
  data: {
    username: 'john',
    firstName: 'John',
    lastName: 'Smith'
  }
};

export default class LoadedContentThumbnail extends React.Component {
  render() {
    return <div>
      <h5>Result not loaded:</h5>
      <LoadedContent response={resultNotLoaded}>
        {LoadedContent.check(resultNotLoaded) ?
          <ul>
            <li>Username: {resultNotLoaded.data.username}</li>
            <li>First Name: {resultNotLoaded.data.firstName}</li>
            <li>Last Name: {resultNotLoaded.data.lastName}</li>
          </ul>
        : null}
      </LoadedContent>
      <h5>Result error:</h5>
      <LoadedContent response={resultError}>
        {LoadedContent.check(resultError) ?
          <ul>
            <li>Username: {resultError.data.username}</li>
            <li>First Name: {resultError.data.firstName}</li>
            <li>Last Name: {resultError.data.lastName}</li>
          </ul>
        : null}
      </LoadedContent>
      <h5>Loaded content:</h5>
      <LoadedContent response={resultLoaded}>
        {LoadedContent.check(resultLoaded) ?
          <ul>
            <li>Username: {resultLoaded.data.username}</li>
            <li>First Name: {resultLoaded.data.firstName}</li>
            <li>Last Name: {resultLoaded.data.lastName}</li>
          </ul>
        : null}
      </LoadedContent>
    </div>;
  }
}