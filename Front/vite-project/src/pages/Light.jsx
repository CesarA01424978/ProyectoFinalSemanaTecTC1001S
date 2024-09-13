import "../styles/Light.css"
import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';

import MyLineChart from "../components/MyLineChart";
const  Light = () => {
    const [humidityData, setHumidityData] = useState([]);
    const [nextId, setNextId] = useState(1);
    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
    const options = {
      clientId,
      clean: true,
      connectTimeout: 4000,
      username: '',
      password: '',
      reconnectPeriod: 1000,
    };
  
    const mqttClient = mqtt.connect('ws://52.54.12.21:9001', options);
  
    useEffect(() => {
  
      mqttClient.on('connect', () => {
        console.log('Connected to MQTT broker on EC2');
  
  
        mqttClient.subscribe('sensor/humedad', { qos: 1 }, (error) => {
          if (error) {
            console.log('Error subscribing to topic:', error);
          } else {
            console.log('Subscribed to topic: sensor/humedad');
          }
        });
      });
  
      // Handle incoming messages
      mqttClient.on('message', (topic, message) => {
        console.log(topic,message.toString());
        
        if (topic === 'sensor/humedad') {
            const jsonData={
              "id":nextId,
              "medicion":parseFloat(message.toString())}
            setHumidityData([...data, jsonData]);
            setNextId(nextId + 1);
        }  
      });
      // Cleanup on component unmount
      console.log("Humedad",humidityData)
      return () => {
        mqttClient.end();
      };
    }, [mqttClient]);
    return (
    <div className="Light-background">
        <div className="Light-Graph">
            <MyLineChart data={humidityData}/>
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
                <p>Última medicion: {isNaN(parseFloat(message.toString())) ? 0 : parseFloat(message.toString())}</p>
            </div>
        </div>
    </div>
    )
}

export default Light;    