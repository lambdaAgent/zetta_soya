import React from 'react';
import PaymentConfirmation from './PaymentConfirmation';

const state = {
  invoice: {
    invoiceId: 'ID21312512312324123213',
    paymentLimit: '29/09/16 01:05',
  },
  paymentConfirmation: {
    paymentMethod: 'CREDIT_CARD',
    accountNumber: '2312 12412 32131',
    amount: 'IDR 123,456',
    customerBank: 'Mandiri',
    travelokaBank: 'Cybersource',
    payerName: 'Arnold Pramudita',
    paymentCountry: 'ID',
    paymentNotes: 'ID',
    isConfirmed: 'YES',
    paymentProofUploadingTime: '-',
    uploadedPaymentProof: '-',
    submitPaymentProofUrl: '-'
  },
  paymentAssignment: [
    { scope: 'scope', amount: 'amount', fetch: 'fetch', time: 'assigmentTime' },
    { scope: 'scope', amount: 'amount', fetch: 'fetch', time: 'assigmentTime' },
  ],
  orderEntry: {
    data: [
      { item: '123123', kind: 'Sales', scope: 'Trinusa', amount: 'IDR 12,345' },
      { item: '123123', kind: 'Sales', scope: 'Trinusa', amount: 'IDR 12,345' },
    ],
    total: 'IDR 12,345',
  },
  crossSellingAction: [
    { cse: 'CSE', voucherCode: 'Voucher Code', generatedIn: 'Generated in' },
  ],
  refunds: [
    { refundId: 'Refund Id', freshdeskId: 'Fresdesk ID', submitted: 'Submitted', status: 'Status' },
  ],
  paymentRequest: [
    { paymentRequestId: '12323124', created: '29/12/2016 19:22', scope: 'mandiriDebit', status: 'PAID' },
  ],
};

export default class ComponentThumbnail extends React.Component {
  render() {
    return <PaymentConfirmation data={state} />;
  }
}
