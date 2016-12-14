import React from 'react';

class ComponentDoc extends React.Component {
  render() {
    return (
      <div>
        <p>This is not-so-simple Table component.</p>
        <h4>Props explanation</h4>

        <h5>tableBody</h5>
        <p>Accept array of object, for example: <code>{"[{ id: '1', name: 'Sherlock Holmes', occupation: ['Detective', 'Unknown'] }]"}</code></p>
        <hr />
        <h5>fields</h5>
        <p>Define what key from the tableBody should be displayed. Accept array of string and/or <i><b>fieldObject</b></i>: {"{ field: '', label: '' }"}</p>
        <p>Key field of <i><b>fieldObject</b></i> understand nested object/array access using dot (.), for example: use {"{ field: 'occupation.0', label: 'First job' }"} to access first value of occupation key.</p>
        <hr />
        <h5>tableActions</h5>
        <p>Define additional action control for each row or table data.</p>
        <p>Accept array of <i><b>tableActionObject</b></i>: </p>
        <ul>
          <li>{"<a>"} tag: {"{ href: function(data) => string, label: '', props: {} }"}</li>
          <li>Custom component: {"{ action: function(data), label: '', component: Button, props: {} }"}</li>
        </ul>

      </div>
    );
  }
}

export default ComponentDoc;
