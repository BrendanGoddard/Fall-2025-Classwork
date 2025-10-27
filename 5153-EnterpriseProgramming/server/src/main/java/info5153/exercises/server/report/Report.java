package info5153.exercises.server.report;

import lombok.Data;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Data
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long ID;

    // FK
    private long employeeId;

    @OneToMany(targetEntity = ReportItem.class, fetch = FetchType.EAGER, orphanRemoval = true)
    @JoinColumn(name = "reportId", referencedColumnName = "ID")
    private List<ReportItem> items = new ArrayList<>();

    @JsonFormat(pattern = "yyyy-MM-dd@HH:mm:ss")
    private LocalDateTime date;
}