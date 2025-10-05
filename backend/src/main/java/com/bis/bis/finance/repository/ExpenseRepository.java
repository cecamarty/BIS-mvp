package com.bis.bis.finance.repository;

import com.bis.bis.finance.model.Expense;
import com.bis.bis.finance.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByUser(User user);
}
