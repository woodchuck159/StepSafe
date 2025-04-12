#include <SoftwareSerial.h>
#include <avr/wdt.h>

SoftwareSerial BTSerial(10, 11); // RXD, TXD
const int trig = 5;
const int echo = 6;

// functions
void checkWDT();
void runSensor(const int trig, const int echo);
void runBT();

// setup the program
void setup(){  
  checkWDT(); // enable watchdog and check for reset
  // set trigger inputs
  pinMode(trig, OUTPUT);
  pinMode(echo, INPUT);
  
  Serial.begin(9600); // begine
  Serial.println("Starting up!\n");

  // set up bluetooth
  BTSerial.begin(9600);
  Serial.println("Bluetooth ready\n");
}

void loop(){
  wdt_reset(); // reset watchdog timer to prevent unneccesary resetting
  runSensor(trig, echo);  // run the sensor
  runBT();

  // set delay before starting again
  delay(2000);
}

// setup watchdog timer and check for previous reset
void checkWDT(){
  // check if reset has occurred
  if (MCUSR & _BV(WDRF)) {
  // Watchdog reset occurred
  MCUSR &= ~_BV(WDRF); // Clear the flag
  }
  // enable watchdog
  wdt_enable(WDTO_4S);
  
}

// run the sensor
void runSensor(const int trig, const int echo){
  digitalWrite(trig, LOW);  // trig is low
  delayMicroseconds(12);  // minimum delay for arduino is 10 microseconds.
  digitalWrite(trig, HIGH);
  delayMicroseconds(12);
  digitalWrite(trig, LOW);

  // duration and distance
  long duration = pulseIn(echo, HIGH, 30000); // find duration until pulse is received
  int distance = duration * .017; // calculate distance
  Serial.print("Distance: ");
  Serial.println(distance);
}

void runBT(){
  if(BTSerial.available()){Serial.write(BTSerial.read());}
  if(Serial.available()){BTSerial.write(Serial.read());}
}
