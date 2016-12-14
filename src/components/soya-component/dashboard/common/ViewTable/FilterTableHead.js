import React from 'react';
import update from 'react-addons-update';
import FormSegment from 'soya/lib/data/redux/form/FormSegment';

import ActionSelect from '../ActionSelect/ActionSelect';
import Button from '../Button/Button.js';
import DateTimePickerField from '../../external/DateTimePicker/DateTimePicker.js'
import Dropdown from '../FormControl/Dropdown/Dropdown.js';
import Textbox from '../FormControl/TextBox/TextBox.js';
import style from './style.mod.css';
import TYPE from './type.js';

const DATE_TIME_MIN_SUFFIX = 'Min';
const DATE_TIME_MAX_SUFFIX = 'Max';

export default class FilterTableHead extends React.Component {
  componentWillMount() {
    this.options=[];
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBulkSelect = this.handleBulkSelect.bind(this);
    this.submit = this.submit.bind(this);
    this.actions = this.props.context.reduxStore.register(FormSegment);
    this.writeSearchSpecToForm(this.props);
    this.addFunctionBulkSelect(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.writeSearchSpecToForm(nextProps);
    this.addFunctionBulkSelect(nextProps);
  }

  writeSearchSpecToForm(props) {
    let updates = [], filter;
    props.schema.forEach((column) => {
      filter = props.searchSpec.filters[column.id];
      let minTimestamp = null, maxTimestamp = null, value = null;
      if (filter != null) {
        minTimestamp = filter.minTimestamp;
        maxTimestamp = filter.maxTimestamp;
        value = filter.value;
      }
      switch (column.type) {
        case TYPE.DATE_TIME:
          updates.push({
            fieldName: column.id + DATE_TIME_MIN_SUFFIX,
            value: minTimestamp
          });
          updates.push({
            fieldName: column.id + DATE_TIME_MAX_SUFFIX,
            value: maxTimestamp
          });
          break;
        case TYPE.ENUM:
          updates.push({
            fieldName: column.id,
            value: value
          });
          break;
        case TYPE.STRING:
          updates.push({
            fieldName: column.id,
            value: value
          });
          break;
      }
    });

    props.context.reduxStore.dispatch(this.actions.setValues(
      props.form.getFormId(), updates));
  }

  addFunctionBulkSelect(props){
    let list;
    for(let i=0; i < props.bulkSelect.length; i++){
      list = { 
        text: props.bulkSelect[i].title, 
        func: this.handleBulkSelect.bind(this, props.bulkSelect[i].filter) 
      };
      this.options.push(list);
    }
  }

  handleBulkSelect(func){
    let filter = func;
    let updates = this.props.data.map((row) => {
      let active = filter(row);
      return {
        fieldName: row[this.props.idColumn].value,
        value: active
      };
    }); 
    this.props.context.reduxStore.dispatch(this.actions.setValues(
      this.props.checkboxForm.getFormId(), updates));
  }

  render() {
    const showBulkSelect = (this.options.length > 0) ? <ActionSelect actions={this.options} title='Bulk'/> : [];
    return (
      <thead className={style.filter}>
        <tr>
          <th>
            <Button buttonSize={Button.SIZE.BLOCK} buttonStyle={Button.STYLE.GREEN} onClick={this.handleSubmit}>Search</Button>
            {showBulkSelect}
          </th>
          {this.props.schema.map((column) => <th key={`filter-${column.id}`}><FilterComponent column={column} context={this.props.context} form={this.props.form} /></th>) }
        </tr>
      </thead>
    );
  }

  /*handleBulkSelect(event) {
    let title = event.target.value;
    let i; var filter;
    for (i = 0; i <= this.props.bulkSelect.length; i++) {
      if (this.props.bulkSelect[i].title == title) {
        filter = this.props.bulkSelect[i].filter;
        break;
      }
    }
    if (filter == null) return;

    let updates = this.props.data.map((row) => {
      let active = filter(row);
      return {
        fieldName: row[this.props.idColumn].value,
        value: active
      };
    });

    this.props.context.reduxStore.dispatch(this.actions.setValues(CHECKBOX_FORM, updates));
  }*/

  handleSubmit() {
    this.props.form.submit(this.submit.bind(this));
  }

  submit(result) {
    const { schema } = this.props;
    let filters = {}, i, column;
    for (i = 0; i < schema.length; i++) {
      column = schema[i];
      switch (column.type) {
        case TYPE.DATE_TIME:
          let minDateKey = column.id + DATE_TIME_MIN_SUFFIX;
          let maxDateKey = column.id + DATE_TIME_MAX_SUFFIX;
          if (result.values[minDateKey] == null &&
            result.values[maxDateKey] == null) continue;
          filters[column.id] = {
            type: TYPE.DATE_TIME,
            minTimestamp: result.values[minDateKey],
            maxTimestamp: result.values[maxDateKey]
          };
          break;
        case TYPE.ENUM:
          if (result.values[column.id] == null) continue;
          filters[column.id] = {
            type: TYPE.ENUM,
            value: result.values[column.id]
          };
          break;
        case TYPE.STRING:
          if (result.values[column.id] == null) continue;
          filters[column.id] = {
            types: TYPE.STRING,
            value: result.values[column.id]
          };
          break;
      }
    }

    let updatedSearchSpec = update(this.props.searchSpec, {
      filters: {$set: filters}
    });
    this.props.onSearchSpecChange(updatedSearchSpec);
  }
}

class FilterComponent extends React.Component {
  render() {
    const { column, context, form } = this.props;
    if (column.type === TYPE.DATE_TIME) {
      return (
        <div>
          <DateTimePickerField name={column.id + 'Min'} defaultText='' form={form} context={context} />
          <DateTimePickerField name={column.id + 'Max'} defaultText='' form={form} context={context} />
        </div>
      );
    }

    if (column.type === TYPE.STRING) {
      return (
        <div>
          <Textbox name={column.id} form={form} context={context} />
        </div>
      );
    }

    if (column.type === TYPE.ENUM) {
      let options= [];

      options[0] = {
        value: null,
        label: ''
      };
      
      for (let i =0; i < column.options.length; i++) {
        options[i+1] = {
          value: column.options[i],
          label: column.options[i]
        };
      }

      return (
        <div>
          <Dropdown name={column.id} form={form} context={context}>
            {options.map((option, index) => <option key={`bulk-${option.value}`} value={option.value}>{option.label}</option>)}
          </Dropdown>
        </div>
      );
    }

    throw new Error('Unknown column type: ' + column.type);
  }
}