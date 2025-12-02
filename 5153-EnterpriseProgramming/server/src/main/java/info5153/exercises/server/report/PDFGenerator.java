package info5153.exercises.server.report;

import info5153.exercises.server.employee.Employee;
import info5153.exercises.server.employee.EmployeeRepository;
import info5153.exercises.server.expense.Expense;
import info5153.exercises.server.expense.ExpenseRepository;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.text.NumberFormat;
import java.util.Locale;
import java.util.Optional;
import java.time.format.DateTimeFormatter;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;

import com.itextpdf.io.exceptions.IOException;

import org.springframework.web.servlet.view.document.AbstractPdfView;

public abstract class PDFGenerator extends AbstractPdfView {

    public static ByteArrayInputStream generateReport(
            String id,
            EmployeeRepository employeeRepository,
            ExpenseRepository expenseRepository,
            ReportRepository reportRepository) throws IOException {

        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        try {

            PdfWriter writer = new PdfWriter(baos);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);
            PdfFont font = PdfFontFactory.createFont(StandardFonts.HELVETICA);
            Locale locale = Locale.of("en", "US");
            NumberFormat numberFormatter = NumberFormat.getCurrencyInstance(locale);
            DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

            document.add(new Paragraph(String.format("Report ID #" + id)).setFont(font).setFontSize(12)
                    .setTextAlignment(TextAlignment.CENTER).simulateBold());

            // Table created, but not added yet
            Table table = new Table(4);
            table.setWidth(new UnitValue(UnitValue.PERCENT, 100));

            // Headers
            Cell cell = new Cell().add(new Paragraph("ID").setFont(font).setFontSize(12).simulateBold())
                    .setTextAlignment(TextAlignment.CENTER);
            table.addCell(cell);
            cell = new Cell().add(new Paragraph("Date Incurred").setFont(font).setFontSize(12).simulateBold())
                    .setTextAlignment(TextAlignment.CENTER);
            table.addCell(cell);
            cell = new Cell().add(new Paragraph("Description").setFont(font).setFontSize(12).simulateBold())
                    .setTextAlignment(TextAlignment.CENTER);
            table.addCell(cell);
            cell = new Cell().add(new Paragraph("Amount").setFont(font).setFontSize(12).simulateBold())
                    .setTextAlignment(TextAlignment.CENTER);
            table.addCell(cell);

            // To store the date when the Report was generated
            String reportDate = "";

            // Table Data
            Optional<Report> nullableReport = reportRepository.findById(Long.parseLong(id));
            if (nullableReport.isPresent()) {

                Report report = nullableReport.get();
                reportDate = dateTimeFormatter.format(report.getDate());

                Optional<Employee> nullableEmployee = employeeRepository.findById(report.getEmployeeId());
                if (nullableEmployee.isPresent()) {

                    // Employee data
                    Employee employee = nullableEmployee.get();
                    String employeeInfo = "Employee: " + employee.getFirstName() + " " + employee.getLastName() + " ("
                            + employee.getEmail() + ")";

                    document.add(new Paragraph(employeeInfo).setFont(font).setFontSize(12)
                            .setTextAlignment(TextAlignment.CENTER).simulateBold());
                }

                BigDecimal totalExpense = new BigDecimal(0);

                for (ReportItem item : report.getItems()) {
                    Optional<Expense> nullableExpense = expenseRepository.findById(item.getExpenseId());
                    if (!nullableEmployee.isPresent()) {
                        continue;
                    }

                    Expense expense = nullableExpense.get();
                    totalExpense = totalExpense.add(expense.getAmount(), new MathContext(8, RoundingMode.UP));

                    // Rows
                    String expenseId = "" + item.getExpenseId();
                    cell = new Cell().add(new Paragraph(expenseId).setFont(font).setFontSize(12)
                            .setTextAlignment(TextAlignment.CENTER));
                    table.addCell(cell);

                    String expenseDate = expense.getDate();
                    String formattedDate = expenseDate.substring(0, 10); // Remove the time-of-day part

                    cell = new Cell().add(new Paragraph(formattedDate)).setFont(font).setFontSize(12)
                            .setTextAlignment(TextAlignment.CENTER);
                    table.addCell(cell);

                    String expenseDescription = expense.getDescription();
                    cell = new Cell().add(new Paragraph(expenseDescription).setFont(font).setFontSize(12)
                            .setTextAlignment(TextAlignment.CENTER));
                    table.addCell(cell);

                    String expenseAmount = numberFormatter.format(expense.getAmount());
                    cell = new Cell().add(new Paragraph(expenseAmount).setFont(font).setFontSize(12)
                            .setTextAlignment(TextAlignment.RIGHT));
                    table.addCell(cell);
                }

                cell = new Cell(1, 3).add(new Paragraph("Total:").setFont(font).setFontSize(12).simulateBold()
                        .setTextAlignment(TextAlignment.RIGHT));
                table.addCell(cell);
                cell = new Cell()
                        .add(new Paragraph(totalExpense.toString()).setFont(font).setFontSize(12).simulateBold()
                                .setTextAlignment(TextAlignment.RIGHT).setBackgroundColor(ColorConstants.YELLOW));
                table.addCell(cell);
            }

            document.add(new Paragraph("\n"));
            document.add(table);

            document.add(new Paragraph("\n"));
            document.add(new Paragraph(reportDate).setTextAlignment(TextAlignment.CENTER));
            document.close();

        } catch (Exception ex) {
            Logger.getLogger(PDFGenerator.class.getName()).log(Level.SEVERE, null, ex);
        }

        return new ByteArrayInputStream(baos.toByteArray());
    }
}