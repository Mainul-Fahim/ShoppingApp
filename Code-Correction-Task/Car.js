class Car {  
    
    // correction 1
    constructor(name) {
      this.name = name;
    }
    
    printName() {
      console.log("Car name: " + this.name);
    }
  
    printAssembly() {
      console.log("The Tesla Car finishes assembly every Friday at 5pm.");
    }
  }
  
  class TeslaCar extends Car {
    // correction 2
    constructor(name) {
      super(name);
    }
    
    // correction 3
    generateAssemblyReports(format) {
      console.log("Generating assembly reports...");
      console.log("Exporting " + format + " format reports...");
      console.log("Printing reports...");
    }
  }
  
  const myCar = new TeslaCar("Model_3");
  myCar.printName();
  myCar.generateAssemblyReports("CSV");