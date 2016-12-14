import Service from 'soya/lib/data/redux/Service';

const STATES = {
  OK: 0,
  UNAUTHORIZED: 1,
  SERVER_ERROR: 2,
  NOT_FOUND: 3,
  UNPARSEABLE: 4,
  UNKNOWN_ERROR: 5
};

export default class BaseService extends Service {
  static get STATES() {
    return STATES;
  }

  /**
   * Creates a PublicApiRequest object, ready to be sent to server.
   *
   * @param token
   * @param data
   */
  createApiRequest(token, data) {
    return {
      data: data,
      context: {
        authServiceToken: token
      },
      fields: [],
      clientInterface: this.config.clientInterface
    }
  }

  /**
   * Converts the given superagent response into a result object. Result objects
   * is a standard object, containing error messages and other the result state.
   * Here's an example result object:
   *
   * <pre>
   * {
   *   data: ...,
   *   updated: 21312312, // timestamp
   *   state: 1, // one of STATES
   *   errorMessage: ''
   * }
   * </pre>
   *
   * Basically if errorMessage exists, there's been a request error, one of
   * these cases:
   *
   * - 403 (forbidden), the user doesn't have enough privileges to run this API.
   * - 500 (internal server error), the server throws an uncaught exception.
   *
   * Clients (segments), can read the state and respond appropriately.
   *
   * @param saResponse
   * @param {Error} error
   * @return {Object}
   */
  createResultObject(error, saResponse) {
    let data; const updated = (new Date()).getTime();
    if (error) {
      console.error(error);
      return {
        state: STATES.SERVER_ERROR,
        updated: updated,
        errorMessage: 'Server error.'
      };
    }
    if (saResponse.ok) {
      data = this.safeParseResponse(saResponse.text);
      if (data instanceof Error) return this.failToParse(saResponse, updated);
      return {
        state: STATES.OK,
        updated: updated,
        data: data
      };
    } else if (saResponse.forbidden) {
      return {
        state: STATES.UNAUTHORIZED,
        updated: updated,
        errorMessage: 'Unauthorized.'
      };
    } else if (saResponse.notFound) {
      return {
        state: STATES.NOT_FOUND,
        updated: updated,
        errorMessage: 'Not found.'
      };
    } else if (saResponse.status == 500) {
      data = this.safeParseResponse(saResponse.text);
      if (data instanceof Error) return this.failToParse(saResponse, updated);
      return {
        state: STATES.SERVER_ERROR,
        updated: updated,
        errorMessage: 'Server error.'
      };
    } else {
      return {
        state: STATES.UNKNOWN_ERROR,
        updated: updated,
        errorMessage: 'Unhandled status: ' + saResponse.status
      };
    }
  }

  failToParse(saResponse, updated) {
    console.error('Failed to parse server response: ' + saResponse);
    return {
      state: STATES.UNPARSEABLE,
      updated: updated,
      errorMessage: 'Parse failure.'
    }
  }

  safeParseResponse(body) {
    try {
      return JSON.parse(body).data;
    } catch (e) {
      return e;
    }
  }
}