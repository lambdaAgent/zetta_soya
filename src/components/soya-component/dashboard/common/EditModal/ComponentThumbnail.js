import React from 'react';

import ModalDisplaySegment from '../ModalDisplay/ModalDisplaySegment';
import ConfirmModal from './ConfirmModal';
import EditFieldModal from './EditFieldModal';
import FilePickerModal from './FilePickerModal';
import ReasonModal from './ReasonModal';
import LoginModal from './LoginModal';
import LoadingModal from './LoadingModal.js';
import Button from '../Button/Button';

const CONFIRM = 'CONFIRM';
const EDITFIELD = 'EDITFIELD';
const FILEPICKER = 'FILEPICKER';
const REASON = 'REASON';
const LOGIN = 'LOGIN';
const LOADING = 'LOADING';

class ComponentThumbnail extends React.Component {
  static get propTypes() {
    return {
      context: React.PropTypes.object,
    };
  }

  componentWillMount() {
    this._actionModal = this.props.context.store.register(ModalDisplaySegment);
  }

  openModal(data) {
    const addModal = this._actionModal.add(data.id, 1, data);
    this.props.context.store.dispatch(addModal);
  }

  openLoadingModal() {
    this.props.context.store.dispatch(this._actionModal.add(LOADING, 'loading'));
    setTimeout(() => {
      this.props.context.store.dispatch(this._actionModal.remove(LOADING, 'loading'));
    }, 5000);
  }

  render() {
    return (
      <div>
        <Button
          onClick={this.openModal.bind(this, { id: CONFIRM })}
        >{'Confirm Modal'}
        </Button> &nbsp;&nbsp;
        <Button
          onClick={this.openModal.bind(this, { id: EDITFIELD, key: EDITFIELD, value: '', reason: true })}
        >{'Edit Field Modal'}
        </Button> &nbsp;&nbsp;
        <Button
          onClick={this.openModal.bind(this, { id: FILEPICKER, reason: true })}
        >{'File Picker Modal'}
        </Button> &nbsp;&nbsp;
        <Button
          onClick={this.openModal.bind(this, { id: REASON })}
        >{'Reason Modal'}
        </Button> &nbsp;&nbsp;
        <Button onClick={this.openModal.bind(this, { id: LOGIN })}>
          {'Login Modal'}
        </Button> &nbsp;&nbsp;
        <Button onClick={this.openLoadingModal.bind(this)}>Loading Modal</Button>
        <div>
          <ConfirmModal
            context={this.props.context} namespace={CONFIRM} zIndex={1001}
            content={'Are you sure ?'} handleConfirm={() => console.log(CONFIRM)}
          />
          <EditFieldModal
            context={this.props.context} namespace={EDITFIELD} zIndex={1001}
            handleSave={(id, value, reason) => console.log(EDITFIELD, id, value, reason)}
          />
          <FilePickerModal
            context={this.props.context} namespace={FILEPICKER} zIndex={1001}
            handleSave={(file, reason) => console.log(FILEPICKER, file, reason)}
          />
          <ReasonModal
            context={this.props.context} namespace={REASON} zIndex={1001}
            handleSave={reason => console.log(REASON, reason)}
          />
          <LoginModal
            context={this.props.context} namespace={LOGIN} zIndex={1001}
            handleLogin={(username, password) => console.log(LOGIN, username, password)}
          />
          <LoadingModal context={this.props.context} namespace={LOADING} zIndex={1001} />
        </div>
      </div>
    );
  }

}

export default ComponentThumbnail;
