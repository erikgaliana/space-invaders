// Create an array that contains objects that you want to save in the localStorage

const score= [
 {name: 'Anna', score: 4120},
 { name: 'Bob', score: 1245},
 { name: 'Sarah', score: 5699},
  { name: 'Marc', score: 3455}
]



// Stringify the data before storing in localStorage
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify

const scoreStringified= JSON.stringify(score);


// Save the data to the localStorage
// https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem

localStorage.setItem('score',scoreStringified);

// Retrieve the stored data from local storage
//  https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem

const retrieved = localStrorage.getItem('score');

co

// Parse the data back into an object/array
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse



// Insert the new score into the array retrieved from the localStorage
//  name: 'Emma', score: 6701

// Stringify the updated array and save it back in the localStorage

// retreive the updated array from the local storage, to check if the previous step was done right