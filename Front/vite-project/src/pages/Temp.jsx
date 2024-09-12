import "../styles/Temp.css"
import React, { useState } from 'react';
import MyLineChart from "../components/MyLineChart";
const  Temp = () => {
    const [temperature, setTemperature] = useState(10);
    return (
    <div className="Temp-background">
        <div className="Temp-Graph">
            <MyLineChart/>
        </div>
        <div className="Temp-Image">
            <div className="Temp-Image-inner">
                <div className="Temp-Icon">
                    <div className="Temp-Raya">
                        <div style={{height: temperature*3}} className="Temp-Raya-level"></div>
                    </div>
                    <div className="Temp-bolita">
                    </div>
                </div>
            </div>
            <div className="Temp-text">
                <p>Última medicion: {temperature} °C</p>
            </div>
        </div>
    </div>
    )
}

export default Temp;    