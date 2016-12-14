import React from 'react';
import {GoogleMap, Marker, SearchBox, InfoWindow} from "react-google-maps";
import style from './GoogleMaps.css';
import { default as ScriptjsLoader } from "react-google-maps/lib/async/ScriptjsLoader";


class GoogleMaps extends React.Component {

  static get propTypes() {
    return {
      apiKey: React.PropTypes.string,
    };
  }

  static get defaultProps() {
    return {
      markers: [],
    };
  }

  constructor(props) {
    super(props)
    this.state = {
      bounds: null,
      markers: [],
      center: {
        lat: -0.789275,
        lng: 113.92132700000002,
      },
      coordinate: {
        lat: null,
        lng: null,
      },
      defaultZoom: 3
    }
  }

  componentWillMount() {
    if(this.props.markers && this.props.markers.length > 0) {
      this.setState({
        markers: this.props.markers,
        defaultZoom: 14,
        center: this.props.markers[0].position,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.markers && nextProps.markers.length > 0) {
      this.setState({
        markers: nextProps.markers,
        defaultZoom: 14,
        center: nextProps.markers[0].position,
      });
    }
  }

  handleBoundsChanged() {
    this.setState({
      bounds: this.refs.map.getBounds(),
      center: this.refs.map.getCenter(),
    });
  }


  handlePlacesChanged() {
    const places = this.refs.searchBox.getPlaces();

    if (places.length == 0)
      return;

    this.setState({ markers: [] });
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
        markers,
      });

      this.refs.map.fitBounds(bounds);
      this.handleLocationCoordinateChange(markers[0].position.lat(), markers[0].position.lng());
    }
  }

  handleLocationCoordinateChange(lat, lng) {
    this.setState({
      coordinate: {
        lat: lat,
        lng: lng,
      }
    });
    if (this.props.onCoordinateChange) {
      this.props.onCoordinateChange(lng, lat);
    }
  }

  handleMarkerClick(marker) {
    if (marker.info) {
      marker.showInfo = true;
      this.setState(this.state);
    }
  }

  handleMarkerClose(marker) {
    marker.showInfo = false;
    this.setState(this.state);
  }

  render() {
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
    return (
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
            center={this.state.center}
            defaultZoom={this.state.defaultZoom}
            onBoundsChanged={this.handleBoundsChanged.bind(this)}
          >

            <SearchBox
              bounds={this.state.bounds}
              controlPosition={3}
              onPlacesChanged={this.handlePlacesChanged.bind(this)}
              ref="searchBox"
              placeholder="Search in Google Map"
              style={searchBoxStyle}
            />

            {this.state.markers.map((marker, index) => {
              return (
                <Marker key={index}
                        onClick={this.handleMarkerClick.bind(this, marker)}
                        {...marker}
                >
                  {marker.info && marker.showInfo ?
                    <InfoWindow
                      key={index}
                      onCloseclick={this.handleMarkerClose.bind(this, marker)}
                    >
                      {marker.info}
                    </InfoWindow>
                    : null}
                </Marker>
              );
            })}

          </GoogleMap>
        }
      />
    );
  }

}


export default GoogleMaps;