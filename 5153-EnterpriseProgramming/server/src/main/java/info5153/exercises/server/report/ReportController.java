package info5153.exercises.server.report;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class ReportController {

    @Autowired
    private ReportDAO reportDAO;
    @Autowired
    private ReportRepository reportRepository;

    @GetMapping("/api/reports/{id}")
    public ResponseEntity<Iterable<Report>> findByEmployee(@PathVariable Long id) {
        return new ResponseEntity<Iterable<Report>>(reportRepository.findByEmployeeId(id), HttpStatus.OK);
    }

    @PostMapping("/api/reports")
    public ResponseEntity<Report> addOne(@RequestBody Report report) {
        return new ResponseEntity<Report>(reportDAO.create(report), HttpStatus.OK);
    }

    
}