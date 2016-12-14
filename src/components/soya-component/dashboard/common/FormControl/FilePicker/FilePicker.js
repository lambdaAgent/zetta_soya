import React, { PropTypes }  from 'react';

import PlainFilePicker from './PlainFilePicker';
import SoyaFilePicker from './SoyaFilePicker';

class FilePickerWrapper extends React.Component {
  static get propTypes() {
    return SoyaFilePicker.propTypes;
  }

  render() {
    let Element = PlainFilePicker;
    if (this.props.form) {
      Element = SoyaFilePicker;
    }

    return <Element {...this.props} />
  }
}

export default FilePickerWrapper;
