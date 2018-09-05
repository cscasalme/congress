import * as React from 'react';
import Bill from "./Bill"

import './Member.css';

interface IMemberProps {
  id: string
  name: string,
  party: string,
  role: string,
  twitterId: string,
}

interface IMemberState {
  bills: Bill[],
}

class Member extends React.Component<IMemberProps, IMemberState> {

  constructor(props:any) {
    super(props);

    this.state = {
      bills: []
    };

    this.billsFetch = this.billsFetch.bind(this);
    this.getBills = this.getBills.bind(this);

    this.billsFetch();
  }

  public getBills(results: any) {
    let billsList: Bill[];
    billsList = [];

    results[0].bills.forEach((item: any) => {
      billsList.push(new Bill({link: item.congressdotgov_url, number: item.number, title: item.short_title}))
    });

    this.setState({
      bills: billsList,
    });
  }

  public billsFetch() {
    let billFetch: string = "https://api.propublica.org/congress/v1/members/";
    billFetch = billFetch + this.props.id;
    billFetch = billFetch + "/bills/cosponsored.json";
    fetch(billFetch, {
      headers: {
        "X-Api-Key": "ghDkIyyWKGxVEdolv8EFlYaoOXcn8iVvC4zdhw9J"
      },
      method: "GET"
    })
      .then(response => response.json())
      .then(data => this.getBills(data.results));
  }

  public render() {
    const twitterLink: string = "https://twitter.com/" + this.props.twitterId
    return (
      <div className = "Member">
        <h1>{this.props.name} {this.props.party}</h1>
        <h2>{this.props.role}</h2>
        <a href={twitterLink}>{this.props.twitterId}</a>
        <h2>{"Bills"}</h2>
        <div className="billsList">
          {this.state.bills.map((bill) => (
            <div key={bill.props.number} className="Bill">
              <Bill link={bill.props.link} number={bill.props.number} title={bill.props.title}/>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Member;
