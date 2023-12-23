 package com.student.springboot.model;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name="employees")
public class Employee {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	
	@Column(name="first_name")
	private String firstName;
	
	@Column(name="last_name")
	private String lastName;
	
	@Column(name="email_id")
	private String emailId;
	
	@Column(name="phone_number")
	private Long phoneNumber;
	
	@Column(name="emp_designation")
	private String designation;
	
	@Column(name="salary")
	private String salary;
	
	@Column(name="state")
	private String state;
	
	
	@Column(name = "emp_joining_date")
    private LocalDate dateColumn;
	
	@Lob
    @Column(name="file_data")
    private byte[] fileData;
	
	public byte[] getFileData() {
		return fileData;
	}
	public void setFileData(byte[] fileData) {
		this.fileData = fileData;
	}
	public LocalDate getDateColumn() {
		return dateColumn;
	}
	public void setDateColumn(LocalDate dateColumn) {
		this.dateColumn = dateColumn;
	}
	public Long getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(Long phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	
	public String getDesignation() {
		return designation;
	}
	public void setDesignation(String designation) {
		this.designation = designation;
	}
	public String getSalary() {
		return salary;
	}
	public void setSalary(String salary) {
		this.salary = salary;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	
	
	
	public Employee(long id, String firstName, String lastName, String emailId, Long phoneNumber, String designation,
			String salary, String state, LocalDate dateColumn, byte[] fileData) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.emailId = emailId;
		this.phoneNumber = phoneNumber;
		this.designation = designation;
		this.salary = salary;
		this.state = state;
		this.dateColumn = dateColumn;
		this.fileData = fileData;
	}
	public Employee() {
		super();
	}
	

}
