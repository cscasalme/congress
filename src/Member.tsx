import * as React from 'react';
import './Member.css';

interface IMemberProps {
  name: string,
  party: string,
  twitterId: string,
}

interface IMemberState {
  bills: Bills[],
}

class Member extends React.Component<IMemberProps, IMemberState> {

  constructor(props:any) {
    super(props);
    
  }

  public render() {
    return (
      <div className="Member">

      </div>
    );
  }
}

export default Menu;
