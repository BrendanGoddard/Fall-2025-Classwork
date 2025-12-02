package info5153.exercises.server.report;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import info5153.exercises.server.employee.EmployeeRepository;
import info5153.exercises.server.expense.ExpenseRepository;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.io.ByteArrayInputStream;

@CrossOrigin
@RestController
public class ReportController {

    @Autowired
    private ReportDAO reportDAO;
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

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

    @GetMapping(value = "/api/reports/pdf/{id}", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<InputStreamResource> reportPDF(@PathVariable Long id) {

        ByteArrayInputStream bis = PDFGenerator.generateReport(id.toString(), employeeRepository,
                expenseRepository, reportRepository);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=report_" + id.toString() + ".pdf");

        return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
    }

    
}