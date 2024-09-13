import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt'; // Importa la biblioteca MQTT

const MQTTChartComponent = () => {
  const [data, setData] = useState([]); // Estado para almacenar datos de sensores

  useEffect(() => {
    // Conéctate al broker MQTT en tu EC2
    console.log("Hola")
    const mqttClient = mqtt.connect('http://54.146.179.44:1883'); // Cambia la IP y el puerto a los de tu broker
    console.log("Hola 2")
    mqttClient.on('connect', () => {
      console.log('Conectado al broker MQTT en EC2');
      mqttClient.subscribe('sensor/temperature', (err) => {
        if (err) {
          console.error('Error al suscribirse al tema:', err);
        } else {
          console.log('Suscripción exitosa al tema sensor/temperature');
        }
      });
    });

    mqttClient.on('message', (topic, message) => {
      const sensorData = JSON.parse(message.toString());
      setData((prevData) => [...prevData, sensorData]);
    });

    return () => {
      if (mqttClient) {
        mqttClient.end();
      }
    };
  }, []);
  return (
    <div>
      <h1>Real-time Sensor Data</h1>
      
    </div>
  );
};

export default MQTTChartComponent;
