console.log('in script');

let employees =[];

$(document).ready(readyNow); //starting point of script

function readyNow(){
    console.log('in readyNow');
    //register event handlers here
    $('#input-Form').on('submit',addNewEmployee);
}
function addNewEmployee(evtArgs){
    //console.log('in addNewEmployee');
    evtArgs.preventDefault();
    //updates the state ie employees array, but only if all input fields have info
    //grab all input
    let f_Name = $('#input-firstName').val();
    let l_Name = $('#input-lastName').val();
    let id = $('#input-ID').val();
    let title = $('#input-JobTitle').val();
    let annualSal = $('#input-AnnualSal').val();
    

    // test all input
    if(f_Name ==='' || l_Name==='' || id===''||title===''|| annualSal===''){
        //do nothing, could maybe add an alert here, but alerts are disruptive
        //need to inform user in someway that something is wrong
        return;
    }
    //create new employee object if all input is good
    let newEmployee = {
        firstName: f_Name,
        lastName: l_Name,
        ID: id,
        jobTitle:title,
        annualSalary: annualSal
    };
    //add new employee obj to employees array, ie state
    employees.push(newEmployee);
    //since employee was added succesfully, clear all inputs
    clearInputs();
    //render the state
    render();


}
function render(){
    //clear table first
    clearTable();
    //render the employees array to the DOM. clear screen and re render all objects everytime a new employee is added
    for(let employee of employees){
        $('#table-body').append(`
            <tr>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.ID}</td>
                <td>${employee.jobTitle}</td>
                <td>${employee.annualSalary}</td>
            </tr>
        `);
    }
}
function clearInputs(){
    //clear input after submit button has been clicked and a employee has been added to global employees array
    $('#input-firstName').val('');
    $('#input-lastName').val('');
    $('#input-ID').val('');
    $('#input-JobTitle').val('');
    $('#input-AnnualSal').val('');
}
function clearTable(){
    $('#table-body').empty();
}