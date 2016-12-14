import React from 'react';

class ComponentDoc extends React.Component {
  render() {
    return (
      <div>
        <p>Dropdown component works with either defining option tag as a children or using options props.</p>
        <p>Options props accept array of <i><b>optionObject</b></i>: <code>{"[{ text: '', value: '' }]"}</code></p>
      </div>
    );
  }
}

export default ComponentDoc;
