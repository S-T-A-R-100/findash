package com.findash.service;

import com.findash.model.Transaction;
import com.findash.repository.TransactionRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TransactionServiceTest {

    @Mock
    private TransactionRepository transactionRepository;

    @InjectMocks
    private TransactionService transactionService;

    private Transaction sampleTransaction(Long id) {
        return new Transaction(
                id,
                LocalDate.of(2023, 1, 1),
                "Groceries",
                "Food",
                "Market",
                new BigDecimal("12.34"),
                "Expense",
                "Card",
                "Notes",
                LocalDate.of(2023, 1, 1),
                LocalDate.of(2023, 1, 1)
        );
    }

    @Test
    void getAllTransactions_returnsOrderedList() {
        List<Transaction> expected = Arrays.asList(sampleTransaction(1L), sampleTransaction(2L));
        when(transactionRepository.findAllByOrderByDateDesc()).thenReturn(expected);

        List<Transaction> actual = transactionService.getAllTransactions();

        assertEquals(expected, actual);
        verify(transactionRepository, times(1)).findAllByOrderByDateDesc();
    }

    @Test
    void getTransactionById_found() {
        Transaction t = sampleTransaction(5L);
        when(transactionRepository.findById(5L)).thenReturn(Optional.of(t));

        Optional<Transaction> result = transactionService.getTransactionById(5L);

        assertTrue(result.isPresent());
        assertEquals(t, result.get());
    }

    @Test
    void createTransaction_savesAndReturns() {
        Transaction toCreate = sampleTransaction(null);
        Transaction saved = sampleTransaction(10L);
        when(transactionRepository.save(toCreate)).thenReturn(saved);

        Transaction result = transactionService.createTransaction(toCreate);

        assertEquals(saved, result);
        verify(transactionRepository).save(toCreate);
    }

    @Test
    void updateTransaction_updatesWhenFound() {
        Transaction existing = sampleTransaction(3L);
        Transaction details = sampleTransaction(3L);
        details.setDescription("Updated");
        details.setAmount(new BigDecimal("99.99"));

        when(transactionRepository.findById(3L)).thenReturn(Optional.of(existing));
        when(transactionRepository.save(any(Transaction.class))).thenAnswer(inv -> inv.getArgument(0));

        Transaction updated = transactionService.updateTransaction(3L, details);

        assertEquals("Updated", updated.getDescription());
        assertEquals(new BigDecimal("99.99"), updated.getAmount());
        verify(transactionRepository).findById(3L);
        verify(transactionRepository).save(existing);
    }

    @Test
    void updateTransaction_throwsWhenNotFound() {
        when(transactionRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> transactionService.updateTransaction(99L, sampleTransaction(99L)));
        verify(transactionRepository).findById(99L);
        verify(transactionRepository, never()).save(any());
    }

    @Test
    void deleteTransaction_deletesWhenFound() {
        Transaction existing = sampleTransaction(7L);
        when(transactionRepository.findById(7L)).thenReturn(Optional.of(existing));

        transactionService.deleteTransaction(7L);

        verify(transactionRepository).findById(7L);
        verify(transactionRepository).delete(existing);
    }

    @Test
    void deleteTransaction_throwsWhenNotFound() {
        when(transactionRepository.findById(123L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> transactionService.deleteTransaction(123L));
        verify(transactionRepository).findById(123L);
        verify(transactionRepository, never()).delete(any());
    }

    @Test
    void getTransactionsByType_delegatesToRepository() {
        List<Transaction> items = Arrays.asList(sampleTransaction(1L));
        when(transactionRepository.findByType("Expense")).thenReturn(items);

        List<Transaction> result = transactionService.getTransactionsByType("Expense");

        assertEquals(items, result);
        verify(transactionRepository).findByType("Expense");
    }

    @Test
    void getTotalByType_handlesNullAndReturnsZero() {
        when(transactionRepository.getTotalByType("Income")).thenReturn(null);
        Double total = transactionService.getTotalByType("Income");
        assertEquals(0.0, total);

        when(transactionRepository.getTotalByType("Expense")).thenReturn(123.45);
        assertEquals(123.45, transactionService.getTotalByType("Expense"));
    }
}
