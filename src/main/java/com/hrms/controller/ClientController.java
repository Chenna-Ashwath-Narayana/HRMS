package com.hrms.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hrms.model.Client;
import com.hrms.service.ClientService;
import com.hrms.service.ClientServiceImpl;

@RestController
@RequestMapping("/client")
@CrossOrigin(origins = "*")
public class ClientController {

	@Autowired private ClientServiceImpl clientService;
	
	@GetMapping("/listClients")
    public List<Client> getAllClients() {
        return clientService.getAllClients();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Client> getClientById(@PathVariable Long id) {
        Optional<Client> client = clientService.getClientById(id);
        if (client.isPresent()) {
            return ResponseEntity.ok(client.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/addClient")
    public Client addClient(@RequestBody Client client) {
        return clientService.addClient(client);
    }

    @PutMapping("/updateClient/{id}")
    public Client updateClient(@PathVariable Long id, @RequestBody Client client) {
        return clientService.updateClient(id, client);
    }

    @DeleteMapping("/deleteClient/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
        clientService.deleteClient(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/count")
    public long count() {
    	return clientService.count();
    }
}
