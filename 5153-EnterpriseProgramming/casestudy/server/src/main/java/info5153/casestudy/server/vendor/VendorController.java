package info5153.casestudy.server.vendor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;



@CrossOrigin
@RestController
public class VendorController {
    
    @Autowired
    private VendorRepository vendorRepository;

    @GetMapping("/api/vendors")
    public ResponseEntity<Iterable<Vendor>> findAll() {
        Iterable<Vendor> vendors = vendorRepository.findAll();
        return new ResponseEntity<Iterable<Vendor>>(vendors, HttpStatus.OK);
    }

    @PutMapping("/api/vendors")
    public ResponseEntity<Vendor> updateOne(@RequestBody Vendor vendor) {
        Vendor updatedVendor = vendorRepository.save(vendor);
        return new ResponseEntity<Vendor>(updatedVendor, HttpStatus.OK);
    }
    

}
