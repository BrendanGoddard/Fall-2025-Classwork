package info5153.casestudy.server.po;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.NumberFormat;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.net.URL;

import info5153.casestudy.server.qr.QRCodeGenerator;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.properties.HorizontalAlignment;

import org.springframework.web.servlet.view.document.AbstractPdfView;

import com.itextpdf.io.exceptions.IOException;
import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;

import info5153.casestudy.server.product.Product;
import info5153.casestudy.server.product.ProductRepository;
import info5153.casestudy.server.vendor.Vendor;
import info5153.casestudy.server.vendor.VendorRepository;

public abstract class PDFGenerator extends AbstractPdfView {

    public static ByteArrayInputStream generatePurchaseOrder(
            String id,
            VendorRepository vendorRepository,
            ProductRepository productRepository,
            PurchaseOrderRepository purchaseOrderRepository) throws IOException {

        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        try {
            PdfWriter writer = new PdfWriter(baos);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);
            PdfFont font = PdfFontFactory.createFont(StandardFonts.HELVETICA);

            Locale locale = Locale.of("en", "CA");
            NumberFormat currency = NumberFormat.getCurrencyInstance(locale);
            DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

            URL imageUrl = PDFGenerator.class.getResource("/static/images/logo-bg.png");
            Image img = new Image(ImageDataFactory.create(imageUrl)).setMaxHeight(64).setHorizontalAlignment(HorizontalAlignment.CENTER);
            document.add(img);
            // Title
            document.add(
                new Paragraph("Purchase Order ID #" + id)
                    .setFont(font)
                    .setFontSize(12)
                    .setTextAlignment(TextAlignment.CENTER)
                    .simulateBold()
            );

            // Table with 5 columns
            Table table = new Table(5);
            table.setWidth(new UnitValue(UnitValue.PERCENT, 100));

            Cell cell;

            cell = new Cell().add(
                    new Paragraph("Product ID")
                        .setFont(font)
                        .setFontSize(12)
                        .simulateBold()
                ).setTextAlignment(TextAlignment.CENTER);
            table.addCell(cell);

            cell = new Cell().add(
                    new Paragraph("Product Name")
                        .setFont(font)
                        .setFontSize(12)
                        .simulateBold()
                ).setTextAlignment(TextAlignment.CENTER);
            table.addCell(cell);

            cell = new Cell().add(
                    new Paragraph("Quantity")
                        .setFont(font)
                        .setFontSize(12)
                        .simulateBold()
                ).setTextAlignment(TextAlignment.CENTER);
            table.addCell(cell);

            cell = new Cell().add(
                    new Paragraph("Unit Cost")
                        .setFont(font)
                        .setFontSize(12)
                        .simulateBold()
                ).setTextAlignment(TextAlignment.CENTER);
            table.addCell(cell);

            cell = new Cell().add(
                    new Paragraph("Line Total")
                        .setFont(font)
                        .setFontSize(12)
                        .simulateBold()
                ).setTextAlignment(TextAlignment.CENTER);
            table.addCell(cell);

            String poDate = "";

            
            String summary = "PO ID #" + id + "\n";

            Optional<PurchaseOrder> nullablePo = purchaseOrderRepository.findById(Long.parseLong(id));
            if (nullablePo.isPresent()) {
                PurchaseOrder po = nullablePo.get();
                poDate = dateTimeFormatter.format(po.getDate());

                // Vendor info
                Optional<Vendor> nullableVendor = vendorRepository.findById(po.getVendorId());
                if (nullableVendor.isPresent()) {
                    Vendor vendor = nullableVendor.get();
                    String vendorInfo =
                        "Vendor: " + vendor.getName() + " (" + vendor.getEmail() + ")";
                    document.add(
                        new Paragraph(vendorInfo)
                            .setFont(font)
                            .setFontSize(12)
                            .setTextAlignment(TextAlignment.CENTER)
                            .simulateBold()
                    );
                     summary += vendorInfo + "\n";
                }

                // === MONEY CALCULATIONS ===
                BigDecimal subTotal = BigDecimal.ZERO;

                for (PurchaseOrderLineItem item : po.getItems()) {
                    Optional<Product> nullableProduct = productRepository.findById(item.getProductId());
                    if (!nullableProduct.isPresent()) {
                        continue;
                    }

                    Product product = nullableProduct.get();
                    BigDecimal unitCost = product.getCost();
                    BigDecimal quantity = new BigDecimal(item.getQuantity());
                    BigDecimal lineTotal = unitCost
                            .multiply(quantity)
                            .setScale(2, RoundingMode.HALF_UP);

                    subTotal = subTotal
                            .add(lineTotal)
                            .setScale(2, RoundingMode.HALF_UP);

                    // Product ID
                    cell = new Cell().add(
                            new Paragraph(product.getID())
                                .setFont(font)
                                .setFontSize(12)
                        ).setTextAlignment(TextAlignment.CENTER);
                    table.addCell(cell);

                    // Product Name
                    cell = new Cell().add(
                            new Paragraph(product.getName())
                                .setFont(font)
                                .setFontSize(12)
                        ).setTextAlignment(TextAlignment.LEFT);
                    table.addCell(cell);

                    // Quantity (int -> String)
                    cell = new Cell().add(
                            new Paragraph(String.valueOf(item.getQuantity()))
                                .setFont(font)
                                .setFontSize(12)
                        ).setTextAlignment(TextAlignment.CENTER);
                    table.addCell(cell);

                    // Unit Cost
                    cell = new Cell().add(
                            new Paragraph(currency.format(unitCost))
                                .setFont(font)
                                .setFontSize(12)
                        ).setTextAlignment(TextAlignment.RIGHT);
                    table.addCell(cell);

                    // Line Total
                    cell = new Cell().add(
                            new Paragraph(currency.format(lineTotal))
                                .setFont(font)
                                .setFontSize(12)
                        ).setTextAlignment(TextAlignment.RIGHT);
                    table.addCell(cell);

                    summary += currency.format(lineTotal) + "\n" + poDate;

                }

                // Tax and Total (13% HST)
                BigDecimal tax = subTotal
                        .multiply(new BigDecimal("0.13"))
                        .setScale(2, RoundingMode.HALF_UP);
                BigDecimal total = subTotal
                        .add(tax)
                        .setScale(2, RoundingMode.HALF_UP);

                // Subtotal row
                cell = new Cell(1, 4).add(
                        new Paragraph("Subtotal:")
                            .setFont(font)
                            .setFontSize(12)
                            .simulateBold()
                    ).setTextAlignment(TextAlignment.RIGHT);
                table.addCell(cell);

                cell = new Cell().add(
                        new Paragraph(currency.format(subTotal))
                            .setFont(font)
                            .setFontSize(12)
                    ).setTextAlignment(TextAlignment.RIGHT);
                table.addCell(cell);

                // Tax row
                cell = new Cell(1, 4).add(
                        new Paragraph("Tax (13%):")
                            .setFont(font)
                            .setFontSize(12)
                            .simulateBold()
                    ).setTextAlignment(TextAlignment.RIGHT);
                table.addCell(cell);

                cell = new Cell().add(
                        new Paragraph(currency.format(tax))
                            .setFont(font)
                            .setFontSize(12)
                    ).setTextAlignment(TextAlignment.RIGHT);
                table.addCell(cell);

                // Total row
                cell = new Cell(1, 4).add(
                        new Paragraph("Total:")
                            .setFont(font)
                            .setFontSize(12)
                            .simulateBold()
                    ).setTextAlignment(TextAlignment.RIGHT);
                table.addCell(cell);

                cell = new Cell().add(
                        new Paragraph(currency.format(total))
                            .setFont(font)
                            .setFontSize(12)
                            .simulateBold()
                    )
                    .setTextAlignment(TextAlignment.RIGHT)
                    .setBackgroundColor(ColorConstants.YELLOW);
                table.addCell(cell);
             

            }

            document.add(new Paragraph("\n"));
            document.add(table);
            document.add(new Paragraph("\n"));

            if (!poDate.isEmpty()) {
                document.add(
                    new Paragraph(poDate)
                        .setTextAlignment(TextAlignment.CENTER)
                );
            }

            Image qrCode = new Image(ImageDataFactory.create(QRCodeGenerator.generateQRCode(summary))).scaleAbsolute(128, 128).setHorizontalAlignment(HorizontalAlignment.CENTER);
            document.add(qrCode);

            document.close();

        } catch (Exception ex) {
            Logger.getLogger(PDFGenerator.class.getName()).log(Level.SEVERE, null, ex);
        }

        return new ByteArrayInputStream(baos.toByteArray());
    }
}
