import React from 'react';
import createField from 'soya/lib/data/redux/form/createField';
import style from './ArrayField.css';

class ArrayField extends React.Component {

  static get propTypes() {
    return {
      form: React.PropTypes.object,
      context: React.PropTypes.object,
      value: React.PropTypes.array,
      label: React.PropTypes.string,
      isDisabled: React.PropTypes.bool,
      errorMessages: React.PropTypes.array,
      inline: React.PropTypes.bool,
    };
  }

  static get defaultProps() {
    return {
      value: [],
      inline: false,
    };
  }

  static connectId() {
    return 'ArrayField';
  }

  constructor(props) {
    super(props);
    this.state = {
      currentInput: null,
    }
  }

  handleChangeInput(event) {
    this.setState({
      currentInput: event.target.value,
    })
  }

  handleAddItem() {
    if (!this.state.currentInput) return;
    if (this.props.value == null) {
      this.props.handleChange([this.state.currentInput]);
    } else {
      this.props.handleChange(this.props.value.concat([this.state.currentInput]));
    }
    this.setState({ currentInput: '' })
  }

  handleRemoveItem(index) {
    if (index < 0) return;
    const newValue = this.props.value.slice(0, index).concat(this.props.value.slice(index + 1));
    this.props.handleChange(newValue);
  }

  render() {
    return (
      <table className={style.inlineWrapper}>
        <tbody>
          <tr>
            <td width={120}>{this.props.label ? <b>{this.props.label}</b> : null}</td>
            <td>
              <input type="text"
                     className={style.formControl}
                     disabled={this.props.isDisabled}
                     onChange={this.handleChangeInput.bind(this)}
                     value={this.state.currentInput}
                     onKeyDown={(e) => e.keyCode === 13 && this.handleAddItem()}
              />
              <button className={style.btnAdd} onClick={this.handleAddItem.bind(this)}>Add Alias</button>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <div className={style.itemWrapper}>
                {
                  this.props.value && this.props.value.map((item, id) => {
                    return (
                      <div className={style.item} key={id}>
                        {item}
                        <button className={style.btnClose} onClick={() => this.handleRemoveItem(id)}/>
                      </div>
                    )
                  })
                }
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default createField(ArrayField);
