import * as React from 'react';
import './Bill.css';

interface IBillProps {
  title: string,
  number: string,
  active: boolean,
}

class Bill extends React.Component<IBillProps, any> {

  constructor(props:any) {
    super(props);

  }

  public render() {
    return (
      
    );
  }
}

export default Bill;
