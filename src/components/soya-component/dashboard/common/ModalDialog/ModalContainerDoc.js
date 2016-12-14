import React from 'react';

export default class ModalContainerDoc extends React.Component {
  render() {
    return <div>
      <h3>Usage</h3>
      <ul>
        <li>
          Create an instance of <code>ModalRegister</code>. This object registers
          modal dialog components that other components can trigger to display.
          You will inject this instance to <code>ModalContainer</code> and
          components that wish to create modal dialogs.
        </li>
        <li>
          Put <code>ModalContainer</code> at your page's component. It needs to be
          there since modal dialogs are supposed to overlay on top of everything
          else.
        </li>
        <li>
          You can use emitter inside context to send and receive events between
          component triggering the modal and the modal component itself.
        </li>
      </ul>
      <p>
        In this example, we're using a sample modal component to show how it
        works.
      </p>
      <h3>Modal Component</h3>
      <p>
        Your modal component will be given the data provided at trigger as props,
        plus <code>props.removeSelf</code> function to remove the modal itself.
      </p>
    </div>;
  }
}