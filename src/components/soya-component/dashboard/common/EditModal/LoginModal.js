import React, { PropTypes } from 'react';
import Form from 'soya/lib/data/redux/form/Form';
import style from '../ModalDisplay/modal.mod.css';
import { required } from '../../base/validator/general.js';
import Button from '../Button/Button.js';
import createModal from '../ModalDisplay/createModal';
import TextBox from '../FormControl/TextBox/TextBox';

class LoginModal extends React.Component {
  static get propTypes() {
    return {
      //  from component
      index: PropTypes.number,
      namespace: PropTypes.string.isRequired,
      context: PropTypes.object.isRequired,
      handleLogin: PropTypes.func,
      //  from createModal
      data: PropTypes.object,
      removeSelf: PropTypes.func,
    };
  }

  componentWillMount() {
    this._form = new Form(this.props.context.store, this.props.namespace);
  }

  _login() {
    this._form.submit(result => {
      if (!result.isValid) {
        return '';
      }
      this.props.handleLogin(
        result.values[`username-${this.props.modalId}`],
        result.values[`password-${this.props.modalId}`]
      );
    });
  }

  render() {
    const topOffset = this.props.index * 50;
    const leftOffset = this.props.index * 50;
    return (
      <div className={style.simpleModal} style={{ top: `${topOffset}px`, left: `${leftOffset}px` }}>
        <div className={style.modalBody}>
          <h3>{'Log in to your account'}</h3>
          {'Username'}
          <TextBox
            name={`username-${this.props.modalId}`} form={this._form}
            changeValidators={[required]} context={this.props.context}
          />
          {'Password'}
          <TextBox
            name={`password-${this.props.modalId}`} form={this._form}
            isPassword changeValidators={[required]} context={this.props.context}
          />
        </div>
        <div className={style.modalFooter}>
          <Button
            buttonSize={Button.SIZE.DEFAULT}
            buttonStyle={Button.STYLE.RED}
            handleClick={this.props.removeSelf}
          >{'Close'}
          </Button>
          &nbsp;&nbsp;
          <Button
            buttonSize={Button.SIZE.DEFAULT}
            buttonStyle={Button.STYLE.PRIMARY}
            handleClick={this._login.bind(this)}
          >{'LOG IN'}
          </Button>
        </div>
      </div>
    );
  }
}

export default createModal(LoginModal);
