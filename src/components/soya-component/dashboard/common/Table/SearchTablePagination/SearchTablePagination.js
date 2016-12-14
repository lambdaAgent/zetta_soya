import React, { PropTypes } from 'react';
import Component from '../../../base/Component';

import { TextBox } from '../../FormControl/ReduxFormControl';
import SimpleTable from '../SimpleTable/SimpleTable';
import Pagination from '../../Pagination/Pagination';
import BasicButton from '../../Button/BasicButton';

// CSS
import layout from '../../../shared/layout.mod.css';
import local from './SearchTablePagination.mod.css';

class SearchTablePagination extends Component.ContextComponent {
  static get propTypes() {
    return {
      form: PropTypes.object.isRequired,

      context: PropTypes.object.isRequired,
      // Array of object
      tableData: PropTypes.array.isRequired,
      // { totalRow, rowCount, currentPage }
      filter: PropTypes.object.isRequired,
      // [{ action: this.action1.bind(this), type: 'default', label: 'Edit' }, { action: this.action2.bind(this), type: 'cancel', label: 'Remove' }]
      tableActions: PropTypes.array,
      // ['name', { field: 'desktopWeb.containerElement', label: 'Desktop Web' }, 'mobileWeb.containerElement', 'placeholders', 'lastModifiedByUser']
      // Support string || { field, label } object
      fields: PropTypes.array,
      // Will be used as label for search
      dataName: PropTypes.string,
      // Function that handle filter modification
      setQuery: PropTypes.func.isRequired,
      customFilter: PropTypes.element
    };
  }

  handleSearchTerm(e) {
    if (e.keyCode === 13) {
      this.search();
    }
  }

  search() {
    this.props.form.submit(res => {
      const values = res.values;
      const query = { currentPage: 1  };
      for (const i in values) {
        if (!values.hasOwnProperty(i) || values[i] === null) continue;
        query[i] = values[i];
      }
      this.props.setQuery(query);
    });
  }

  _renderFilter(tableData, form, dataName, context) {
    if (this.props.customFilter) {
      return this.props.customFilter;
    } else {
      return (
        <div className={layout.clearfix}>
          <TextBox style={{ width: 300, float: 'left', marginRight: 5 }} disabled={(tableData === null)} onKeyUp={this.handleSearchTerm.bind(this)} form={form} name='searchString' placeholder={`Filter ${dataName || ''}...`} context={context} />
          <BasicButton buttonStyle={BasicButton.STYLE.BLUE} onClick={this.search.bind(this)}>Filter</BasicButton>
        </div>
      );
    }
  }

  render() {
    const {
      tableData,
      filter,
      tableActions,
      form,
      context,
      dataName,
      fields
    } = this.props;

    return (
      <div>
        <div className={layout.panel}>
          <div className={layout.horizontalGroup}>
            <div className={layout.horizontalGroupRow}>
              {this._renderFilter(tableData, form, dataName, context)}
            </div>
          </div>
        </div>
        <div className={layout.panel}>
          <div className={`${local.pagination} ${local.right} ${local.top}`}><Pagination filter={filter} actionHandler={this.props.setQuery} /></div>
          <SimpleTable fields={fields} tableBody={tableData} tableActions={tableActions} />
          <div className={`${local.pagination} ${local.right} ${local.bottom}`}><Pagination filter={filter} actionHandler={this.props.setQuery} /></div>
        </div>
      </div>
    );
  }
}

export default SearchTablePagination;
