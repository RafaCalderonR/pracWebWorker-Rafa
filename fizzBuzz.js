class fizzBuzz {
    constructor(view) {

      this.view = view;
      this.sectionForm = this.view.getElementById("form-section");
      this.form = this.view.createElement("form");
      this.workersInput = this.view.createElement("input");
      this.workersInput.placeholder = "workers";
      this.numberInput = this.view.createElement("input");
      this.numberInput.placeholder = "num";
      this.submitButton = this.view.createElement("button");
      this.submitButton.textContent = "Start";
      this.form.append(this.workersInput, this.numberInput, this.submitButton);
      this.sectionForm.append(this.form);
      this.getValues();
      this.arrayResponse
      this.response= [];
     
    }
  
    get _workersInput() {
      return this.workersInput.value;
    }
  
    get _numberInput() {
      return this.numberInput.value;
    }
  
    resetForm() {
      this.numberInput.value = "";
      this.workersInput.value = "";
    }

  
    getValues() {
      this.form.addEventListener("submit", event => {
        event.preventDefault();
  
        this.builderWorker(this._numberInput, this._workersInput);
      });
    }


    pipe = (...functions) => initialValue =>
      functions.reduce((value, funct) => funct(value), initialValue);


    builderWorker(number, workers) {

      const cuts = number / workers;
  
      const arrayNumber = [...Array(Number(number)).keys()];
  
      const workerGroup = [...Array(Number(workers))].map(
        this.pipe(
          this.createWorker,
          this.asingAddEventListener
        )
      );
  
      const chunkArray = this.chunk(arrayNumber, cuts);
  
      chunkArray.map((job, index) => workerGroup[index].postMessage({index, job}));

      
    }
  
    recieved =(e)=> {
      
      const {index, answer} = e.data
      this.response[index] = answer;
      e.target.terminate();

      this.display();
     
        
    }

   

    display=()=>{
      
      console.log(this.response)
    }

  
    createWorker() {
      return new Worker("worker.js");
    }
  
    asingAddEventListener = worker => {
      worker.addEventListener("message", this.recieved);
      return worker;
    };
  
    chunk(array, size) {
      if (!array.length) {
        return [];
      }
      const head = array.slice(0, size);
      const tail = array.slice(size);
  
      return [head, ...this.chunk(tail, size)];
    }


    
  }