import React from 'react';

import SimpleCard from '../SimpleCard/SimpleCard.js';
import { COLOR_NAMES } from '../../base/colors.js';
import SimpleCardHeader from '../SimpleCard/SimpleCardHeader.js';
import KeyValueGroup from './KeyValueGroup.js';
import EditFieldModal from '../EditModal/EditFieldModal.js';
import ModalDisplaySegment from '../ModalDisplay/ModalDisplaySegment.js';

var bookingInfoImportant = [
  { label: 'Booking ID', value: '21249320912' },
  { label: 'Booking Status', value: 'ISSUED6' }
];

var bookingInfoRest = [
  { label: 'Booking Labels', value: 'SAME_DAY' },
  { label: 'Total Fare', value: 'IDR 99,000' }
];

var colorMapping = {
  rowIndex: 1,
  map: {
    ISSUED1: COLOR_NAMES.RED_DARKER,
    ISSUED2: COLOR_NAMES.RED_DARK,
    ISSUED3: COLOR_NAMES.RED,
    ISSUED4: COLOR_NAMES.ORANGE,
    ISSUED5: COLOR_NAMES.YELLOW,
    ISSUED6: COLOR_NAMES.GREEN,
    ISSUED7: COLOR_NAMES.GRAY,
    ISSUED8: COLOR_NAMES.BLUE
  }
};

export default class ComponentThumbnail extends React.Component {
  componentWillMount() {
    this.actions = this.props.context.store.register(ModalDisplaySegment);
    this.bookingContact = [
      { label: 'Login User', value: 'Arnold Pramudita | 109203' },
      {
        label: 'Contact Name',
        value: 'Arnold Pramudita',
        buttons: [{ label: 'Edit', handler: this.openEditModal.bind(this, {
          id: 'contactName',
          key: 'Contact Name',
          value: 'Arnold Pramudita',
          reason: true
        })}]
      },
      {
        label: 'Contact Phone',
        value: '+62 8128381238',
        buttons: [{ label: 'Edit', handler: this.openEditModal.bind(this, {
          id: 'contactPhone',
          key: 'Contact Phone',
          value: '+62 8128381238'
        })}]
      },
      {
        label: 'Contact Email',
        value: 'arnoldkekar@celfit.com',
        buttons: [{ label: 'Edit', handler: this.openEditModal.bind(this, {
          id: 'contactEmail',
          key: 'Contact Email',
          value: 'arnoldkekar@celfit.com'
        })}]
      }
    ];
  }

  render() {
    return <div>
      <SimpleCard>
        <SimpleCardHeader style={SimpleCardHeader.STYLE.PANEL_HEADING} title="Booking Information" />
        <KeyValueGroup data={bookingInfoImportant} colorMapping={colorMapping} />
        <KeyValueGroup data={bookingInfoRest} />
        <SimpleCardHeader style={SimpleCardHeader.STYLE.SUB_HEADING} title="Contact Info" />
        <KeyValueGroup data={this.bookingContact} />
      </SimpleCard>
      <EditFieldModal namespace="bookingDetail" zIndex={1001} context={this.props.context} handleSave={this.handleSave.bind(this)} />
    </div>;
  }

  openEditModal(data) {
    let addModal = this.actions.add('bookingDetail', data.id, data);
    this.props.context.store.dispatch(addModal);
  }

  handleSave(id, value, reason) {
    alert(`Editing: ${id}, new value: ${value}, reason: ${reason}`);
  }
}