import React from 'react';
import connect from 'soya/lib/data/redux/connect';
import scope from 'soya/lib/scope';
import {isEqualShallowArray} from 'soya/lib/data/redux/helper';

import unauthorized from '../ErrorState/unauthorized.png';
import erroralert from '../ErrorState/error-alert.png';
import LoginBox from './LoginBox.js';
import BallClipRotate from '../Loading/BallClipRotate.js';
import UserSegment from '../../../base/segments/UserSegment.js';

class Authorize extends React.Component {
  static getSegmentDependencies() {
    return [UserSegment];
  }

  static subscribeQueries(props, subscribe) {
    subscribe(UserSegment.id(), 'user', 'user');
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Only update if user state changes. We assume that requiredPrivileges
    // props will never change (there's no reason why it should). We also don't
    // need to update if only token or tokenExpiry has changed. As long as the
    // state doesn't change, we don't need to update.
    return !!this.state.expired != nextState.expired || (
      this.props.result.user == null && nextProps.result.user != null ||
      (
        this.props.result.user.state != nextProps.result.user.state ||
        this.props.result.user.tokenLastUpdated != nextProps.result.user.tokenLastUpdated ||
        this.props.result.user.username != nextProps.result.user.username ||
        // TODO: Convert privileges to map at UserSegment, easier to compare without ordering.
        !isEqualShallowArray(this.props.result.user.privileges, nextProps.result.user.privileges)
      )
    );
  }

  componentWillMount() {
    var self = this;
    var mountTime = (new Date()).getTime();
    this.setExpiredState(this.props, mountTime);
    // We set an interval checking the expiry time of the token. If the token is
    // about to expire, we dispatch refresh token action. If the token
    // has expired, we'll set state, so that this component will render the
    // appropriate login window.
    if (scope.client) {
      // Do check every 20 seconds. This function should run faster than 20
      // seconds, so using interval should be fine.
      this.intervalId = setInterval(() => {
        if (self.props.result.user == null || self.props.result.user.token == null) {
          return;
        }

        var now = (new Date()).getTime();
        if (this.setExpiredState(self.props, now)) return;

        // We should refresh before token has expired, so we check for 1 minute
        // before it actually expiring.
        var refreshTokenMinutes = this.props.refreshTokenThreshold || 5;
        var shouldRefresh = (self.props.result.user.tokenExpiry - refreshTokenMinutes * 60 * 1000) <= now;
        if (shouldRefresh) {
          self.props.context.store.dispatch(UserSegment.getActionCreator().refreshToken());
        }
      }, 20000);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setExpiredState(nextProps);
  }

  componentWillUnmount() {
    if (scope.client) clearInterval(this.intervalId);
  }

  /**
   * Returns true if state is set to expired, false otherwise.
   */
  setExpiredState(props, now) {
    if (props.result.user != null && props.result.user.token != null) {
      var hasExpired = (props.result.user.tokenExpiry - 60 * 1000) <= now;
      if (hasExpired) {
        this.setState({expired: true});
        return true;
      }
    }
    // If no token or hasn't expired, set state.
    this.setState({expired: false});
    return false;
  }

  render() {
    var shouldDisplayLogin = false, message, icon = unauthorized,
      username = null;
    if (this.props.result.user == null) {
      return <div>
        Loading...
        <BallClipRotate color="green" />
      </div>;
    } else if (this.props.result.user.state == UserSegment.STATES.NOT_LOGGED_IN) {
      shouldDisplayLogin = true;
      message = 'Please provide your username and password.';
    } else if (this.props.result.user.state == UserSegment.STATES.TOKEN_FAILURE) {
      shouldDisplayLogin = true;
      icon = erroralert;
      message = 'Token failure. Please re-login.';
    } else if (this.state.expired) {
      shouldDisplayLogin = true;
      message = 'Your token has expired. Please re-login.';
      username = this.props.result.user.username;
    }

    if (shouldDisplayLogin) {
      return <LoginBox context={this.props.context} icon={icon}
                       siteName={this.props.siteName} message={message}
                       username={username} />;
    }

    return <div>{this.props.children}</div>;
  }
}

export default connect(Authorize);