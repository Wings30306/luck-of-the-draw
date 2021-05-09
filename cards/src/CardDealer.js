import React, { Component } from "react"
import Card from "./Card"
import axios from "axios"

const API_URL = "https://deckofcardsapi.com/api/deck"

class CardDealer extends Component {
    constructor(props){
        super(props);
        this.state = {deck: null, drawn: []}
        this.deal = this.deal.bind(this)
    }
    async componentDidMount() {
        console.log("COMPONENT DID MOUNT, UPDATE STATE")
        let deck = axios.get(`${API_URL}/new/shuffle/`)
        let data = (await deck).data
        this.setState({ deck: data})
    }

    async deal() {
        // make request using deck
        try {
            let cardRes = await axios.get(`${API_URL}/${this.state.deck.deck_id}/draw/`)
            if (cardRes.data.success === false) {
                throw new Error("No cards remaining")
            }
            let card = cardRes.data.cards[0]
            this.setState(st => ({
                drawn: [
                    ...st.drawn, 
                    {
                        id: card.code, 
                        image: card.image, 
                        name: `${card.value} of ${card.suit}`
                    }
                ]
            }))
        } catch (err) {
            alert(err);
        }
    }

    render() {
        return(
            <div>
            <h1>Card Dealer</h1>
            <button onClick={this.deal}>Deal me a card!</button>
            { this.state.drawn.map(card => <Card key={card.id} card={card} />)}
            
        </div>
        )
        
    }
}

export default CardDealer