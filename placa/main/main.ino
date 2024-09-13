#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

// Configuración del WiFi y MQTT
const char* ssid = "Lalo :)";            // Nombre Wifi
const char* password = "lalocool";           // Reemplaza con tu contraseña
//const char* ssid = "Samsung Galaxy";            // Nombre Wifi
//const char* password = "98765432";           // Reemplaza con tu contraseña
const char* mqttServer = "52.54.12.21";      // Reemplaza con tu servidor MQTT
const int mqttPort = 1883;                          //Sin cifrado
const char* mqttUser = "";  // Si el servidor requiere usuario
const char* mqttPassword = "";  // Si el servidor requiere contraseña

WiFiClient espClient;
PubSubClient client(espClient);

// Define el tipo de sensor y el pin de datos
#define DHTPIN 4        // Pin al que conectaste el sensor (D4 en este caso)
#define DHTTYPE DHT11   // Según el sensor que se use
DHT dht(DHTPIN, DHTTYPE);

// Configuración del sensor de luz
const int lightPin = 34;  // Pin analógico conectado al LDR

// Función para conectar a WiFi
void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Conectando a ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi conectado");
  Serial.println("Dirección IP: ");
  Serial.println(WiFi.localIP());
}

// Función para conectarse al servidor MQTT
void reconnect() {
  // Bucle hasta que se conecte
  while (!client.connected()) {
    Serial.print("Intentando conexión MQTT...");
    // Intentar conectarse al servidor MQTT
    if (client.connect("ESP32Client", mqttUser, mqttPassword)) {
      Serial.println("Conectado");
      // Suscribirse a un tema si es necesario
    } else {
      Serial.print("Fallo, rc=");
      Serial.print(client.state());
      Serial.println(" Intentando de nuevo en 5 segundos");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(9600); //Velocidad de baudios
  setup_wifi();
  client.setServer(mqttServer, mqttPort);
  dht.begin();        //Iniciar el sensor
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // Leer datos de los sensores
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  //int lightLevel = analogRead(lightPin);

  // Verificar si los datos están disponibles
  if (isnan(h) || isnan(t)) {
    Serial.println("Error al leer el sensor DHT");
    return;
  }

  // Publicar los datos
  String tempPayload = "Temperatura: " + String(t);
  String humPayload = "Humedad: " + String(h);

  //String lightPayload = "Nivel de Luz: " + String(lightLevel);

  //client.publish("sensor/temperatura_Text", tempPayload.c_str());
  //client.publish("sensor/humedad_Text", humPayload.c_str());
  client.publish("sensor/temperatura", String(t).c_str());
  client.publish("sensor/humedad", String(h).c_str());

  //client.publish("sensor/temperatura", t);
  //client.publish("sensor/luz", lightPayload.c_str());

  Serial.println(tempPayload);
  Serial.println(humPayload);

  //Serial.println(lightPayload);

  // Esperar antes de enviar de nuevo
  delay(2000);
}
