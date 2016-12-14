import React from "react";
import connect from "soya/lib/data/redux/connect";
import SimpleCard from "../../soya-component/dashboard/common/SimpleCard/SimpleCard.js";
import {COLOR_NAMES} from "../../soya-component/dashboard/base/colors.js";
import SimpleCardHeader from "../../soya-component/dashboard/common/SimpleCard/SimpleCardHeader.js";
import KeyValueGroup from "../../../components/soya-component/dashboard/common/KeyValueGroup/KeyValueGroup";
import ModalDisplaySegment from "../../soya-component/dashboard/common/ModalDisplay/ModalDisplaySegment.js";
import BookingDetailSegment from "./BookingDetailSegment.js";
import BookingDetailService from "./BookingDetailService.js";
import BallClipRotate from "../../soya-component/dashboard/common/Loading/BallClipRotate.js";
import ErrorState from "../../soya-component/dashboard/common/ErrorState/ErrorState.js";

import style from "../../soya-component/dashboard/common/KeyValueGroup/style.mod.css";

const colorMapping = {
  rowIndex: 1,
  map: {
    URGENT: COLOR_NAMES.RED_DARKER,
    IMPORTANT: COLOR_NAMES.YELLOW,
    NORMAL: COLOR_NAMES.GREEN
  }
};

export default class BookingInfo extends React.Component {
  static getSegmentDependencies() {
    return [BookingDetailSegment];
  }

  static subscribeQueries(props, subscribe) {
    subscribe(BookingDetailSegment.id(), props.bookingId, 'info');
  }

  componentWillMount() {
    this.actions = this.props.context.store.register(ModalDisplaySegment);
    this.prepData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.prepData(nextProps);
  }

  prepData(props) {
    if (props.result.info != null && props.result.info.state == BookingDetailService.STATES.OK) {
      var agentBookingViewInfo = props.result.info.data.agentBookingViewInfo;
      var domesticBooking = props.result.info.data.domesticBooking;
      var description = props.result.info.data.description;
      var userTracking = props.result.info.data.userTracking;
      var bookingTime = new Date();
      bookingTime.setMilliseconds(agentBookingViewInfo.bookingTime);
      var expirationTime = new Date();
      expirationTime.setMilliseconds(agentBookingViewInfo.bookingExpirationTime);
      var issuanceTime = "-";
      if (domesticBooking.issuanceTime!=null) {
        issuanceTime = new Date();
        issuanceTime.setMilliseconds(domesticBooking.issuanceTime.epochMillis);
        issuanceTime = issuanceTime.toString();
      }
      this.preppedData = {
        importance: agentBookingViewInfo.importance,
        bookInfoImportant: [
          { label: 'Itinerary ID', value: agentBookingViewInfo.itineraryId },
          { label: 'Importance', value: agentBookingViewInfo.importance },
          { label: 'Booking Status', value: agentBookingViewInfo.status },
          { label: 'Payment Status', value: agentBookingViewInfo.userPaymentStatus }
        ],
        bookInfo: [
          { label: 'Total Fare Billed To Pax', value: agentBookingViewInfo.totalFareWithCurrency.currency+" "+ Number(agentBookingViewInfo.totalFareWithCurrency.amount).toLocaleString('en-US', {minimumFractionDigits: 2})},
          { label: 'Booking Time', value: bookingTime.toString() },
          { label: 'Expiration Time', value: expirationTime.toString() }
        ],
        contactInfo: [
          {label: 'Login User', value: agentBookingViewInfo.userId},
          {label: 'Contact Name', value: agentBookingViewInfo.bookingContact.firstName + " " + agentBookingViewInfo.bookingContact.lastName},
          {
            label: 'Contact Phone',
            value: agentBookingViewInfo.bookingContact.phone,
            buttons: [ {label: 'Edit', handler: this.openEditModal.bind(this, {
              id: 'contactPhone',
              key: 'Contact Phone',
              value: agentBookingViewInfo.bookingContact.phone,
              reason: true
            })}]
          },
          {
            label: 'Contact Email',
            value: agentBookingViewInfo.bookingContact.email,
            buttons: [ {label: 'Edit', handler: this.openEditModal.bind(this, {
              id: 'contactEmail',
              key: 'Contact Email',
              value: agentBookingViewInfo.bookingContact.email,
              reason: true
            })}]
          }
        ],
        deviceInfo : [
          {label: 'Booking Locale', value: agentBookingViewInfo.locale},
          {label: 'Is User Logged-In', value: agentBookingViewInfo.userId.includes("@") ? "Yes" : "No"},
          {label: 'Device', value: this.printValue(userTracking.device)},
          {label: 'Interface', value: this.printValue(userTracking.intf)},
          {label: 'Platform', value: this.printValue(userTracking.platform)},
          {label: 'App Version', value: this.printValue(userTracking.applicationVersion)}
        ],
        productInfo : [
          {label: 'Top-up Destination Number', value: "+"+domesticBooking.targetCellphoneNumber.countryCode +" "+ domesticBooking.targetCellphoneNumber.number},
          {label: 'Product Country', value: description.country},
          {label: 'Product Name', value: description.fullProductName},
          {label: 'Product Category', value: domesticBooking.category},
          {label: 'Operator', value: domesticBooking.simcardName},
          {label: 'Issuance Error Group', value: domesticBooking.providerIssuanceStatus!=null ? (domesticBooking.providerName+" : "+domesticBooking.providerIssuanceStatus) : "-"},
          {label: 'Issued Time (transaksi berhasil & pulsa masuk)', value: issuanceTime},
          {label: 'Request# to provider', value: this.printValue(domesticBooking.connectivityTxId)},
          {label: 'Transaction Id by Provider', value: this.printValue(domesticBooking.providerTxId)}
        ],
        policy : [
          {label: 'Product Policy', value: description.productPolicy}
        ],
        supplier : [
          {label: 'Supplier', value: ((domesticBooking.providerId=="-1") ? "3rd Party" : domesticBooking.providerName)},
          {label: 'Supplier Contact Phone', value: description.providerContactPhone},
          {label: 'Supplier Contact Email', value: description.providerContactEmail}
        ],
        thirdparty : [
          {label: '3rd-Party Supplier Name', value: ((domesticBooking.providerId=="-1") ? domesticBooking.providerName : "-")},
          {label: '3rd Party Price', value: ((domesticBooking.providerId=="-1" && domesticBooking.purchasePrice!=null) ? domesticBooking.purchasePrice.currency + " " + Number(domesticBooking.purchasePrice.amount).toLocaleString('en-US', {minimumFractionDigits: 0}) : "-")},
        ],
        additional : [
          {label: 'Product Details', value: description.detailDescription},
          {label: 'Important Information', value: description.usageInfo},
        ]
      };
    } else {
      this.preppedData = null;
    }
  }

