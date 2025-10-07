package info5153.exercises.server.expense;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
@Data
public class ExpenseCategory {
    @Id
    private String ID;
    private String description;
}