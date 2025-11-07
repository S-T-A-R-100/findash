package com.budgetapp.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class BudgetGoal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double monthlyIncome;
    private double savingsGoal;
    private String targetDate;
    private String savingPurpose;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CategoryBudget> categoryBudgets;

    public BudgetGoal() {}

    // getters and setters
    public Long getId() {
        return id;
    }

    public double getMonthlyIncome() {
        return monthlyIncome;
    }

    public void setMonthlyIncome(double monthlyIncome) {
        this.monthlyIncome = monthlyIncome;
    }

    public double getSavingsGoal() {
        return savingsGoal;
    }

    public void setSavingsGoal(double savingsGoal) {
        this.savingsGoal = savingsGoal;
    }

    public String getTargetDate() {
        return targetDate;
    }

    public void setTargetDate(String targetDate) {
        this.targetDate = targetDate;
    }

    public String getSavingPurpose() {
        return savingPurpose;
    }

    public void setSavingPurpose(String savingPurpose) {
        this.savingPurpose = savingPurpose;
    }

    public List<CategoryBudget> getCategoryBudgets() {
        return categoryBudgets;
    }

    public void setCategoryBudgets(List<CategoryBudget> categoryBudgets) {
        this.categoryBudgets = categoryBudgets;
    }
}
