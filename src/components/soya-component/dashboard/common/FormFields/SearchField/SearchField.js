import React from 'react';
import createField from 'soya/lib/data/redux/form/createField';

import icons from '../../Icons/Icons';

import style from './SearchField.css';

export class SearchField extends React.Component {
  static connectId() {
    return 'SearchField';
  }

  componentWillMount() {
    this.prevValidatedValue = null;
  }

  render() {
    return (
      <div className={style.searchInputGroup + ' ' + (this.props.block ? style.block : '')}>
        <input className={style.searchInput}
               type='search'
               onKeyDown={(e) => {
                 if (e.keyCode == 13) { this.props.handleSearchSubmit(); }
               }}
               placeholder={this.props.label ? this.props.label : 'search'}
               value={this.props.value}
               disabled={this.props.isDisabled}
               onChange={this.handleChange.bind(this)}
        />
        <button className={style.searchBtn} onClick={this.props.handleSearchSubmit}>
          <i className={`${icons.main} ${icons.search}`} />
        </button>
        {this.props.isValidating ? <span>validating...</span> : null}
        {this.props.errorMessages.length > 0 ? <span>{this.props.errorMessages[0]}</span> : null}
      </div>
    );
  }

  handleChange(event) {
    // Always run async validation if value is changed at least once.
    this.prevValidatedValue = null;
    this.props.handleChange(event.target.value, event);
    this.props.handleSearchChange(event.target.value);
  }

}

export default createField(SearchField);