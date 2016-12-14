import React, { PropTypes, Component } from 'react';

class GoogleLogin extends Component {
  static get propTypes() {
    return {
      clientId: PropTypes.string.isRequired,
      buttonText: PropTypes.string,
      offline: PropTypes.bool,
      scope: PropTypes.string,
      cssClass: PropTypes.string,
      redirectUri: PropTypes.string,
      cookiePolicy: PropTypes.string,
      loginHint: PropTypes.string,
      children: React.PropTypes.node,
    };
  }

  static get defaultProps(){
    return {
      buttonText: 'Login with Google',
      scope: 'profile',
      redirectUri: 'postmessage',
      cookiePolicy: 'single_host_origin',
    };
  }

  constructor(props) {
    super(props);
    this.onBtnClick = this.onBtnClick.bind(this);
  }

  componentWillMount() {
    this.state = {status: 'loading'};
  }

  componentDidMount() {
    const { clientId, scope, cookiePolicy, loginHint } = this.props;
    ((d, s, id, cb) => {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      js = d.createElement(s);
      js.id = id;
      js.src = '//apis.google.com/js/platform.js';
      fjs.parentNode.insertBefore(js, fjs);
      js.onload = cb;
    })(document, 'script', 'google-login', this.handleClientLoad.bind(this));
  }

  handleClientLoad() {
    window.gapi.load('auth2', () => {
      const { clientId, scope } = this.props;
      window.gapi.auth2.init({
        client_id: clientId,
        scope: scope
      }).then(() => {
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(this.handleIsSignedInChanged.bind(this));
        this.props.handleInit();
        this.handleIsSignedInChanged(window.gapi.auth2.getAuthInstance().isSignedIn.get());
      })
    });
  }

  onBtnClick() {
    const auth2 = window.gapi.auth2.getAuthInstance();
    if (auth2.isSignedIn.get()) {
      auth2.signOut();
    } else {
      auth2.signIn();
    }
  }

  handleIsSignedInChanged(isSignedIn) {
    if (isSignedIn) {
      this.setState({status: 'authenticated'});
      this.props.handleSignIn();
    } else {
      this.setState({status: 'notAuthenticated'});
      this.props.handleSignOut();
    }
  }

  render() {
    const style = {
      display: 'inline-block',
      background: '#d14836',
      color: '#fff',
      width: 190,
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 2,
      border: '1px solid transparent',
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'Roboto',
    };
    const { cssClass, children } = this.props;

    var buttonText = '?';
    if (this.state.status === 'loading') buttonText = 'loading...';
    else if (this.state.status === 'notAuthenticated') buttonText = 'Sign in with Google';
    else if (this.state.status === 'authenticated') buttonText = 'Sign Out';

    return (
      <button
        className={ cssClass }
        onClick={ this.onBtnClick.bind(this) }
        style={ cssClass ? {} : style }
      >
        {buttonText}
      </button>
    );
  }
}

export default GoogleLogin;