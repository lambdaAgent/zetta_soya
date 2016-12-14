import React from 'react';
import {GoogleMapLoader, GoogleMap, Marker, SearchBox} from "react-google-maps";
import style from './GoogleMaps.css';
import { default as ScriptjsLoader } from "react-google-maps/lib/async/ScriptjsLoader";


class GoogleMapsCard extends React.Component {

  static get propTypes() {
    return {
      apiKey: React.PropTypes.string,
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
      }
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
    console.log(marker);
    this.handleLocationCoordinateChange(marker.position.lat(), marker.position.lng());
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
      <div className={style.card}>
        <div className={style.searchInput}>Compare with Google Maps</div>
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
              defaultZoom={3}
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
                  <Marker position={marker.position}
                          key={index}
                          onClick={this.handleMarkerClick.bind(this, marker)}
                  />
                );
              })}

            </GoogleMap>
          }
        />
        <div className={style.divider}/>
        <div>
          <div className={style.label}>Longitude</div>
          <div className={style.value}>{this.state.coordinate.lng}</div>
        </div>
        <div className={style.divider}/>
        <div>
          <div className={style.label}>Latitude</div>
          <div className={style.value}>{this.state.coordinate.lat}</div>
        </div>
      </div>
    );
  }

}


export default GoogleMapsCard;