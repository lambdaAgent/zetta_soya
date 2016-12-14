import React, { PropTypes }  from 'react';

// Version of Radio
import PlainRadio from './PlainRadio';
import SoyaRadioGroup from './SoyaRadioGroup';

class RadioWrapper extends React.Component {
  static get propTypes() {
    return SoyaRadioGroup.propTypes;
  }

  render() {
    let Element = PlainRadio;
    if (this.props.form) {
      Element = SoyaRadioGroup;
    }

    return <Element {...this.props} />
  }
}

export default RadioWrapper;
