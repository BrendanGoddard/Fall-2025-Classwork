package info5153.exercises.server.report;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.time.LocalDateTime;

@Component
public class ReportDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public Report create(Report report) {

        report.setDate(LocalDateTime.now());
        entityManager.persist(report); // Needed to generate Report ID

        for (ReportItem item : report.getItems()) {
            item.setReportId(report.getID());
            entityManager.persist(item);
        }

        entityManager.flush();
        entityManager.refresh(report);
        return report;
    }
}