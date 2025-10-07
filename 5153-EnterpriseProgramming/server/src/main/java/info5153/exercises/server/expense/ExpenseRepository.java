package info5153.exercises.server.expense;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "expenses", path = "expenses")
public interface ExpenseRepository extends CrudRepository<Expense, Long> {
    @Modifying
    @Transactional
    @Query("DELETE from Expense WHERE id = ?1")
    int deleteOne(Long id);
}