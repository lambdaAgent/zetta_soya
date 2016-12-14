import React from 'react';
import Dropdown from './Dropdown';
import FormControl from '../FormControl';

class PlatformDropdown extends FormControl {
  static get listPlatform() {
    return [
      ['IOS', 'IOS'],
      ['ANDROID', 'ANDROID']
    ];
  }

  _getPropAttributes() {
    const props = super._getPropAttributes();
    props.className = this.formStyle.formControl + (props.className ? ' ' + props.className : '');

    delete props.style;
    return props;
  }

  render() {
    const platforms = PlatformDropdown.listPlatform;
    return (
      <Dropdown {...this._getPropAttributes()}>
        {platforms.map((utc, idx) => {
          return <option key={idx} value={utc[0]}>{utc[1]}</option>;
        })}
      </Dropdown>
    );
  }
}

export default PlatformDropdown;
