package com.findash.config;

import com.findash.model.Transaction;
import com.findash.repository.TransactionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final TransactionRepository transactionRepository;

    public DataSeeder(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (transactionRepository.count() > 0) {
            return; // already seeded
        }

        List<Transaction> seeds = new ArrayList<>();

        seeds.add(buildTransaction(LocalDate.of(2025,10,1), "Salary", "Income", "Employer", "Monthly salary", "Income", "Direct Deposit", "October salary", "3500.00"));
        seeds.add(buildTransaction(LocalDate.of(2025,10,3), "Groceries at Whole Foods", "Food & Dining", "Whole Foods", "Grocery shopping", "Expense", "Credit Card", "Weekly groceries", "152.47"));
        seeds.add(buildTransaction(LocalDate.of(2025,10,5), "Electric Bill", "Bills & Utilities", "Electric Co", "Monthly electric bill", "Expense", "Auto Pay", "September usage", "127.89"));
        seeds.add(buildTransaction(LocalDate.of(2025,10,7), "Movie Night", "Entertainment", "AMC Theatres", "Cinema tickets and snacks", "Expense", "Debit Card", "Went with friends", "45.50"));
        seeds.add(buildTransaction(LocalDate.of(2025,10,10), "New Shoes", "Shopping", "Nike Store", "Running shoes", "Expense", "Credit Card", "Training shoes", "189.99"));
        seeds.add(buildTransaction(LocalDate.of(2025,10,12), "Freelance Project", "Income", "Client Co", "Payment for project", "Income", "Bank Transfer", "Website work", "800.00"));
        seeds.add(buildTransaction(LocalDate.of(2025,10,15), "Coffee", "Food & Dining", "Starbucks", "Daily coffee", "Expense", "Cash", "Morning coffee", "5.50"));
        seeds.add(buildTransaction(LocalDate.of(2025,10,18), "Gym Membership", "Health & Fitness", "Local Gym", "Monthly membership", "Expense", "Credit Card", "October membership", "49.99"));
        seeds.add(buildTransaction(LocalDate.of(2025,10,20), "Stock Dividend", "Investment", "Brokerage", "Quarterly dividend", "Income", "Direct Deposit", "Stock XYZ dividend", "60.00"));
        seeds.add(buildTransaction(LocalDate.of(2025,10,22), "Taxi", "Transportation", "City Cabs", "Ride to airport", "Expense", "Credit Card", "Late night ride", "32.25"));

        transactionRepository.saveAll(seeds);
    }

    private Transaction buildTransaction(LocalDate date, String description, String category, String merchant, String notes,
                                         String type, String paymentMethod, String noteShort, String amount) {
        Transaction t = new Transaction();
        t.setDate(date);
        t.setDescription(description);
        t.setCategory(category);
        t.setMerchant(merchant);
        t.setAmount(new BigDecimal(amount));
        t.setType(type);
        t.setPaymentMethod(paymentMethod);
        t.setNotes(notes + (noteShort != null && !noteShort.isEmpty() ? " - " + noteShort : ""));
        t.setCreatedAt(LocalDate.now());
        t.setUpdatedAt(LocalDate.now());
        return t;
    }
}
