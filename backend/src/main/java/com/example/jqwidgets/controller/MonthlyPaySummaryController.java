package com.example.jqwidgets.controller;

import com.example.jqwidgets.model.MonthlyPaySummary;
import com.example.jqwidgets.repository.MonthlyPaySummaryRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@RestController
@RequestMapping("/api/monthly-pay")  // Préfixe commun pour ce contrôleur
@CrossOrigin(origins = "http://localhost:4200")
public class MonthlyPaySummaryController {

    @Autowired
    private MonthlyPaySummaryRepository monthlyPaySummaryRepository;

    @GetMapping
    public List<MonthlyPaySummary> getAllSummaries() {
        return monthlyPaySummaryRepository.findAll();
    }

    @PostMapping
    public MonthlyPaySummary addSummary(@RequestBody MonthlyPaySummary summary) {
        return monthlyPaySummaryRepository.save(summary);
    }

    @PutMapping
    public MonthlyPaySummary editSummary(@RequestBody MonthlyPaySummary summary) {
        if (summary.getId() == null || !monthlyPaySummaryRepository.existsById(summary.getId())) {
            throw new IllegalArgumentException("Summary with ID " + summary.getId() + " does not exist.");
        }
        return monthlyPaySummaryRepository.save(summary);
    }

    @DeleteMapping("/{id}")
    public void deleteSummary(@PathVariable Long id) {
        monthlyPaySummaryRepository.deleteById(id);
    }
}
