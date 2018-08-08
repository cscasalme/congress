import * as React from 'react';
import Bill from "./Bill"

import './Member.css';

interface IMemberProps {
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
  }

  public render() {
    return (
      <div className = "Member">
        <h3>{this.props.name} {this.props.party}</h3>
        <h5>{this.props.role}</h5>
      </div>
    );
  }
}

export default Member;
