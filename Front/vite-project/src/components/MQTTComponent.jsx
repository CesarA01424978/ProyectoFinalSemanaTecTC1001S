import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';

const MQTTComponent = () => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
  const [temperatura,setTemperatura] = useState([]);
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


      mqttClient.subscribe('sensor/temperatura', { qos: 1 }, (error) => {
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
      
      if (topic === 'sensor/temperatura') {
        setTemperatureData((prev) => [...prev, parseFloat(message.toString())]);
      } else if (topic === 'sensor/humedad') {
        setHumidityData((prev) => [...prev, parseFloat(message.toString())]);
      }
    });
    // Cleanup on component unmount
    console.log(temperatureData)
    return () => {
      mqttClient.end();
    };
  }, [mqttClient]);
  return (
    <div>
      <h2>Temperature Data</h2>
      <h2>Humidity Data</h2>
    </div>
  );
};

export default MQTTComponent;
