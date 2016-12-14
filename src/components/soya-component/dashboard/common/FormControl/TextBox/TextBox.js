import React, { PropTypes }  from 'react';

import PlainTextBox from './PlainTextBox';
import SoyaTextBox from './SoyaTextBox';

class TextBox extends React.Component {
  static get propTypes() {
    return SoyaTextBox.propTypes;
  }

  render() {
    let Element = PlainTextBox;
    if (this.props.form) {
      Element = SoyaTextBox;
    }

    return <Element {...this.props} />
  }
}

export default TextBox;
