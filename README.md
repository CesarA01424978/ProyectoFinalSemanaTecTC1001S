Proyecto de Monitoreo de Humedad y Temperatura con Arduino, AWS y Visual Studio Code
Este proyecto utiliza una placa con sensores de humedad y temperatura para recopilar datos ambientales, los cuales se envían a un servidor en AWS para su almacenamiento y procesamiento. Los datos son visualizados en tiempo real a través de una página web que muestra gráficos interactivos.

CONTENIDOS
Descripción
Requisitos
Instalación
Configuración del Proyecto
Funcionamiento
Uso

Descripción
El objetivo de este proyecto es monitorear la humedad y la temperatura de un ambiente utilizando una placa Arduino equipada con sensores. Los datos recogidos son enviados a un servidor AWS mediante un protocolo MQTT. Desde AWS, los datos se procesan y se envían a una aplicación web que los visualiza en gráficos.


Requisitos
Arduino IDE o Visual Studio Code con la extensión de Arduino.
Placa Arduino compatible (Arduino Uno, Mega, etc.)
Sensor de humedad y temperatura (DHT11 o DHT22)
Conexión a internet (a través de un módulo Wi-Fi como el ESP8266 o Ethernet Shield)
Cuenta en AWS
AWS EC2 Linux 2
Plataforma web (HTML, CSS, JavaScript) para la visualización de datos

Librerías de Arduino:
DHT.h
PubSubClient.h
ESP8266WiFi.h
arduino avr Boards

INSTALACIÓN
Clona el repositorio del proyecto en tu máquina local:
Copiar código
git clone https://github.com/tu-usuario/proyecto-humedad-temperatura.git

Abre el proyecto en Visual Studio Code o en Arduino IDE.

Instala las librerías necesarias desde el Administrador de Librerías de Arduino.

Configura los detalles de la red Wi-Fi y el servidor MQTT dentro del archivo principal de Arduino.

Configuración del Proyecto
Configuración de Arduino
Conecta el sensor de humedad y temperatura DHT11 a la placa Arduino según el pinout especificado en el código.

Sube el sketch a la placa Arduino usando el IDE o Visual Studio Code.

Configuración de AWS
Crea un recurso EC2 en AWS y configura las credenciales necesarias para la conexión MQTT.

Configura los grupos de seguridad necesarios para que el dispositivo Arduino pueda publicar datos en el servidor MQTT (webSocket).

Configuración de la Web
Instalar React + Vite con el comando npm install


FUNCIONAMIENTO
Los sensores de humedad y temperatura miden continuamente el ambiente.
Los datos recibidos se envían a AWS mediante MQTT.
Los datos son procesados para su visualización en gráficos en tiempo real.

USO
Asegúrate de que la placa Arduino esté conectada y que el servidor MQTT en AWS esté configurado correctamente.
Abre la página web en un navegador para ver los datos en tiempo real.
