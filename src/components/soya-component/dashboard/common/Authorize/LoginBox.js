import React from 'react';
import Form from 'soya/lib/data/redux/form/Form';

import style from './loginbox.mod.css';
import { required } from '../../base/validator/general.js';
import SimpleCard from '../SimpleCard/SimpleCard.js';
import TextBox from '../FormControl/TextBox/TextBox.js';
import Button from '../Button/Button.js';
import ErrorState from '../ErrorState/ErrorState.js';
import UserService from '../../../base/services/UserService.js';
import UserSegment from '../../../base/segments/UserSegment.js';
import ModalDisplaySegment from '../ModalDisplay/ModalDisplaySegment.js';
import LoadingModal from '../EditModal/LoadingModal.js';

const FORM_NAME = 'd.login';
const LOADING_NAMESPACE = 'd.login.loading';
const LOADING_MODAL_ID = 'l';

export default class LoginBox extends React.Component {
  componentWillMount() {
    this.setState({errorResponse: null});
    this.userService = this.props.context.store.getService(UserService);
    this.form = new Form(this.props.context.store, FORM_NAME);
    this.submit = this.submit.bind(this);
    this.keyDown = this.keyDown.bind(this);
  }

  submit() {
    this.disable();
    this.form.submit((result) => {
      if (!result.isValid) {
        this.enable();
        return;
      }
      this.form.setValue('password', '');
      this.userService.login(result.values.username, result.values.password).then((result) => {
        if (result.state == UserService.STATES.OK) {
          this.setState({errorResponse: null});
          if (result.data.result == 'SUCCESS') {

            // If successful, set the user! This will also trigger fetching of
            // user profile and update all components subscribing to user.
            this.props.context.store.dispatch(UserSegment.getActionCreator().setUser(
              result.data.token, result.data.expirationTimestamp
            )).then(this.enable.bind(this));
            return;

          } else {
            this.form.setErrors('username', ['Invalid username or password']);
          }
        } else {
          this.setState({errorResponse: result});
        }
        this.enable();
      }).catch((err) => {
        // TODO: Create reusable alerts?
        this.enable();
        throw err;
      });
    });
  }

  disable() {
    this.form.disable();
    this.props.context.store.dispatch(ModalDisplaySegment.getActionCreator().add(
      LOADING_NAMESPACE, LOADING_MODAL_ID
    ));
  }

  enable() {
    this.form.enable();
    this.props.context.store.dispatch(ModalDisplaySegment.getActionCreator().remove(
      LOADING_NAMESPACE, LOADING_MODAL_ID
    ));
  }

  keyDown(e){
    if(e.keyCode === 13){ //enter key
      this.submit();
    }
  }

  render() {
    let errorState = null;
    if (this.state.errorResponse) {
      errorState = <ErrorState response={this.state.errorResponse} />
    }
    return <div className={style.container}>
      <SimpleCard>
        {errorState ? errorState : <img src={this.props.icon} />}

        <h3>Login {this.props.siteName}</h3>
        <p>{this.props.message}</p>
        <div className={style.form}>
          <h4>Username</h4>
          <TextBox name='username'
                   defaultValue={this.props.username}
                   changeValidators={[required]}
                   form={this.form} context={this.props.context}
                   onKeyDown={this.keyDown}
          />
          <h4>Password</h4>
          <TextBox name='password'
                   isPassword={true}
                   form={this.form}
                   changeValidators={[required]}
                   context={this.props.context}
                   onKeyDown={this.keyDown}
          />
          <div className={style.buttonContainer}>
            <Button buttonSize={Button.SIZE.BLOCK}
                    buttonStyle={Button.STYLE.PRIMARY}
                    handleClick={this.submit}>Login</Button>
          </div>
        </div>
      </SimpleCard>
      <LoadingModal
        namespace={LOADING_NAMESPACE}
        context={this.props.context}
      />
    </div>;
  }
}