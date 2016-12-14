import React from 'react';
import ViewTable from './ViewTable.js';
import DefaultExtrasRenderer from './DefaultExtrasRenderers.js';
import { COLOR_NAMES } from '../../base/colors.js';
import Button from '../Button/Button.js';
import TYPE from './type.js';

const searchSpec = {
  page: 1,
  rowCount: 20,
  sortColumn: 'date',
  sortType: 'DESCENDING',
  filters: {
    date: {
      type: TYPE.DATE_TIME,
      minTimestamp: 1476879555439,
      maxTimestamp: 1497874776175
    },
    productType: {
      type: TYPE.STRING,
      value: 'DOMESTIC'
    }
  }
};

const colorMapping = {
  columnId: 'importance',
  map: {
    IMPORTANT_P0: COLOR_NAMES.RED_DARKER,
    IMPORTANT_P1: COLOR_NAMES.RED_DARK,
    IMPORTANT_P2: COLOR_NAMES.RED,
    IMPORTANT_P3: COLOR_NAMES.ORANGE,
    IMPORTANT_P4: COLOR_NAMES.YELLOW,
    IMPORTANT_P5: COLOR_NAMES.GREEN,
    IMPORTANT_P6: COLOR_NAMES.GRAY,
    IMPORTANT_P7: COLOR_NAMES.BLUE
  }
};

const totalRows = 1720;

const schema = [
  {
    type: TYPE.DATE_TIME,
    title: 'Date',
    id: 'date'
  },
  {
    type: TYPE.ENUM,
    title: 'Product Type',
    id: 'productType',
    options: [
      'DOMESTIC',
      'INTERNATIONAL'
    ]
  },
  {
    type: TYPE.STRING,
    title: 'Transaction ID',
    id: 'transactionId'
  },
  {
    type: TYPE.ENUM,
    title: 'Importance',
    options: [
      'IMPORTANT_P0',
      'IMPORTANT_P1',
      'IMPORTANT_P2',
      'IMPORTANT_P3',
      'IMPORTANT_P4',
      'IMPORTANT_P5',
      'IMPORTANT_P6',
      'IMPORTANT_P7'
    ],
    id: 'importance'
  },
  {
    type: TYPE.DATE_TIME,
    title: 'Expiration',
    id: 'expiration'
  }
];

const idColumn = 'transactionId';

const data = [
  {
    date: { value: '21/12/16' },
    productType: { value: 'DOMESTIC' },
    transactionId: {
      value: '1274873201',
      extras: [
        {
          renderer: 'NOTES',
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident tempora iusto inventore, cum dicta animi facilis ipsam ipsa quidem, veritatis nostrum illo, nihil consequuntur quia, consequatur velit neque cupiditate explicabo.'
        },
        {
          renderer: 'TAG',
          values: ['MANUAL']
        }
      ]
    },
    importance: { value: 'IMPORTANT_P0' },
    expiration: { value: '21/12/16' }
  },
  {
    date: { value: '21/12/16' },
    productType: { value: 'INTERNATIONAL' },
    transactionId: { value: '1274873202' },
    importance: { value: 'IMPORTANT_P1' },
    expiration: { value: '21/12/16' }
  },
  {
    date: { value: '21/12/16' },
    productType: { value: 'DOMESTIC' },
    transactionId: {
      value: '1274873203',
      extras: [
        {
          renderer: 'TAG',
          values: ['MANUAL']
        }
      ]
    },
    importance: { value: 'IMPORTANT_P2' },
    expiration: { value: '21/12/16' }
  }
];

const bulkSelect = [
  { title: 'Clear', filter: () => { return false } },
  { title: 'All', filter: () => { return true; } },
  { title: 'Domestic', filter: (row) => { return row.productType.value === 'DOMESTIC'; } },
  { title: 'International', filter: (row) => { return row.productType.value === 'INTERNATIONAL'; } }
];

var onSearchSpecChange = function(searchSpec) {
  console.log('SEARCH SPEC', searchSpec);
};

var onRowClick = function(id, row) {
  console.log(id, row);
};

const NAMESPACE = 'vtTest';

export default class Component extends React.Component {
  getCheckedRows() {
    ViewTable.getCheckedRows(NAMESPACE, this.props.context.store).then((checkedRows) => {
      let concat = checkedRows.toString();
      alert('Checked rows:' + concat);
    });
  }

  render() {
    return <div>
      <Button buttonSize={Button.SIZE.DEFAULT} buttonStyle={Button.STYLE.PRIMARY} handleClick={this.getCheckedRows.bind(this)}>Get Checked Rows</Button>
      <hr />
      <ViewTable data={data} schema={schema} idColumn={idColumn}
                     searchSpec={searchSpec} colorMapping={colorMapping}
                     bulkSelect={bulkSelect} extras={DefaultExtrasRenderer}
                     totalRows={totalRows} onSearchSpecChange={onSearchSpecChange}
                     mini={false} context={this.props.context} onRowClick={onRowClick}
                     namespace={NAMESPACE} />
    </div>;
  }
}