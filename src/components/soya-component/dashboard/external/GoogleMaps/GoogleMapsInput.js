import React from 'react';
import {GoogleMapLoader, GoogleMap, Marker, SearchBox} from "react-google-maps";
import style from './GoogleMaps.css';
import { default as ScriptjsLoader } from "react-google-maps/lib/async/ScriptjsLoader";
import createField from 'soya/lib/data/redux/form/createField';

/**
 * value: {lat: ..., lng: ...}
 */
class GoogleMapsInput extends React.Component {

  static get propTypes() {
    return {
      apiKey: React.PropTypes.string,
    };
  }

  static get defaultProps() {
    return {
      value: {
        lat: 0,
        lng: 0,
      }
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      bounds: null,
      markers: [],
      inputMarker: null,
      center: {
        lat: -0.789275,
        lng: 113.92132700000002,
      },
      coordinate: {
        lat: null,
        lng: null,
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value && nextProps.value.lat && nextProps.value.lng) {
      this.setState({center: {
        lat: parseFloat(nextProps.value.lat),
        lng: parseFloat(nextProps.value.lng),
      }});
    }
  }


  static connectId() {
    return 'GoogleMapField';
  }

  handleClickMap(map) {
    this.props.handleChange({
      lat: map.latLng.lat(),
      lng: map.latLng.lng(),
    });
  }

  handleInputChange() {
    const map = this.refs.mainMarker.getPosition();
    this.props.handleChange({
      lat: map.lat(),
      lng: map.lng(),
    });
  }

  handlePlacesChanged() {
    const places = this.refs.searchBox.getPlaces();

    if (places.length == 0)
      return;

    const markers = [];
    const bounds = new google.maps.LatLngBounds();
    places.forEach((place) => {
      if (!place.geometry) return;
      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
      markers.push({
        icon: icon,
        title: place.name,
        position: place.geometry.location
      });

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });

    if (markers.length > 0) {
      const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;

      this.setState({
        center: mapCenter,
      });

      this.refs.map.fitBounds(bounds);
    }
  }


  render() {
    let mainMarker;
    if (this.props.value != null) {
      mainMarker = <Marker
        position={{lat: parseFloat(this.props.value.lat), lng: parseFloat(this.props.value.lng)}}
        ref="mainMarker"
        draggable
        onPositionChanged={this.handleInputChange.bind(this)}
      />
    }
    return (
      <div>
        <ScriptjsLoader
          hostname={"maps.googleapis.com"}
          pathname={"/maps/api/js"}
          query={{ key: `${ this.props.apiKey }`, libraries: `geometry,drawing,places` }}
          loadingElement={
            <div {...this.props} style={{ height: `300px` }}>
              loading
            </div>
          }
          containerElement={
            <div {...this.props} className={style.containerElement} />
          }
          googleMapElement={
            <GoogleMap
              ref="map"
              defaultCenter={this.state.center}
              defaultZoom={3}
              onClick={this.handleClickMap.bind(this)}
            >

              <SearchBox
                bounds={this.state.bounds}
                controlPosition={3}
                onPlacesChanged={this.handlePlacesChanged.bind(this)}
                ref="searchBox"
                placeholder="Search in Google Map"
                style={searchBoxStyle}
              />

              { mainMarker }
            </GoogleMap>
          }
        />
        {this.renderInputLat()}
        {this.renderInputLng()}
      </div>
    );
  }

  renderInputLat() {
    return (
      <table className={style.inlineWrapper}>
        <tbody>
          <tr>
            <td width ={120}>Latitude</td>
            <td>
              <input type="number"
                     className={style.formControl}
                     onChange={(e) => this.props.handleChange({lat: e.target.value, lng: this.props.value.lng})}
                     value={this.props.value ? this.props.value.lat : null}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  renderInputLng() {
    return (
      <table className={style.inlineWrapper}>
        <tbody>
          <tr>
            <td width ={120}>Longitude</td>
            <td>
              <input type="number"
                     className={style.formControl}
                     onChange={(e) => this.props.handleChange({lat: this.props.value.lat, lng: e.target.value})}
                     value={this.props.value ? this.props.value.lng : null}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

}

const searchBoxStyle = {
  border: `1px solid transparent`,
  borderRadius: `1px`,
  boxShadow: `0 2px 1px rgba(0, 0, 0, 0.1)`,
  boxSizing: `border-box`,
  MozBoxSizing: `border-box`,
  fontSize: `14px`,
  height: `28px`,
  marginTop: `10px`,
  marginRight: `10px`,
  outline: `none`,
  padding: `0 12px`,
  textOverflow: `ellipses`,
  width: `300px`,
  borderRadius: `2px`,
};


export default createField(GoogleMapsInput);