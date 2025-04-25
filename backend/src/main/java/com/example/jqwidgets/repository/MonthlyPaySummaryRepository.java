package com.example.jqwidgets.repository;

import com.example.jqwidgets.model.MonthlyPaySummary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MonthlyPaySummaryRepository extends JpaRepository<MonthlyPaySummary, Long> {
}
