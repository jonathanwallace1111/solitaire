import React, { Component } from 'react'; 
import Stack from './Stack'; 

export default class Foundation extends Component {
    constructor() { 
        super(); 
        this.class = {}; 
    }
    
    render() {
        return (
            <div className={'foundation'}>
                FOUNDATION
                {/* <Stack location={'foundation'} /> 
                <Stack location={'foundation'} /> 
                <Stack location={'foundation'} /> 
                <Stack location={'foundation'} />  */}
            </div>
        )
    }
}
