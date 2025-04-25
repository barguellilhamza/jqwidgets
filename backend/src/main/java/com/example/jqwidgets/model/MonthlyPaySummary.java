package com.example.jqwidgets.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class MonthlyPaySummary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Cela permet à Hibernate de générer l'ID automatiquement
    private Long id; 

    private String mois;

    @Column(name = "entreprise1")
    private String entreprise1;

    @Column(name = "pay1")
    private Double pay1;

    @Column(name = "entreprise2")
    private String entreprise2;

    @Column(name = "pay2")
    private Double pay2;

    private Double gain;

    @Column(name = "gain2")
    private Double gain2;  // Nouvelle colonne gain2

    @Column(name = "gainT")
    private Double gainT;  // Nouvelle colonne gainT

    public MonthlyPaySummary() {
    }

    // Constructeur modifié pour inclure gain2 et gainT
    public MonthlyPaySummary(Long id, String mois, String entreprise1, Double pay1, String entreprise2, Double pay2, Double gain, Double gain2, Double gainT) {
        this.id = id;
        this.mois = mois;
        this.entreprise1 = entreprise1;
        this.pay1 = pay1;
        this.entreprise2 = entreprise2;
        this.pay2 = pay2;
        this.gain = gain;
        this.gain2 = gain2;
        this.gainT = gainT;
    }

    // Getters et setters pour gain2 et gainT
    public Double getGain2() {
        return gain2;
    }

    public void setGain2(Double gain2) {
        this.gain2 = gain2;
    }

    public Double getGainT() {
        return gainT;
    }

    public void setGainT(Double gainT) {
        this.gainT = gainT;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMois() {
        return mois;
    }

    public void setMois(String mois) {
        this.mois = mois;
    }

    public String getEntreprise1() {
        return entreprise1;
    }

    public void setEntreprise1(String entreprise1) {
        this.entreprise1 = entreprise1;
    }

    public Double getPay1() {
        return pay1;
    }

    public void setPay1(Double pay1) {
        this.pay1 = pay1;
    }

    public String getEntreprise2() {
        return entreprise2;
    }

    public void setEntreprise2(String entreprise2) {
        this.entreprise2 = entreprise2;
    }

    public Double getPay2() {
        return pay2;
    }

    public void setPay2(Double pay2) {
        this.pay2 = pay2;
    }

    public Double getGain() {
        return gain;
    }

    public void setGain(Double gain) {
        this.gain = gain;
    }

    @Override
    public String toString() {
        return "MonthlyPaySummary{" +
                "id=" + id +
                ", mois='" + mois + '\'' +
                ", entreprise1='" + entreprise1 + '\'' +
                ", pay1=" + pay1 +
                ", entreprise2='" + entreprise2 + '\'' +
                ", pay2=" + pay2 +
                ", gain=" + gain +
                ", gain2=" + gain2 +  // Ajout de gain2
                ", gainT=" + gainT +  // Ajout de gainT
                '}';
    }
}
