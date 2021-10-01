import React, { Component } from 'react';
import Stack from './Stack'; 

export default class DrawStack extends Component {
    constructor() { 
        super(); 
        this.state = {}; 
    }
    
    render() {
        return (
            <div className={'drawstack-displaystack-container'}>
                <div className={'drawstack'}>DRAWSTACK</div>
                {/* <Stack cardsArr={this.props.cardsArr} location={'drawStack'} /> */}
                <div className={'displaystack'}>DISPLAYSTACK</div>
            </div>
        )
    }
}
