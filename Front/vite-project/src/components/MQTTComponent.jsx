import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';
import MyLineChart from './MyLineChart';
import "../styles/MQTTComponent.css"

const MQTTComponent = () => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
  const [nextId, setNextId] = useState(1);

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

      mqttClient.subscribe(['sensor/temperatura','sensor/humedad'], { qos: 1 }, (error) => {
        if (error) {
          console.log('Error subscribing to topic:', error);
        } else {
          console.log('Subscribed to topic: sensor/temperatura');
        }
      });
    });

    // Handle incoming messages
    mqttClient.on('message', (topic, message) => {
      console.log(topic, message.toString());

      if (topic === 'sensor/temperatura') {
        setTemperatureData((prev) => [...prev, parseFloat(message.toString())]);

        // Asegúrate de agregar el nuevo dato a humidityData correctamente
        const jsonData = {
          id: nextId,
          medicion: parseFloat(message.toString()),
        };
        
        setHumidityData((prev) => [...prev, jsonData]);  // Usar el estado anterior `prev`
        setNextId(nextId + 1);
      }
      if (topic === 'sensor/humedad') {
        setTemperatureData((prev) => [...prev, parseFloat(message.toString())]);

        // Asegúrate de agregar el nuevo dato a humidityData correctamente
        const jsonData = {
          id: nextId,
          medicion: parseFloat(message.toString()),
        };
        
        setTemperatureData((prev) => [...prev, jsonData]);  // Usar el estado anterior `prev`
        setNextId(nextId + 1);
      }
    });

    return () => {
      mqttClient.end();
    };
  }, []); // Remover `mqttClient` de las dependencias para evitar múltiples conexiones

  return (
    <div>
      <h2>Temperature Data</h2>
      <div className='grafica-temp'>
        <MyLineChart data={humidityData} /> {/* Pasar los datos correctamente */}
      </div>
      <h2>Humidity Data</h2>
      <div className='grafica-temp'>
        <MyLineChart data={temperatureData} /> {/* Pasar los datos correctamente */}
      </div>
    </div>
  );
};

export default MQTTComponent;
