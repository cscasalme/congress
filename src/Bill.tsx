import * as React from 'react';
// import './Bill.css';

interface IBillProps {
  link: string,
  number: string,
  title: string,
}

class Bill extends React.Component<IBillProps, any> {

  constructor(props:any) {
    super(props);

  }

  public render() {
    return (
      <div className = "Bill">
        <h5>{<a href={this.props.link}>{this.props.number}</a>} {this.props.title}</h5>

      </div>
    );
  }
}

export default Bill;
