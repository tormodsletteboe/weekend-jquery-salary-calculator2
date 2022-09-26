//console.log('in script');

let employees =[]; //  array of all employees
let totalMontly=-1;// total monthly cost variable

$(document).ready(readyNow); //starting point of script
//readyNow
// used to register event handlers
function readyNow(){
    //console.log('in readyNow');
    //register event handlers here
    $('#input-Form').on('submit',addNewEmployee);
    $('#table-body').on('click','.deleteBtn',onDeleteBtn);
}

//onDeleteBtn
//used to delete the employee from the employees array. It updates the new cost and re renders the table.
// to find the employee that belongs to the row in which the delete button was clicked, it finds the .id attribute give to the <tr>
//element when an employee is rendered to the dom. see render() function. This .id is the same id stored in the employee.uniqueID,
//there allowing to find the exact employee
function onDeleteBtn(){
    //console.log('in deleteBtn');
    //find which dom tr was deleted, and find id of that tr
    let uniqID = $(this).parent().parent()[0].id;
    //console.log(uniqID);
    removeEmployee(uniqID);
    updateTotalMonthlyCost();
    render();
}

//removeEmployee
//run through the employees array and find the employee with id of 'uid', if found remove that employee from the state
function removeEmployee(uid){
   //console.log('in removeEmployee');
    let employeeIndexToRemove=-1;
    for(let i =0; i<employees.length; i++){
        //console.log('in for loop find employee to remove')
        if(employees[i].UniqueID==uid){
            //console.log('found employee')
            employeeIndexToRemove=i;
        }
    }
    if(employeeIndexToRemove!=-1){ // ie found one 
        //console.log('in splice');
        employees.splice(employeeIndexToRemove,1);
    }
    


}

//addNewEmployee
//grab the input from the DOM and creates a new employee obj, which gets pushed to employees array
// also updates monthly cost and clears all inputs, and calls render.
//the 'test all input area is redundant as a required attribute has been added to the corresponding html input elements
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
        annualSalary: annualSal,
        UniqueID: Math.random()
    };
    //add new employee obj to employees array, ie state
    employees.push(newEmployee);
    updateTotalMonthlyCost();
    //since employee was added succesfully, clear all inputs
    clearInputs();
    //render the state
    render();


}

//updateTotalMonthlyCost
//updates the global totalMontly variable
function updateTotalMonthlyCost(){
    let totalAnnualCost=0;
    for(let i =0; i<employees.length;i++){
        totalAnnualCost+=Number(employees[i].annualSalary);
    }
    totalMontly=totalAnnualCost/12;
    
}

//render
//renders the employees array to the dom. everytime a new employee is added the function clears the table-body and re populates it with
//whats in the employees array. it also changes the background color of total monthly label based on if its higher or lower than 20k
function render(){
    //clear table first
    clearTable();
    //render the employees array to the DOM. clear screen and re render all objects everytime a new employee is added
    for(let employee of employees){
        $('#table-body').append(`
            <tr id='${employee.UniqueID}'>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.ID}</td>
                <td>${employee.jobTitle}</td>
                <td>${employee.annualSalary}</td>
                <td>
                    <button class ='deleteBtn'>Delete</button>
                </td>
            </tr>
        `);
    }
    $('#label-TotalMonthly').text(`Total Monthly: $${totalMontly.toFixed(2)}`);
    if(totalMontly>20000){
        $('#label-TotalMonthly').removeClass('makewhite');
        $('#label-TotalMonthly').addClass('makered');
    }
    else
    {
        $('#label-TotalMonthly').removeClass('makered');
        $('#label-TotalMonthly').addClass('makewhite');
    }
    
}

//clearInputs
//clears all input elements
function clearInputs(){
    //clear input after submit button has been clicked and a employee has been added to global employees array
    $('#input-firstName').val('');
    $('#input-lastName').val('');
    $('#input-ID').val('');
    $('#input-JobTitle').val('');
    $('#input-AnnualSal').val('');
}

//clearTable
//clears only the table-body, not the table row headers or the table it self.
function clearTable(){
    $('#table-body').empty();
}