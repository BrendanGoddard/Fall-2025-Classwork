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

    @GetMapping("/api/products")
    public ResponseEntity<Iterable<Product>> findAll() {
        Iterable<Product> products = productRepository.findAll();
        return new ResponseEntity<Iterable<Product>>(products, HttpStatus.OK);
    }

    @PutMapping("/api/products")
    public ResponseEntity<Product> updateOne(@RequestBody Product product) {
        Product updatedproduct = productRepository.save(product);
        return new ResponseEntity<Product>(updatedproduct, HttpStatus.OK);
    }
    
    @DeleteMapping("/api/products/{id}")
    public ResponseEntity<Integer> deleteOne(@PathVariable String id) {
        int deletedCount = productRepository.deleteOne(id);
        return new ResponseEntity<Integer>(deletedCount, HttpStatus.OK);
    }

    @PostMapping("/api/products")
    public ResponseEntity<Product> createOne(@RequestBody Product product) {
        Product newproduct = productRepository.save(product);
        return new ResponseEntity<Product>(newproduct, HttpStatus.OK);
    }

}

