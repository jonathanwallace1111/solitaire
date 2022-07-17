import React from 'react'

export default function Stock(props) {
    
    console.log(props.cardsArr); 


    return (
        <div>
                <div className={'stock'}>STOCK</div>
                    {/* <Stock cardsArr={this.props.cardsArr} location={'stock'} /> */}
                <div className={'waste'}>WASTE</div>
        </div>
    )
}
