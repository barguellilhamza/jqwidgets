package com.example.jqwidgets.repository;

import com.example.jqwidgets.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {
}
