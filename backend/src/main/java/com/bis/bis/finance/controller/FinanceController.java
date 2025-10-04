package com.bis.bis.finance.controller;

import com.bis.bis.finance.model.Expense;
import com.bis.bis.finance.model.Revenue;
import com.bis.bis.finance.repository.ExpenseRepository;
import com.bis.bis.finance.repository.RevenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/finance")
public class FinanceController {

    @Autowired
    private RevenueRepository revenueRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    @PostMapping("/revenue")
    public Revenue addRevenue(@RequestBody Revenue revenue) {
        return revenueRepository.save(revenue);
    }

    @PostMapping("/expense")
    public Expense addExpense(@RequestBody Expense expense) {
        return expenseRepository.save(expense);
    }

    @GetMapping("/profit")
    public Map<String, BigDecimal> getProfit() {
        BigDecimal totalRevenue = revenueRepository.findAll().stream()
                .map(Revenue::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalExpense = expenseRepository.findAll().stream()
                .map(Expense::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal profit = totalRevenue.subtract(totalExpense);

        return Map.of("profit", profit);
    }
}
