package info5153.casestudy.server.product;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    // ---------- GET ALL ----------
    @GetMapping("/api/products")
    public ResponseEntity<Iterable<Product>> findAll() {
        Iterable<Product> products = productRepository.findAll();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // ---------- GET BY VENDOR ----------
    @GetMapping("/api/products/vendor/{vendorId}")
    public ResponseEntity<List<Product>> getByVendorId(@PathVariable long vendorId) {
        List<Product> products = productRepository.findByVendorId(vendorId);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // ---------- CREATE ----------
    @PostMapping("/api/products")
    public ResponseEntity<Product> createOne(@RequestBody Product product) {
        Product newProduct = productRepository.save(product);
        return new ResponseEntity<>(newProduct, HttpStatus.OK);
    }

    // ---------- UPDATE ----------
    @PutMapping("/api/products")
    public ResponseEntity<Product> updateOne(@RequestBody Product product) {
        Product updatedProduct = productRepository.save(product);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }

    // ---------- DELETE ----------
    @DeleteMapping("/api/products/{id}")
    public ResponseEntity<Integer> deleteOne(@PathVariable String id) {
        int deletedCount = productRepository.deleteOne(id);
        return new ResponseEntity<>(deletedCount, HttpStatus.OK);
    }
}
