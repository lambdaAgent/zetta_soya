import React from 'react';

class ComponentDoc extends React.Component {
  render() {
    return (
      <div>
        <h3>Side Navigation</h3>
        <h4>Props</h4>
        <ul>
          <li>menuData: Array of <code>menuGroup</code></li>
        </ul>
        <hr />
        <p><code>menuGroup</code> is an object consist of: <pre><code>{'{ title: string, icon: iconClass, links: [menuItem] }'}</code></pre></p>
        <hr />
        <p><code>menuItem</code> is an object which can be: </p>
        <ul>
          <li>a React {'<Element />'}, or</li>
          <li><code>{'{ title: "", href: "" }'}</code></li>
        </ul>
      </div>
    );
  }
}

export default ComponentDoc;
