
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  employee: Employee = new Employee();
  isFormSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  /*ngOnInit(): void {
    this.createForm();
    const employeeId = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(employeeId).subscribe(data => {
      this.employee = data;
      this.patchFormValues();
    }, error => console.log(error));
  }*/
  ngOnInit(): void {
    this.createForm();
    const employeeId = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(employeeId).subscribe(
      data => {
        console.log('Received data:', data);
        this.employee = data;
        console.log('Employee:', this.employee);
        this.patchFormValues();
        console.log('Form values patched:', this.employeeForm.value);
      },
      error => console.log(error)
    );
  }
  

  createForm() {
    this.employeeForm = this.formBuilder.group({
      //firstName: ['', Validators.required],
      firstName: ['this.employee.firstName', [Validators.required, Validators.maxLength(20), Validators.pattern('^[A-Za-z]+$')]],
     // lastName: ['', Validators.required],
     lastName: ['this.employee.lastName', [Validators.required, Validators.maxLength(20), Validators.pattern('^[A-Za-z]+$')]],
      emailId: ['', [Validators.required, Validators.email]],
     // phoneNumber: ['', Validators.required],
     phoneNumber: ['', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$'), // Accept only 10 digits
    ]],
      designation: ['', Validators.required],
      salary: ['', Validators.required],
      state: ['', Validators.required],
      dateColumn: ['', Validators.required]
    });
  }

  patchFormValues() {
    this.employeeForm.patchValue({
      firstName: this.employee.firstName,
      lastName: this.employee.lastName,
      emailId: this.employee.emailId,
      phoneNumber: this.employee.phoneNumber,
      designation: this.employee.designation,
      salary: this.employee.salary,
      state: this.employee.state,
      dateColumn: this.employee.dateColumn
    });
  }
// Define the list of employee designations
employeeDesignations: string[] = ['Manager', 'Supervisor', 'Engineer', 'Analyst', 'Coordinator', 'Specialist', 'Technician'];
// Define the list of employee salaries
employeeSalaries: number[] = [30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];
// Define the list of Indian states
indianStates: string[] = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
  'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Lakshadweep', 'Puducherry'
];

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.employeeForm.valid) {
      const updatedEmployeeData = this.employeeForm.value as Employee;
      this.employeeService.updateEmployee(this.employee.id, updatedEmployeeData).subscribe(data => {
        this.goToEmployeeList();
      }, error => console.log(error));
    }
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }

  isFieldInvalid(field: string): boolean {
    return !!(
      this.employeeForm.get(field)?.invalid &&
      (this.employeeForm.get(field)?.touched || this.isFormSubmitted)
    );
  }

  isFieldTouched(field: string): boolean {
    return this.employeeForm.get(field)?.touched || this.isFormSubmitted;
  }
}




