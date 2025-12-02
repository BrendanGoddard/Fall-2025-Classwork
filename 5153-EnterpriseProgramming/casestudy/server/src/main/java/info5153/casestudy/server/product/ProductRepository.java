package info5153.casestudy.server.product;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
public interface ProductRepository extends CrudRepository<Product, String> {

    @Modifying
    @Transactional
    @Query("DELETE FROM Product p WHERE p.id = ?1")
    int deleteOne(String id);   // FIXED: uses lowercase field name

    // ⭐ Required by Angular
    List<Product> findByVendorId(long vendorId);
}
