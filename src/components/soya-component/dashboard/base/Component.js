import React from 'react';

export class ContextComponent extends React.Component {
  constructor(props) {
    super(props);
    if (props.context) {
      this.store = props.context.reduxStore;
      this.config = props.context.config;
    }
  }
}

const Component = {
  ContextComponent
};

export default Component;
