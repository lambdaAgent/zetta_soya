import React, { PropTypes }  from 'react';

import PlainTextArea from './PlainTextArea';
import SoyaTextArea from './SoyaTextArea';

class TextAreaWrapper extends React.Component {
  static get propTypes() {
    return SoyaTextArea.propTypes;
  }

  render() {
    let Element = PlainTextArea;
    if (this.props.form) {
      Element = SoyaTextArea;
    }

    return <Element {...this.props} />
  }
}

export default TextAreaWrapper;
