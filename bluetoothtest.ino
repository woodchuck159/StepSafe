#include <SoftwareSerial.h>
#include <avr/wdt.h>
SoftwareSerial BTSerial(10, 11); // RXD, TXD
const int trig = 5;
const int echo = 6;

long duration;
int distance;

void setup(){
  // check if a watchdog reset occurred
  if (MCUSR & _BV(WDRF)) {
  // Watchdog reset occurred
  MCUSR &= ~_BV(WDRF); // Clear the flag
  }
  
  pinMode(trig, OUTPUT);
  pinMode(echo, INPUT);
  Serial.begin(9600);
  wdt_enable(WDTO_4S);
  Serial.println("Starting up!\n");
  BTSerial.begin(9600);
  Serial.println("Bluetooth ready\n");
}

void loop(){
  wdt_reset();
  digitalWrite(trig, LOW);
  delayMicroseconds(12);
  digitalWrite(trig, HIGH);
  delayMicroseconds(12);
  digitalWrite(trig, LOW);
  duration = pulseIn(echo, HIGH, 30000);
  distance = duration * .017;
  Serial.print("Distance: ");
  Serial.println(distance);
if(BTSerial.available()){
  Serial.write(BTSerial.read());
}
if(Serial.available()){
  BTSerial.write(Serial.read());
}
delay(2000);
}
