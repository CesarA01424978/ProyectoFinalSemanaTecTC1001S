#include <DHT.h>

// Define el tipo de sensor y el pin de datos
#define DHTPIN 4     // Pin al que conectaste el sensor (D4 en este caso)
#define DHTTYPE DHT22   // o DHT11 según el sensor que uses

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  dht.begin();  // Inicializa el sensor
}

void loop() {
  // Lee la temperatura y la humedad
  float temperatura = dht.readTemperature();
  float humedad = dht.readHumidity();

  // Verifica si la lectura es correcta
  if (isnan(temperatura) || isnan(humedad)) {
    Serial.println("Error al leer el sensor!");
    return;
  }

  // Imprime los valores de temperatura y humedad en el monitor serial
  Serial.print("Temperatura: ");
  Serial.print(temperatura);
  Serial.println(" °C");

  Serial.print("Humedad: ");
  Serial.print(humedad);
  Serial.println(" %");

  delay(2000);  // Espera 2 segundos antes de leer de nuevo
}
