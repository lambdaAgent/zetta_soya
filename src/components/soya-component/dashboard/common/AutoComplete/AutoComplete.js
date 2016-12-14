import React from 'react';
import style from './AutoComplete.css';
import icons from '../Icons/Icons';

class AutoComplete extends React.Component {

  static get propTypes() {
    return {
      suggestions: React.PropTypes.array,
      block: React.PropTypes.bool,
      label: React.PropTypes.string,
      handleSuggestionSelect: React.PropTypes.func,
    };
  }

  static get defaultProps() {
    return {
      suggestions: [],
    };
  }

  handleEnterKey() {
    if (this.props.suggestions.length > 0)
      this.handleSuggestionClicked(this.props.suggestions[0]);
  }

  handleSuggestionClicked(suggestion) {
    this.props.handleSuggestionSelect(suggestion);
  }

  handleChange(term) {
    console.log('autocomplete;', term);
    this.props.handleChange(term);
  }

  render() {
    return (
      <div className={style.searchInputGroup + ' ' + (this.props.block ? style.block : '')}>
        <input className={style.searchInput}
               type='search'
               onKeyDown={(e) => {
                 if (e.keyCode == 13) { this.handleEnterKey(); }
               }}
               placeholder={this.props.label ? this.props.label : 'search'}
               value={this.props.value}
               onChange={(e) => this.handleChange(e.target.value)}
        />
        <button className={style.searchBtn} onClick={this.props.handleSearchSubmit}>
          <i className={`${icons.main} ${icons.search}`} />
        </button>
        { !this.props.suggestions || this.props.suggestions.length == 0 ? null :
          <div className={style.suggestionWrapper}>
            {
              this.props.suggestions.map((suggestion) => {
                return (
                  <div className={style.suggestion} onClick={this.handleSuggestionClicked.bind(this, suggestion)}>
                    {suggestion.desc}<br/><span className={style.suggestionId}>{suggestion.id}</span>
                  </div>)
              })
            }
          </div>
        }
      </div>
    );
  }
}

export default AutoComplete;