  render() {
    if (this.props.result.info == null || this.preppedData==null) {
      return <BallClipRotate color='green' />;
    } else if (this.props.result.info.state != BookingDetailService.STATES.OK) {
      return <ErrorState response={this.props.result.info} />;
    } else {
      return  <div>
                <SimpleCard>
                  <SimpleCardHeader style={SimpleCardHeader.STYLE.PANEL_HEADING} title='Booking Information'/>
                  <div className={`${style.box} ${style['box-body']} ${style.importance} ${style[colorMapping.map[this.preppedData.importance]]}`}>
                    <KeyValueGroup data={this.preppedData.bookInfoImportant}/>
                  </div>
                  <KeyValueGroup data={this.preppedData.bookInfo}/>
                </SimpleCard>
                <SimpleCard>
                  <SimpleCardHeader style={SimpleCardHeader.STYLE.PANEL_HEADING} title='Customer Information'/>
                  <SimpleCardHeader style={SimpleCardHeader.STYLE.SUB_HEADING} title='Contact Info'/>
                  <KeyValueGroup data={this.preppedData.contactInfo}/>
                  <SimpleCardHeader style={SimpleCardHeader.STYLE.SUB_HEADING} title='Device Info'/>
                  <KeyValueGroup data={this.preppedData.deviceInfo}/>
                </SimpleCard>
                <SimpleCard>
                  <SimpleCardHeader style={SimpleCardHeader.STYLE.PANEL_HEADING} title='Transaction Detail'/>
                  <SimpleCardHeader style={SimpleCardHeader.STYLE.SUB_HEADING} title='Product Info'/>
                  <KeyValueGroup data={this.preppedData.productInfo}/>
                  <SimpleCardHeader style={SimpleCardHeader.STYLE.SUB_HEADING} title='Policy'/>
                  <KeyValueGroup data={this.preppedData.policy}/>
                  <SimpleCardHeader style={SimpleCardHeader.STYLE.SUB_HEADING} title='Supplier'/>
                  <KeyValueGroup data={this.preppedData.supplier}/>
                  <SimpleCardHeader style={SimpleCardHeader.STYLE.SUB_HEADING} title='3rd Party Issuance Only'/>
                  <KeyValueGroup data={this.preppedData.thirdparty}/>
                  <SimpleCardHeader style={SimpleCardHeader.STYLE.SUB_HEADING} title='Additional Info'/>
                  <KeyValueGroup data={this.preppedData.additional}/>
                </SimpleCard>
              </div>;
    }
  }

  openEditModal(data) {
    let addModal = this.actions.add('bookingDetail', data.id, data);
    this.props.context.store.dispatch(addModal);
  }

  handleSave(id, value, reason) {
    alert(`Editing: ${id}, new value: ${value}, reason: ${reason}`);
  }

  printValue(value) {
    return (value!=null ? value : "-");
  }
}

export default connect(BookingInfo);