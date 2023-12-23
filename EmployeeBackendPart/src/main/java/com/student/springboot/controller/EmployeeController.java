package com.student.springboot.controller;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.student.springboot.exception.ResourceNotFoundException;
import com.student.springboot.model.Employee;
import com.student.springboot.repository.EmployeeRepository;

import jakarta.persistence.criteria.Path;

@CrossOrigin(origins= {"*"}, maxAge = 4800, allowCredentials = "false")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	//get all employees
	
	
	@GetMapping("/employees")
	public List<Employee> getAllEmployees()
	{
		return employeeRepository.findAll();
	}
	
	// create employee rest api
	@PostMapping("/employees")
	public Employee createEmployee(@RequestBody Employee employee)
	{
		return employeeRepository.save(employee);
		
	}
	
	// get employee by id rest api
	
	@GetMapping("/employees/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id)
	{
		Employee employee=employeeRepository.findById(id)
				.orElseThrow(()->new ResourceNotFoundException("Employee not exist with id :"+id));
		return ResponseEntity.ok(employee);
	}
  
	// update Employee rest api
	
	@PutMapping("/employees/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable Long id,@RequestBody Employee employeeDetails)
	{
		
		Employee employee=employeeRepository.findById(id)
				.orElseThrow(()->new ResourceNotFoundException("Employee not exist with id :"+id));
		
		employee.setFirstName(employeeDetails.getFirstName());
		employee.setLastName(employeeDetails.getLastName());
		employee.setEmailId(employeeDetails.getEmailId());
		employee.setPhoneNumber(employeeDetails.getPhoneNumber());
		employee.setDesignation(employeeDetails.getDesignation());
		employee.setSalary(employeeDetails.getSalary());
		employee.setState(employeeDetails.getState());
		employee.setDateColumn(employeeDetails.getDateColumn());
		
		
	    Employee updatedEmployee=employeeRepository.save(employee);
	    return ResponseEntity.ok(updatedEmployee);
		
	}
	
	
	// delete employee rest api
	
	@DeleteMapping("/employees/{id}")
	public ResponseEntity<Map<String,Boolean>> deleteEmployee(@PathVariable Long id)
	{
		Employee employee=employeeRepository.findById(id)
				.orElseThrow(()->new ResourceNotFoundException("Employee not exist with id :"+id));
		
		employeeRepository.delete(employee);
		
		Map<String,Boolean> response=new HashMap();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
 		
	}
	 private final String uploadDirectory = "C://Users//saisu//eclipse-workspace//MySpringboot_backend//application//";

	    @PostMapping("/upload")
	    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file,@RequestParam("id") Long employeeId) {
	       
	    	Employee employee = employeeRepository.findById(employeeId)
	                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + employeeId));
	    	
	    	
	    	if (file.isEmpty()) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please select a file to upload");
	        }

	        try {
	            // Get the filename
	            String fileName = file.getOriginalFilename();

	            // Validate file format if needed
	            if (!fileName.toLowerCase().endsWith(".jpg") && !fileName.toLowerCase().endsWith(".png")) {
	                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Only JPG/PNG files are allowed");
	            }

	            // Create the upload directory if it doesn't exist
	            java.nio.file.Path uploadPath =  Paths.get(uploadDirectory);
	            if (!Files.exists(uploadPath)) {
	                Files.createDirectories(uploadPath);
	            }

	            // Save the file to the upload directory
	            try (FileOutputStream fos = new FileOutputStream(uploadDirectory + fileName)) {
	                fos.write(file.getBytes());
	                employee.setFileData(file.getBytes());
	                employeeRepository.save(employee);
	                
	            }

	            return ResponseEntity.ok("File uploaded successfully: " + fileName);
	          
	         
	        } catch (IOException e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload the file: " + e.getMessage());
	        }
	    }
	

	
	
     }

