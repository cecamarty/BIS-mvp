package com.bis.bis.finance.repository;

import com.bis.bis.finance.model.Revenue;
import com.bis.bis.finance.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RevenueRepository extends JpaRepository<Revenue, Long> {
    List<Revenue> findByUser(User user);
}
