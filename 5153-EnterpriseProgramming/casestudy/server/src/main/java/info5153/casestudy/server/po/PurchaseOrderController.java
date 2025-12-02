package info5153.casestudy.server.po;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import info5153.casestudy.server.product.Product;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import info5153.casestudy.server.po.PurchaseOrderRepository;
import info5153.casestudy.server.product.ProductRepository;
import info5153.casestudy.server.vendor.VendorRepository;

import java.io.ByteArrayInputStream;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/po")
public class PurchaseOrderController {

    @Autowired
    private PurchaseOrderDAO poDAO;

    @Autowired
    private PurchaseOrderRepository purchaseOrderRepository;

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public ResponseEntity<List<PurchaseOrder>> findAll() {
        List<PurchaseOrder> orders = poDAO.findAll();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/vendor/{vendorId}")
public ResponseEntity<List<PurchaseOrder>> findByVendor(@PathVariable long vendorId) {
    List<PurchaseOrder> orders = poDAO.findByVendorId(vendorId);
    return new ResponseEntity<>(orders, HttpStatus.OK);
}



    @GetMapping("/{id}")
    public ResponseEntity<PurchaseOrder> findById(@PathVariable long id) {
        PurchaseOrder po = poDAO.findById(id);
        if (po == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(po, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<PurchaseOrder> create(@RequestBody PurchaseOrder po) {
        PurchaseOrder saved = poDAO.create(po);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<PurchaseOrder> update(@RequestBody PurchaseOrder po) {
        PurchaseOrder updated = poDAO.update(po);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id) {
        poDAO.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{id}/items")
public ResponseEntity<List<PurchaseOrderLineItem>> getItems(@PathVariable long id) {
    List<PurchaseOrderLineItem> items = poDAO.findItemsByPoId(id);
    return new ResponseEntity<>(items, HttpStatus.OK);
}

@GetMapping(value = "/api/po/pdf/{id}", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<InputStreamResource> reportPDF(@PathVariable Long id) {

        ByteArrayInputStream bis = PDFGenerator.generatePurchaseOrder(id.toString(), vendorRepository,
                productRepository, purchaseOrderRepository);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=report_" + id.toString() + ".pdf");

        return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
    }

}
