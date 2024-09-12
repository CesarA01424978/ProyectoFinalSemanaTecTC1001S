import "../styles/Light.css"
import React, { useState } from 'react';
import MyLineChart from "../components/MyLineChart";
const  Light = () => {
    const [temperature, setTemperature] = useState(20);
    return (
    <div className="Light-background">
        <div className="Light-Graph">
            <MyLineChart/>
        </div>
        <div className="Light-Image">
        <div className="Light-Image-inner">
                <div className="Light-Icon">
                    <div class="foco">
                        <div class="parte-superior"></div>
                        <div class="bombilla"></div>
                        <div class="rosca"></div>
                    </div>
                </div>
            </div>
            <div className="Light-text">
                <p>Última medicion: {temperature} Luz</p>
            </div>
        </div>
    </div>
    )
}

export default Light;    