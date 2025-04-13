#include <SoftwareSerial.h>
#include <avr/wdt.h>

SoftwareSerial BTSerial(10, 11); // TXD, RXD
const int trig = 6;
const int echo = 5;

// functions
void checkWDT();
void runSensor(const int trig, const int echo);
void runBT();

// setup the program
void setup(){  
  checkWDT(); // enable watchdog and check for reset
  // set triggers
  pinMode(trig, OUTPUT);  // output pin
  pinMode(echo, INPUT); // input pin
  pinMode(A0, OUTPUT);  // output pin
  
  //start program
  Serial.begin(9600); // begin
  Serial.println("Starting up!\n");

  // set up bluetooth
  BTSerial.begin(9600);
  Serial.println("Bluetooth ready\n");
}

// what needs to be run consistently
void loop(){
  wdt_reset(); // reset watchdog timer to prevent unneccesary resetting
  runSensor(trig, echo);  // run the sensor
  runBT();

  // set delay before starting again
  delay(500);
}

// setup watchdog timer and check for previous reset
void checkWDT(){
  // check if reset has occurred
  if (MCUSR & _BV(WDRF)) {
  // Watchdog reset occurred
  MCUSR &= ~_BV(WDRF); // Clear the flag
  }
  // enable watchdog
  wdt_enable(WDTO_1S);
}

// run the sensor
void runSensor(const int trig, const int echo){
  // write to digital pins
  digitalWrite(trig, LOW);  // trig is low
  delayMicroseconds(12);  // minimum delay for arduino is 10 microseconds.
  digitalWrite(trig, HIGH);
  delayMicroseconds(12);
  digitalWrite(trig, LOW);

  // duration and distance
  long duration = pulseIn(echo, HIGH, 30000); // find duration until pulse is received
  int distance = duration * .017; // calculate distance

  // turn on speaker/buzzer if something is too close
  if(distance <= 120){digitalWrite(A0, true);}else{digitalWrite(A0, false);}
  
  // print results
  Serial.print("Distance: ");
  Serial.println(distance);
  // BTSerial.println(distance); // print in bluetooth terminal to test connection
}

void runBT(){
  // print bluetooth input to arduino and arduino input to bluetooth
  if(BTSerial.available()){Serial.print(BTSerial.readString());}
  if(Serial.available()){BTSerial.print(Serial.readString());}
}
