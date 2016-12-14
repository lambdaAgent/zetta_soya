import LocalSegment from 'soya/lib/data/redux/segment/local/LocalSegment';

class PageNotificationSegment extends LocalSegment {

  static id() {
    return 'PageNotificationSegment';
  }

  _createInitialQueriedData(queryId) {
    return {};
  }
}

export default PageNotificationSegment;
