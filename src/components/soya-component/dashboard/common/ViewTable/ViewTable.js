import React from 'react';
import Form from 'soya/lib/data/redux/form/Form';
import FormSegment from 'soya/lib/data/redux/form/FormSegment';
import update from 'react-addons-update';

import { SORT_TYPE_ASC, SORT_TYPE_DESC } from './const.js';
import ViewTableBody from './ViewTableBody.js';
import FilterTableHead from './FilterTableHead.js';
import Pagination from '../Pagination/Pagination.js';
import sitewide from '../../shared/sitewide.css';
import grid from '../../shared/grid.mod.css';
import layout from '../../shared/layout.mod.css';
import style from './style.mod.css';

const CHECKBOX_FORM_SUFFIX = '.vtCbForm';
const FILTER_FORM_SUFFIX = '.vtFtForm';

export default class ViewTable extends React.Component {
  _boundSortClickHandlers;
  _boundPageChangeHandler;
  
  static generateCheckboxFormId(namespace) {
    return `${namespace}${CHECKBOX_FORM_SUFFIX}`;
  }
  
  static generateFilterFormId(namespace) {
    return `${namespace}${FILTER_FORM_SUFFIX}`;
  }

  /**
   * Used to get rows that were checked by the user. Returns a promise that
   * resolves with the list of column IDs.
   */
  static getCheckedRows(namespace, store) {
    let cbFormId = ViewTable.generateCheckboxFormId(namespace);
    return new Promise((resolve, reject) => {
      store.query(FormSegment.id(), {formId: cbFormId, type: '*'}).then((data) => {
        let key, list = [];
        for (key in data) {
          if (!data.hasOwnProperty(key)) continue;
          if (data[key] == true) list.push(key);
        }
        resolve(list);
      }).catch(reject);
    });
  }

  componentWillMount() {
    this._boundSortClickHandlers = {};
    this._boundPageChangeHandler = this.updatePage.bind(this);
    this._actions = this.props.context.reduxStore.register(FormSegment);
    this.schemaChange(this.props.schema);
    this.generateForms(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.schema !== nextProps.schema) this.schemaChange(nextProps.schema);
    if (this.props.namespace !== nextProps.namespace) this.generateForms(nextProps);
  }

  generateForms(props) {
    this._filterForm = new Form(this.props.context.reduxStore, ViewTable.generateFilterFormId(props.namespace));
    this._checkboxForm = new Form(this.props.context.reduxStore, ViewTable.generateCheckboxFormId(props.namespace));
  }

  schemaChange(schema) {
    schema.map((row, i) => {
      this._boundSortClickHandlers[row.id] = this.updateSort.bind(this, row.id)
    });
  }

  updateSort(columnId) {
    let sortType = SORT_TYPE_ASC;
    if (this.props.searchSpec.sortColumn == columnId && sortType == this.props.searchSpec.sortType) {
      sortType = SORT_TYPE_DESC;
    }
    let updatedSearchSpec = update(this.props.searchSpec, {
      sortColumn: {$set: columnId},
      sortType: {$set: sortType}
    });
    this.props.onSearchSpecChange(updatedSearchSpec);
  }

  updatePage({ currentPage }) {
    let updatedSearchSpec = update(this.props.searchSpec, {
      page: {$set: currentPage}
    });
    this.props.onSearchSpecChange(updatedSearchSpec);
  }

  render() {
    const { schema, bulkSelect, mini, searchSpec, data } = this.props;
    if (searchSpec == null || data == null || schema == null) {
      // When data isn't loaded yet, render nothing.
      return null;
    }

    const hasBulkSelect = (bulkSelect.length > 0);
    const noSortClass = style['no-sort'];

    let styleTable = `${style.table} ${style['table-hover']} ${style['table-actionable']} ${style['table-sortable']} `;
    if (mini) {
      styleTable = `${style.table} ${style.mini} ${style['table-sortable']}`;
    }

    // TODO: Sort icon ascending and descending, ask Dhika.
    return <div style={{display: 'table'}}>
      <div className={layout.panel}>
        <table className={styleTable}>
          {/*<FilterTableHead context={this.props.context} form={this._filterForm}
                           schema={schema} bulkSelect={bulkSelect}
                           data={this.props.data} idColumn={this.props.idColumn}
                           searchSpec={this.props.searchSpec} checkboxForm={this._checkboxForm}
                           onSearchSpecChange={this.props.onSearchSpecChange} />
                           */}
          <thead>
            <tr>
              <th className={noSortClass}></th>
              {
                schema.map((column, i) => {
                  let cellClass = noSortClass;
                  if (searchSpec.sortColumn == column.id) {
                    cellClass = (this.props.searchSpec.sortType == 'DESCENDING') ? style['descending'] : style['ascending'];
                  }
                  return <th key={column.id} className={cellClass} onClick={this._boundSortClickHandlers[column.id]}>{ column.title }</th>;
                })
              }
            </tr>
          </thead>
          <ViewTableBody {...this.props} checkboxForm={this._checkboxForm} hasBulkSelect={hasBulkSelect} />
        </table>
      </div>
      <Pagination filter={{ totalRow: this.props.totalRows, rowCount: this.props.searchSpec.rowCount, currentPage: this.props.searchSpec.page }}
                  actionHandler={this._boundPageChangeHandler} />
    </div>;
  }
}