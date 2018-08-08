import * as React from 'react';
import './Bill.css';

interface IBillProps {
  name: string,

}

interface IBillState {

}

class Bill extends React.Component<IBillProps, IBillState> {

  constructor(props:any) {
    super(props);

  }

  public render() {
    return (
      <div className="Bill">

      </div>
    );
  }
}

export default Menu;
