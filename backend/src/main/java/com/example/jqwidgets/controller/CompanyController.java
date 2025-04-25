package com.example.jqwidgets.controller;

import com.example.jqwidgets.model.Company;
import com.example.jqwidgets.repository.CompanyRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CompanyController {

    @Autowired
    private CompanyRepository companyRepository;

    @CrossOrigin(origins = "http://localhost:4200")  // Permet à Angular de communiquer avec Spring
    @GetMapping("/api/companies")
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:4200")  // Ajout de la même annotation pour la méthode POST
    @PostMapping("/api/companies")  // Assurez-vous que la méthode POST ait un chemin spécifié
    public Company addCompany(@RequestBody Company company) {
        // Sauvegarder l'entreprise dans la base de données
        return companyRepository.save(company);
    }
    
    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/api/companies")
    public Company editCompany(@RequestBody Company company) {
        if (company.getId() == null || !companyRepository.existsById(company.getId())) {
            throw new IllegalArgumentException("Company with ID " + company.getId() + " does not exist.");
        }

        return companyRepository.save(company);
    }
    
    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/api/companies/{id}")
    public void deleteCompany(@PathVariable Long id) {
        companyRepository.deleteById(id);
    }
}
