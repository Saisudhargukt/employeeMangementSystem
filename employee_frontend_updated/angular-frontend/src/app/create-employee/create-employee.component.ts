import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
//import { error } from 'console';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent implements OnInit{
  
  employee: Employee = new Employee();

  validateForm: FormGroup | any ;
  //validateForm: any;
  

  constructor(private employeeService: EmployeeService,
    private router: Router, private fb : FormBuilder){
  }
  ngOnInit(): void {

    this.validateForm = this.fb.group({         
     emailId: [this.employee.emailId, [ Validators.required,Validators.email]],
    // firstName: [this.employee.firstName, Validators.required],
    firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.maxLength(20)]],

     // lastName: [this.employee.lastName, Validators.required],
     lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.maxLength(20)]],

     // phoneNumber:[this.employee.phoneNumber,Validators.required],
    // designation:[this.employee.designation,Validators.required],
     phoneNumber: [this.employee.phoneNumber, [Validators.required, this.phoneNumberValidator()]],
     designation: [this.employee.designation, [Validators.required, this.onlyCharactersValidator()]],
      //salary:[this.employee.designation,Validators.required],
      salary: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      //state :[this.employee.state,Validators.required] ,
      state: ['', [Validators.required, this.onlyCharactersValidator()]],

      dateColumn:[this.employee.dateColumn,Validators.required] ,
     // fileData: [this.employee.fileData, Validators.required]   
  })
}
salaryOptions = ['10000', '20000', '30000', '40000']; // Sample salary options, you can populate it dynamically

// You can bind this salaryOptions array to the HTML select dropdown.
stateOptions = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];

  saveEmployee(){
    
    this.employeeService.createEmployee(this.employee).subscribe(data => {
      console.log(data);
      this.goToEmployeeList();
    },
    error => console.log(error));
  }


  goToEmployeeList(){
    this.router.navigate(['/employees'])
  }
 /* onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.validateForm.get('employee.fileData').setValue(file); // Set the selected file in form control
}*/
  onSubmit(){
    if (this.validateForm)
    {
      if (this.validateForm.valid) {

        this.employee = { ...this.validateForm.value };
        console.log(this.employee)
      this.saveEmployee();

      }
      else {
        alert('Please fill in all required fields');
      }
    }

      }
     phoneNumberValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
          const phoneNumber = control.value;
          const isValid = /^\d{10}$/.test(phoneNumber);
      
          return isValid ? null : { invalidPhoneNumber: true };
        };
      }
      
     onlyCharactersValidator() {
        return (control: { value: any }): { [key: string]: any } | null => {
          const isValid = /^[A-Za-z\s]+$/.test(control.value);
          return isValid ? null : { invalidDesignation: true };
        };
      }
      employeeDesignations: string[] = [
        'Software Engineer',
        'HR Manager',
        'Sales Representative',
        // Add more designations as needed
      ];
      

 

}
