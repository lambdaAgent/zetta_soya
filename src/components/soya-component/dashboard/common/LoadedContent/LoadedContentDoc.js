import React from 'react';

export default class LoadedContentDoc extends React.Component {
  render() {
    return <div>
      <h3>Usage</h3>
      <p>
        Wrap components that render based on <code>BaseService</code> result
        in this component. This component will render loading if the result
        hasn't been loaded yet, and will render <code>ErrorState</code>
        component if the response is not <code>OK</code>.
      </p>
      <h3>Drawback</h3>
      <p>
        You'll have to avoid referencing the actual response data when rendering
        the wrapped component, otherwise you'll be greeted with 'x is undefined'
        error. You can get around it using ternary and <code>LoadedContent.check(response)</code>,
        as demonstrated with the example.
      </p>
    </div>;
  }
}