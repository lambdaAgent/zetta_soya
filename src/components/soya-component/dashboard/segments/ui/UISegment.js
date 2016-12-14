import LocalSegment from 'soya/lib/data/redux/segment/local/LocalSegment';

export default
class UISegment extends LocalSegment {

  static id() {
    return 'UISegment';
  }

  _createInitialQueriedData(queryId) {
    return {};
  }
}