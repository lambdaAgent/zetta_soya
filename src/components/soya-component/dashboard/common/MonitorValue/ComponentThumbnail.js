import React from 'react';

import MonitorValue from './MonitorValue';

const data1 = { value: 100 };
const data2 = { value: 70 };
const data3 = { value: 15 };
const data4 = { value: 105 };
const data5 = { text: 'ON', value: 100 };

const minValue = -5;
const maxValue = 105;

export default class ComponentThumbnail extends React.Component {
  render() {
    return (
      <div>
        <MonitorValue data={data1} minValue={minValue} maxValue={maxValue} />
        <br/>
        <MonitorValue data={data2} minValue={minValue} maxValue={maxValue} />
        <br/>
        <MonitorValue data={data3} minValue={minValue} maxValue={maxValue} />
        <br/>
        <MonitorValue data={data4} minValue={minValue} maxValue={maxValue} />
        <br/>
        <MonitorValue data={data5} minValue={minValue} maxValue={maxValue} />
      </div>
    )
  }
}