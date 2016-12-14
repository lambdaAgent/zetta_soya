import React from 'react';

export default class ComponentDoc extends React.Component {
  render() {
    return <div>
      <h3>PROPERTY</h3>
      <p>
      	<ul>
      		<li>
      			Data
      			<p>You can filled this with a object which have <b>value</b> and <b>text (optional)</b> property</p>
      		</li>
      		<li>
      			MaxValue
      			<p>You have to filled this with a max value from your dataset</p>
      		</li>
      		<li>
      			MinValue
      			<p>You have to filled this with a min value from your dataset</p>
      		</li>
      	</ul>
      </p>
    </div>;
  }
}