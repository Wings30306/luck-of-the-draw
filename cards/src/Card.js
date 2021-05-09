import React, { Component } from "react"


class Card extends Component {
    render(){
        return(
            <img className="card" 
                src={this.props.card.image} 
                alt={this.props.card.name} />
        )
        
    }
}

export default Card