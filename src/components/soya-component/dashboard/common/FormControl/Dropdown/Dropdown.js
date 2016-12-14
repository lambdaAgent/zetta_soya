import React, { PropTypes }  from 'react';

// Version of checkbox
import PlainDropdown from './PlainDropdown';
import SoyaDropdown from './SoyaDropdown';

class DropdownWrapper extends React.Component {
  static get propTypes() {
    return SoyaDropdown.propTypes;
  }

  render() {
    let Element = PlainDropdown;
    if (this.props.form) {
      Element = SoyaDropdown;
    }

    return <Element {...this.props} />
  }
}

export default DropdownWrapper;
