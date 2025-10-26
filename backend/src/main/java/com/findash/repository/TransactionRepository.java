package com.findash.repository;

import com.findash.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    
    // Find transactions by type (Income/Expense)
    List<Transaction> findByType(String type);
    
    // Find transactions by category
    List<Transaction> findByCategory(String category);
    
    // Find transactions by date range
    List<Transaction> findByDateBetween(LocalDate startDate, LocalDate endDate);
    
    // Find transactions by merchant
    List<Transaction> findByMerchantContainingIgnoreCase(String merchant);
    
    // Get all transactions ordered by date descending
    List<Transaction> findAllByOrderByDateDesc();
    
    // Calculate total by type
    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.type = ?1")
    Double getTotalByType(String type);
}
