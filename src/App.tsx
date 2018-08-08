import * as React from 'react';
import './App.css';
import { getStateInitials } from "./Helper"
import Member from "./Member"


import logo from './assets/capitol-building-white-128.png';

interface IAppState {
  locationStatus: string,
  senators: Member[],
  state: string,
};

class App extends React.Component<any, IAppState> {

  constructor(props:any) {
    super(props);

    this.state = {
      locationStatus: "notFound",
      senators: [],
      state: "None",
    };

    this.error = this.error.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.getSenators = this.getSenators.bind(this);
    this.success = this.success.bind(this);
    this.senatorFetch = this.senatorFetch.bind(this);
  }

  public getLocation(data: any) {
    if (data.address.country_code === "us") {
      const initials: string = getStateInitials(data.address.state);
      this.senatorFetch(initials);
    }
  }

  public getSenators(initials: string, results: any) {
    let senatorList: Member[];
    senatorList = []

    results.forEach((item: any) => {
      senatorList.push(new Member({name: item.name, party: item.party, role: item.role, twitterId: item.twitter_id}))
    });

    this.setState({
      locationStatus: "found",
      senators: senatorList,
      state: initials,
    });
  }

  public senatorFetch(initials: string) {
    let senatorFetch: string = "https://api.propublica.org/congress/v1/members/senate/";
    senatorFetch = senatorFetch + initials;
    senatorFetch = senatorFetch + "/current.json";
    fetch(senatorFetch, {
      headers: {
        "X-Api-Key": "ghDkIyyWKGxVEdolv8EFlYaoOXcn8iVvC4zdhw9J"
      },
      method: "GET"
    })
      .then(response => response.json())
      .then(data => this.getSenators(initials, data.results));


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
      senators: [],
      state: "None",
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
        senators: [],
        state: "None",
      });
    }
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Congress</h1>
        </header>
        <p className="Senators">
          <h1> Your Senators </h1>
          <div className="SenatorList">
            {this.state.senators.map((senator) => (
              <div key={senator.props.name} className="Senator">
                <Member name={senator.props.name}
                  party={senator.props.party}
                  role={senator.props.role}
                  twitterId={senator.props.twitterId}/>
              </div>
            ))}
          </div>
        </p>
        <footer>
          <div>
            <p>
            Icons made by
            <a href="http://www.freepik.com" title="Freepik"> Freepik </a>
             from
            <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com </a>
             is licensed by
            <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank"> CC 3.0 BY </a>
          </p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
