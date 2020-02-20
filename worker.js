addEventListener("message", received);

function received(event){

    const {index, job} = event.data
   


    const fizz = (num)=> (num % 3 === 0) ? "Fizz" : num;
    const buzz = (num)=> (num % 5 === 0) ? "Buzz" : num;
    const fizzBuzz = (num)=> (num % 15 === 0) ? "FizzBuzz" : num;


    const compose = (...functions)=> initialValue => functions.reduceRight((value, funct) => funct(value), initialValue);
    const composeFizzBuzz = compose(fizz,buzz,fizzBuzz);
    const answer = job.map(composeFizzBuzz);

 
    postMessage({index, answer});



}