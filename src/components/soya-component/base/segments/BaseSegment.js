import Segment from 'soya/lib/data/redux/Segment';
import Load from 'soya/lib/data/redux/Load';
import UserSegment from './UserSegment';

/**
 * Provides
 *
 * @CLIENT_SERVER
 */
export default class BaseSegment extends Segment {
  static getSegmentDependencies() {
    return [UserSegment];
  }

  // TODO: Think again if this is needed or not.

  static createLoadWithToken() {
  }

  static createLoadFromQuery(query, queryId, segmentState, services) {
    let load = new Load();
    load.func = (dispatch, query) => {
      return new Promise((resolve, reject) => {
        query(UserSegment.id(), 'token').then((profile) => {

        }).catch(reject);
      });
    };
    return load;
  }
}