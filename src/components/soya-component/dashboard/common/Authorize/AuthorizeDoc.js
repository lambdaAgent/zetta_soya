import React from 'react';

export default class AuthorizeDoc extends React.Component {
  render() {
    return <div>
      <h3>Usage</h3>
      <p>
        Wrap your page's components in this component so that it won't be
        rendered if the user hasn't logged in yet. It will render the
        appropriate login component if user isn't logged in or the token has
        expired. If user has an active token, it will display its children
        components.
      </p>
      <p>
        This component will also try to refresh token before it expire. You
        can set the threshold with <code>refreshTokenThreshold</code> prop (in
        minutes).
      </p>
      <p>
        Since the actual component code is sent back to client, don't use this
        component to safeguard sensitive data that isn't fetched using back-end
        API with authorized tokens! However, this scenario should be extremely
        rare, since every sensitive information should be protected by
        authorization anyway (resulting in back-end API call).
      </p>
      <h3>Logout</h3>
      <p>
        ...
      </p>
    </div>;
  }
}