#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

// Configuración del WiFi y MQTT
const char* ssid = "tu_SSID";           // Reemplaza con tu SSID
const char* password = "tu_password";   // Reemplaza con tu contraseña
const char* mqttServer = "broker.hivemq.com";  // Reemplaza con tu servidor MQTT
const int mqttPort = 1883;
const char* mqttUser = "";  // Si el servidor requiere usuario
const char* mqttPassword = "";  // Si el servidor requiere contraseña

WiFiClient espClient;
PubSubClient client(espClient);

// Configuración del sensor DHT
#define DHTPIN 13        // Pin digital conectado al DHT
#define DHTTYPE DHT22    // DHT 22 (AM2302)
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
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqttServer, mqttPort);
  dht.begin();
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // Leer datos de los sensores
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  int lightLevel = analogRead(lightPin);

  // Verificar si los datos están disponibles
  if (isnan(h) || isnan(t)) {
    Serial.println("Error al leer el sensor DHT");
    return;
  }

  // Publicar los datos
  String tempPayload = "Temperatura: " + String(t) + " °C";
  String humPayload = "Humedad: " + String(h) + " %";
  String lightPayload = "Nivel de Luz: " + String(lightLevel);

  client.publish("sensor/temperatura", tempPayload.c_str());
  client.publish("sensor/humedad", humPayload.c_str());
  client.publish("sensor/luz", lightPayload.c_str());

  Serial.println(tempPayload);
  Serial.println(humPayload);
  Serial.println(lightPayload);

  // Esperar antes de enviar de nuevo
  delay(2000);
}
