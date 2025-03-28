package com.hrms.service;

import java.util.List;
import java.util.Optional;

import com.hrms.model.Client;

public interface ClientService {

	public List<Client> getAllClients();
	
	public Optional<Client> getClientById(Long id);
	
	public Client addClient(Client client);
	
	public Client updateClient(Long id , Client client);
	
	public void deleteClient(Long id);
	
	long count();
	
}
