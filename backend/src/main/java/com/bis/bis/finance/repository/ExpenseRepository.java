package com.bis.bis.finance.repository;

import com.bis.bis.finance.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
}
