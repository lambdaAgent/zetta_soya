import React from 'react';
import SimpleCardHeader from '../SimpleCard/SimpleCardHeader';
import SimpleTable from '../Table/SimpleTable/SimpleTable';
import KeyValueGroup from '../KeyValueGroup/KeyValueGroup';
import Button from '../Button/Button';
import DynamicCellTable from '../Table/DynamicCellTable/DynamicCellTable';

const refundsField = ['Refund ID', 'Freshdesk ID', 'Submitted', 'status'];
const paymentAssignTableField = ['scope', 'amount', 'fetch', 'time', 'unassign'];
const crossSellingField = ['CSE', 'Voucher Code', 'Generated in'];
const paymentReqField = ['Payment Request ID', 'created', 'scope', 'status'];

export default class PaymentConfirmation extends React.Component {
  static get propTypes() {
    return {
      data: React.PropTypes.object,
    };
  }
  componentWillMount() {
    this.prepareData = this.prepareData.bind(this);
    this.prepareData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) this.prepareData(nextProps);
  }

  prepareData(props) {
    //  prepare data
    this._paymentInfo = [
      { label: 'Invoice ID', value: props.data.invoice.invoiceId },
      { label: 'Payment Limit', value: props.data.invoice.paymentLimit },
    ];

    this._paymentConfirmation = [
      { label: 'Payment Method', value: props.data.paymentConfirmation.paymentMethod },
      { label: 'Account Number', value: props.data.paymentConfirmation.accountNumber },
      { label: 'Amount', value: props.data.paymentConfirmation.amount },
      { label: 'Customer Bank', value: props.data.paymentConfirmation.customerBank },
      { label: 'Traveloka Bank', value: props.data.paymentConfirmation.travelokaBank },
      { label: 'Payer Name', value: props.data.paymentConfirmation.payerName },
      { label: 'Payment Country', value: props.data.paymentConfirmation.paymentCountry },
      { label: 'Payment Notes', value: props.data.paymentConfirmation.paymentNotes },
      { label: 'Is Confirmed', value: props.data.paymentConfirmation.isConfirmed },
      { label: 'Payment Proof Uploading Time', value: props.data.paymentConfirmation.paymentProofUploadingTime },
      { label: 'Uploaded Payment Proof', value: props.data.paymentConfirmation.uploadedPaymentProof },
      { label: 'Submit Payment Proof URL', value: props.data.paymentConfirmation.submitPaymentProofUrl }
    ];

    const tempData = [];
    const orderEntryData = props.data.orderEntry.data;
    for (let i = 0; i < orderEntryData.length; i++) {
      tempData.push([
        { value: orderEntryData[i].item },
        { value: orderEntryData[i].kind },
        { value: orderEntryData[i].scope },
        { value: orderEntryData[i].amount },
      ]);
    }
    this._orderEntryData = {
      data: [
        [
          { value: 'Item' },
          { value: 'Kind' },
          { value: 'Scope' },
          { value: 'Amount' },
        ],
        ...tempData,
        [
          {
            value: 'Total',
            columnSpace: 2,
            isBold: true,
          },
          {
            value: props.data.orderEntry.total,
            isBold: true,
          },
        ],
      ],
    };

    this._refundsData = [];
    for (let i = 0; i < props.data.refunds.length; i++) {
      this._refundsData.push({ ['Refund ID']: props.data.refunds[i].refundId, ['Freshdesk ID']: props.data.refunds[i].freshdeskId, ['Submitted']: props.data.refunds[i].submitted, status: props.data.refunds[i].status });
    }

    this._crossSellingData = [];
    for (let i = 0; i < props.data.crossSellingAction.length; i++) {
      this._crossSellingData.push({ ['CSE']: props.data.crossSellingAction[i].cse, ['Voucher Code']: props.data.crossSellingAction[i].voucherCode, ['Generated in']: props.data.crossSellingAction[i].generatedIn });
    }

    this._paymentAssignTableData = [];
    for (let i = 0; i < props.data.paymentAssignment.length; i++) {
      this._paymentAssignTableData.push({ scope: props.data.paymentAssignment[i].scope, amount: props.data.paymentAssignment[i].amount, fetch: props.data.paymentAssignment[i].fetch, time: props.data.paymentAssignment[i].time, unassign: <Button buttonStyle={Button.STYLE.RED} buttonSize={Button.SIZE.SMALL}>{'Remove'}</Button> });
    }

    this._paymentReqData = [];
    for (let i = 0; i < props.data.paymentRequest.length; i++) {
      this._paymentReqData.push({ ['Payment Request ID']: props.data.paymentRequest[i].paymentRequestId, created: props.data.paymentRequest[i].created, scope: props.data.paymentRequest[i].scope, status: props.data.paymentRequest[i].status });
    }
  }
  render() {
    return (
      <div>
        <SimpleCardHeader style={SimpleCardHeader.STYLE.PANEL_HEADING} title='Payment Information' />
        <SimpleCardHeader style={SimpleCardHeader.STYLE.SUB_HEADING} title='Invoice' />
        <KeyValueGroup data={this._paymentInfo} />
        <SimpleCardHeader style={SimpleCardHeader.STYLE.SUB_HEADING} title='Payment Confirmation' />
        <KeyValueGroup data={this._paymentConfirmation} />
        <SimpleCardHeader style={SimpleCardHeader.STYLE.SUB_HEADING} title='Payment Assignment' />
        <SimpleTable tableBody={this._paymentAssignTableData} fields={paymentAssignTableField} />
        <SimpleCardHeader style={SimpleCardHeader.STYLE.SUB_HEADING} title='Order Entry' />
        <DynamicCellTable data={this._orderEntryData} />
        <SimpleCardHeader style={SimpleCardHeader.STYLE.SUB_HEADING} title='Refunds' />
        <SimpleTable tableBody={this._refundsData} fields={refundsField} />
        <SimpleCardHeader style={SimpleCardHeader.STYLE.SUB_HEADING} title='Cross Selling Action' />
        <SimpleTable tableBody={this._crossSellingData} fields={crossSellingField} />
        <SimpleCardHeader style={SimpleCardHeader.STYLE.SUB_HEADING} title='Payment Request' />
        <SimpleTable tableBody={this._paymentReqData} fields={paymentReqField} />
      </div>
    );
  }
}
