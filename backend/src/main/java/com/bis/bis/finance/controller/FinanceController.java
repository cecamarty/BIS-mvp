package com.bis.bis.finance.controller;

import com.bis.bis.finance.model.Expense;
import com.bis.bis.finance.model.Revenue;
import com.bis.bis.finance.model.User;
import com.bis.bis.finance.repository.ExpenseRepository;
import com.bis.bis.finance.repository.RevenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/finance")
public class FinanceController {

    @Autowired
    private RevenueRepository revenueRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    // Get all revenues for the logged-in user
    @GetMapping("/revenues")
    public List<Revenue> getRevenues(@AuthenticationPrincipal User user) {
        return revenueRepository.findByUser(user);
    }

    // Get all expenses for the logged-in user
    @GetMapping("/expenses")
    public List<Expense> getExpenses(@AuthenticationPrincipal User user) {
        return expenseRepository.findByUser(user);
    }

    @PostMapping("/revenue")
    public Revenue addRevenue(@RequestBody Revenue revenue, @AuthenticationPrincipal User user) {
        revenue.setUser(user);
        return revenueRepository.save(revenue);
    }

    @PostMapping("/expense")
    public Expense addExpense(@RequestBody Expense expense, @AuthenticationPrincipal User user) {
        expense.setUser(user);
        return expenseRepository.save(expense);
    }

    @GetMapping("/profit")
    public Map<String, BigDecimal> getProfit(@AuthenticationPrincipal User user) {
        BigDecimal totalRevenue = revenueRepository.findByUser(user).stream()
                .map(Revenue::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalExpense = expenseRepository.findByUser(user).stream()
                .map(Expense::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal profit = totalRevenue.subtract(totalExpense);

        return Map.of("profit", profit);
    }
}