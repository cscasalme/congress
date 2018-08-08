import * as React from 'react';
import Member from "./Member"
import './App.css';
import { getStateInitials } from "./Helper"


import logo from './logo.svg';

interface IAppState {
  state: string,
  locationStatus: string,
  senators: Member[],
};

class App extends React.Component<any, IAppState> {

  constructor(props:any) {
    super(props);

    this.state = {
      locationStatus: "notFound",
      state: "None",
      senators: []
    };

    this.getLocation = this.getLocation.bind(this);
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
  }

  public getLocation(data: any) {
    if (data.address.country_code === "us") {
      const initials: string = getStateInitials(data.address.state);
      if (initials !== "None") {
        this.state = {
          locationStatus: "found",
          state: initials,
          senators: []
        };
      }
    }
  }

  public success(position: any) {

    const accessToken = "3cdf4045cb6490";
    const latitudeString = String(position.coords.latitude);
    const longitudeString = String(position.coords.longitude);
    const reverseGeocode: string = "https://us1.locationiq.com/v1/reverse.php?key=" + accessToken + "&lat="
                                  + latitudeString + "&lon=" + longitudeString + "&format=json"

    fetch(reverseGeocode)
      .then(response => response.json())
      .then(data => this.getLocation(data));
  }

  public error(errorMessage: any) {
    // Error faced when loading location
    alert('An error has occured while retrieving location');
    this.setState({
      locationStatus: "notFound",
      state: "None",
      senators: []
    });
  }

  public componentDidMount() {
    if ("geolocation" in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition(this.success, this.error);
    } else {
      /* geolocation IS NOT available */
      alert("Sorry, Congress does not work on this browser. :(");
      this.setState({
        locationStatus: "notFound",
        state: "None",
        senators: []
      });
    }
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
