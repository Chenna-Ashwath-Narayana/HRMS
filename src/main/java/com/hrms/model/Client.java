package com.hrms.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Client {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long clientId;
    private String clientName;
    private String contactPerson;
    private String email;
    private String phoneNumber;
    private String companyName;
    private String address;
    private String status; // Active or Inactive
    
	public Client() {
		super();
	}

	public Client(Long clientId, String clientName, String contactPerson, String email, String phoneNumber,
			String companyName, String address, String status) {
		super();
		this.clientId = clientId;
		this.clientName = clientName;
		this.contactPerson = contactPerson;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.companyName = companyName;
		this.address = address;
		this.status = status;
	}

	public Long getClientId() {
		return clientId;
	}

	public void setClientId(Long clientId) {
		this.clientId = clientId;
	}

	public String getClientName() {
		return clientName;
	}

	public void setClientName(String clientName) {
		this.clientName = clientName;
	}

	public String getContactPerson() {
		return contactPerson;
	}

	public void setContactPerson(String contactPerson) {
		this.contactPerson = contactPerson;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "Client [clientId=" + clientId + ", clientName=" + clientName + ", contactPerson=" + contactPerson
				+ ", email=" + email + ", phoneNumber=" + phoneNumber + ", companyName=" + companyName + ", address="
				+ address + ", status=" + status + "]";
	}
    
    
    
}
