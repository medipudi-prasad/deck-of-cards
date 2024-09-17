import React, { Component } from "react";
import "./card.css";

export default class Card extends Component {
  constructor(props) {
    super(props);
    let angle = Math.random() * 90 - 45;
    let xpos = Math.random() * 40 - 20;
    let ypos = Math.random() * 40 - 20;
    this.transForm = `translate(${xpos}px,${ypos}px) rotate(${angle}deg)`;
  }
  render() {
    // console.log(angle);
    return (
      <img
        className="card"
        src={this.props.image}
        alt={this.props.name}
        style={{ transform: `${this.transForm}` }}
      />
    );
  }
}
