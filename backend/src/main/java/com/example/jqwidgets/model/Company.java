package com.example.jqwidgets.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Company {

    @Id
    private Long id;
    @Column(name = "company_name")
    private String companyName;
    @Column(name = "contact_name")
    private String contactName;
    private String title;
    private String address;
    private String city;
    private String country;

    // Constructeur sans argument
    public Company() {
    }

    // Constructeur avec tous les champs
    public Company(Long id, String companyName, String contactName, String title, String address, String city, String country) {
        this.id = id;
        this.companyName = companyName;
        this.contactName = contactName;
        this.title = title;
        this.address = address;
        this.city = city;
        this.country = country;
    }

    // Getters et Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    // Optionnel: vous pouvez aussi ajouter une méthode `toString()` pour afficher facilement l'objet
    @Override
    public String toString() {
        return "Company [id=" + id + ", companyName=" + companyName + ", contactName=" + contactName + ", title=" + title
                + ", address=" + address + ", city=" + city + ", country=" + country + "]";
    }
}
