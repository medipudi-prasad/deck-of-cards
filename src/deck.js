import React, { Component } from "react";
import axios from "axios";
import Card from "./card";
import "./deck.css";
const API_URL = "https://deckofcardsapi.com/api/deck";

export default class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deck: null, drawn: [] };
    this.getCard = this.getCard.bind(this);
  }
  async componentDidMount() {
    let deck = await axios.get(API_URL + "/new/shuffle");
    this.setState({ deck: deck.data });
  }
  async getCard() {
    let deck_id = this.state.deck.deck_id;
    try {
      let cardUrl = `${API_URL}/${deck_id}/draw`;
      let cardRes = await axios.get(cardUrl);
      console.log(cardRes.data);
      if (!cardRes.data.success) {
        throw new Error("No Card Remaining");
      }
      let card = cardRes.data.cards[0];
      this.setState((st) => ({
        drawn: [
          ...st.drawn,
          {
            id: card.code,
            image: card.image,
            name: `${card.suit} ${card.value}`,
          },
        ],
      }));
    } catch (err) {
      alert(err);
    }
  }

  render() {
    const cards = this.state.drawn?.map((c) => {
      return <Card image={c.image} name={c.name} key={c.id} />;
    });
    return (
      <div>
        <h1 style={{ color: "white" }}>◆ Crad Dealer ◆</h1>
        <button onClick={this.getCard}>❤ Get Card ❤</button>
        <div className="deck-card">{cards}</div>
      </div>
    );
  }
}
