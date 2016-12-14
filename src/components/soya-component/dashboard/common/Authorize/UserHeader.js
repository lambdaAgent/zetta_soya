import React from 'react';
import connect from 'soya/lib/data/redux/connect';

import Button from '../Button/Button.js';
import UserSegment from '../../../base/segments/UserSegment.js';
import style from './userheader.mod.css';

class UserHeader extends React.Component {
  static getSegmentDependencies() {
    return [UserSegment];
  }

  static subscribeQueries(props, subscribe) {
    subscribe(UserSegment.id(), 'user', 'user');
  }

  componentWillMount() {
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.context.store.dispatch(UserSegment.getActionCreator().clearUser());
  }

  render() {
    if (this.props.result.user == null || this.props.result.user.token == null ||
        this.props.result.user.state != UserSegment.STATES.LOGGED_IN) {
      return <div className={style.container}>
        Not logged in.
      </div>
    }

    return <div className={style.container}>
      Logged in as: <strong>{this.props.result.user.username}</strong>. &nbsp; &nbsp;
      <Button buttonSize={Button.SIZE.SMALL} buttonStyle={Button.STYLE.DEFAULT} handleClick={this.logout}>Logout &rarr;</Button>
    </div>;
  }
}

export default connect(UserHeader);