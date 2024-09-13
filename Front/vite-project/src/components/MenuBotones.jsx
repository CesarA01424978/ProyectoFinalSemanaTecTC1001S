import React from 'react';
import "../styles/MenuBotones.css"
import MQTTComponent from './MQTTComponent';

const  MenuBotones =() => {  
    return (
        <div className='MenuBotones-background'>
            <div className='MenuBotones-background-inner'>
                <div className='MenuBotones-display'>
                    <div className='MenuBotones-display-inner'>
                    <MQTTComponent/>
                    </div>
                </div>
            </div>
        </div>   
    )
}

export default MenuBotones;