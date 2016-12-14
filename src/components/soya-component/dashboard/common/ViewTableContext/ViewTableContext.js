import React from 'react';
import connect from 'soya/lib/data/redux/connect';
import Hydration from 'soya/lib/data/redux/Hydration';

import DefaultExtrasRenderer from '../ViewTable/DefaultExtrasRenderers.js';
import ViewTableSegment from './ViewTableSegment.js';
import ViewTable from '../ViewTable/ViewTable.js';
import BallClipRotate from '../Loading/BallClipRotate.js';
import BaseService from '../../../base/services/BaseService.js';
import ErrorState from '../ErrorState/ErrorState.js';

import layout from '../../shared/layout.mod.css';

/**
 * Loads booking center with the appropriate context, using the common API
 * contract. You will only need to provide the API URL for this component.
 */
class ControlledViewTable extends React.Component {
  static connectId() {
    return 'ControlledViewTable';
  }

  static getSegmentDependencies() {
    return [ViewTableSegment];
  }

  static subscribeQueries(props, subscribe) {
    let noopHydration = Hydration.noopAtServer();
    let namespace = props.namespace;
    subscribe(ViewTableSegment.id(), { type: 'spec', namespace: namespace }, 'spec');
    subscribe(ViewTableSegment.id(), { type: 'result', namespace: namespace }, 'data', noopHydration);
  }

  componentWillMount() {
    this.handleSearchSpecChange = this.handleSearchSpecChange.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
    this._actions = this.props.getActionCreator(ViewTableSegment.id());
  }

  render() {
    if (this.props.result.data == null) return null;
    if (this.props.result.data.state == ViewTableSegment.state.INIT) {
      return <div className={layout.panel}>
        <div className={layout.panelLoadingBody}>
          Initializing <BallClipRotate color='green' />
        </div>
      </div>;
    }
    if (this.props.result.data.state == ViewTableSegment.state.LOADING) {
      // Should render 'Loading';
      return <div className={layout.panel}>
        <div className={layout.panelLoadingBody}>
          Loading <BallClipRotate color='green' />
        </div>
      </div>;
    }

    // If not INIT and LOADING, should be LOADED.
    if (this.props.result.data.response.state != BaseService.STATES.OK) {
      return <div className={layout.panel}>
        <ErrorState response={this.props.result.data.response} />
      </div>;
    }

    const { colorMapping, mini, context } = this.props;
    const { data, schema, totalRows, idColumn } = this.props.result.data.response.data;
    const spec = this.props.result.spec;
    const extras = this.props.extras || DefaultExtrasRenderer;
    const bulkSelect = this.props.bulkSelect || [];

    return <ViewTable data={data} schema={schema} idColumn={idColumn}
                          searchSpec={spec} colorMapping={colorMapping}
                          bulkSelect={bulkSelect} extras={extras}
                          totalRows={totalRows} onSearchSpecChange={this.handleSearchSpecChange}
                          mini={mini} context={context} onRowClick={this.onRowClick}
                          namespace={this.props.namespace} />;
  }

  handleSearchSpecChange(spec) {
    this.props.context.store.dispatch(this._actions.updateSearch(
      this.props.namespace, spec
    ));
  }

  onRowClick(id, row) {
    this.props.onRowClick(id, row);
  }
}

var ConnectedComponent = connect(ControlledViewTable);
ConnectedComponent.getCheckedRows = ViewTable.getCheckedRows;
export default ConnectedComponent;