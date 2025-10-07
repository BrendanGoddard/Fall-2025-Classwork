package info5153.exercises.server.expense;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import java.math.BigDecimal;

@Entity
@Data
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long ID;
    private long employeeId;
    private String categoryId;
    private String description;
    private BigDecimal amount;
    private String date;
}