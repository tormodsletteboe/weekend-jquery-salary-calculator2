console.log('in script');

let employees =[];

$(document).ready(readyNow);
function readyNow(){
    console.log('in readyNow');
    //register event handlers here
}
function addNewEmployee(evtArgs){
    evtArgs.preventDefault();

}
function render(){
    //render the employees array to the DOM. clear screen and re render all objects everytime a new employee is added

}
function clearInputs(){
    //clear input after submit button has been clicked and a employee has been added to global employees array

}