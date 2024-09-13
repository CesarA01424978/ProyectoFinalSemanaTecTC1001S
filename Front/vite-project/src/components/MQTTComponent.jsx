import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';
import MyLineChart from './MyLineChart';
import "../styles/MQTTComponent.css"

// Componente principal que maneja la conexión MQTT y muestra los datos de temperatura y humedad
const MQTTComponent = () => {
  // Estado para almacenar datos de temperatura y humedad
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  
  // Generar un ID de cliente único para la conexión MQTT
  const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
  const [nextId, setNextId] = useState(1);

  // Configuración de opciones de conexión MQTT
  const options = {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: '',
    password: '',
    reconnectPeriod: 1000,
  };

  // Conexión al broker MQTT utilizando WebSocket
  const mqttClient = mqtt.connect('ws://52.54.12.21:9001', options);

  useEffect(() => {
    // Se ejecuta cuando el componente se monta

    // Evento que se dispara cuando se conecta al broker MQTT
    mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker on EC2');

      // Suscribirse a los temas 'sensor/temperatura' y 'sensor/humedad' con QoS 1
      mqttClient.subscribe(['sensor/temperatura', 'sensor/humedad'], { qos: 1 }, (error) => {
        if (error) {
          console.log('Error subscribing to topic:', error);
        } else {
          console.log('Subscribed to topics: sensor/temperatura and sensor/humedad');
        }
      });
    });

    // Manejo de los mensajes entrantes desde el broker MQTT
    mqttClient.on('message', (topic, message) => {
      console.log(topic, message.toString());

      // Si el mensaje es del tema 'sensor/temperatura'
      if (topic === 'sensor/temperatura') {
        // Actualizar el estado con el nuevo dato de temperatura
        setTemperatureData((prev) => [...prev, parseFloat(message.toString())]);

        // Crear un objeto JSON para agregarlo a los datos de humedad (se debe ajustar a los datos correctos)
        const jsonData = {
          id: nextId,
          medicion: parseFloat(message.toString()),
        };
        
        // Actualizar el estado de los datos de humedad
        setHumidityData((prev) => [...prev, jsonData]);
        setNextId(nextId + 1);
      }

      // Si el mensaje es del tema 'sensor/humedad'
      if (topic === 'sensor/humedad') {
        // Actualizar el estado con el nuevo dato de humedad (parece que hay un error aquí, debería ser 'setHumidityData')
        setTemperatureData((prev) => [...prev, parseFloat(message.toString())]);

        // Crear un objeto JSON para agregarlo a los datos de temperatura (se debe ajustar a los datos correctos)
        const jsonData = {
          id: nextId,
          medicion: parseFloat(message.toString()),
        };
        
        // Actualizar el estado de los datos de temperatura
        setTemperatureData((prev) => [...prev, jsonData]);
        setNextId(nextId + 1);
      }
    });

    // Limpiar la conexión al broker MQTT cuando el componente se desmonte
    return () => {
      mqttClient.end();
    };
  }, []); // Remover `mqttClient` de las dependencias para evitar múltiples conexiones

  return (
    <div>
      {/* Sección para mostrar los datos de temperatura */}
      <div className='Temp-div'>
        <h2>Temperature Data</h2>
        <div className='grafica-temp'>
          {/* Componente de gráfica para mostrar los datos de humedad */}
          <MyLineChart data={humidityData} />
        </div>
      </div>

      {/* Sección para mostrar los datos de humedad */}
      <h2>Humidity Data</h2>
      <div className='grafica-temp'>
        {/* Componente de gráfica para mostrar los datos de temperatura */}
        <MyLineChart data={temperatureData} />
      </div>
    </div>
  );
};

export default MQTTComponent;
