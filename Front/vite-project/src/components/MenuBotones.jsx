import Botones from './Botones';
import React, { useState } from 'react';
import "../styles/MenuBotones.css"
import Temp from '../pages/Temp';
import Light from '../pages/Light';
import MQTTComponent from './MQTTComponent';

const  MenuBotones =() => {  
    const [opcion, setOpcion] = useState(0);
    return (
        <div className='MenuBotones-background'>
            <div className='MenuBotones-background-inner'>
                <div className='MenuBotones-botones-background'>
                    <Botones opcion={opcion} setOpcion={setOpcion}/>
                </div>
                <div className='MenuBotones-display'>
                    <div className='MenuBotones-display-inner'>
                    {opcion === 0 && <MQTTComponent/>}
                    {opcion === 1 && <Temp/>}
                    {opcion === 2 && <Light/>}
                    </div>
                </div>
            </div>
        </div>   
    )
    }

export default MenuBotones;