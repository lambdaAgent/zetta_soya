import React from 'react';
import createField from 'soya/lib/data/redux/form/createField';
import Autosuggest from 'react-autosuggest';
import style from './AutoCompleteField.css';

class AutocompleteField extends React.Component {
  static get propTypes() {
    return {
      form: React.PropTypes.object,
      context: React.PropTypes.object,
      value: React.PropTypes.string,
      label: React.PropTypes.string,
      isDisabled: React.PropTypes.bool,
      errorMessages: React.PropTypes.array,
      options: React.PropTypes.array.isRequired,
    };
  }

  static get defaultProps() {
    return {
      options: [],
    };
  }

  static connectId() {
    return 'AutoCompleteField';
  }

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: this.props.options,
    };
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue,
    });
    this.props.handleChange(event.target.value, event);
  }

  handleChange(event) {
    this.props.handleChange(event.target.value, event);
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const regex = new RegExp(`${inputValue}`, 'i');
    return this.props.options.filter((option) => (regex.test(option.label) || inputValue == option.value));
  }

  getSuggestionValue(suggestion) {
    return suggestion.label;
  }

  renderSuggestion(suggestion) {
    return (
      <span>{suggestion.label}</span>
    );
  }

  onSuggestionsUpdateRequested({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionSelected({ suggestionValue }) {
    this.props.handleChange(suggestionValue);
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: this.props.placeholder,
      value,
      onChange: this.onChange.bind(this),
      handleChange: this.handleChange.bind(this),
    };

    const theme = {
      container:            style['react-autosuggest__container'],
      containerOpen:        style['react-autosuggest__container--open'],
      input:                style['react-autosuggest__input'],
      suggestionsContainer: style['react-autosuggest__suggestions-container'],
      suggestionsList:      style['react-autosuggest__suggestions-list'],
      suggestion:           style['react-autosuggest__suggestion'],
      suggestionFocused:    style['react-autosuggest__suggestion--focused'],
      sectionContainer:     style['react-autosuggest__section-container'],
      sectionTitle:         style['react-autosuggest__section-title']
    };

    return (
      <div className={style.formGroup}>
        {this.props.label ? <label>{this.props.label}</label> : null}
        <Autosuggest
          theme={theme}
          suggestions={suggestions}
          getSuggestionValue={this.getSuggestionValue.bind(this)}
          onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested.bind(this)}
          renderSuggestion={this.renderSuggestion.bind(this)}
          shouldRenderSuggestions={() => true}
          focusFirstSuggestion={true}
          onSuggestionSelected={this.onSuggestionSelected.bind(this)}
          inputProps={inputProps} />
      </div>
    );
  }
}

export default createField(AutocompleteField);