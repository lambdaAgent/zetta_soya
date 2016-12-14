import React from 'react';
import Dropdown from './Dropdown';
import FormControl from '../FormControl';

class UTCDropdown extends FormControl {
  static get listUTC() {
    return [
      ['0', '+00 Universal Time'],
      ['420', '+07 Jakarta, Bangkok, Hanoi (WIB)'],
      ['480', '+08 Manila (WITA)'],
      ['540', '+09 Maluku, West Papua, North Maluku (WIT)']
    ];
  }

  _getPropAttributes() {
    const props = super._getPropAttributes();
    props.className = this.formStyle.formControl + (props.className ? ' ' + props.className : '');

    delete props.style;
    return props;
  }

  render() {
    const utcs = UTCDropdown.listUTC;
    return (
      <Dropdown {...this._getPropAttributes()}>
        {utcs.map((utc, idx) => {
          return <option key={idx} value={utc[0]}>{utc[1]}</option>;
        })}
      </Dropdown>
    );
  }
}

export default UTCDropdown;
