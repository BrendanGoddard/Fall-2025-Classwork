package info5153.casestudy.server.po;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface PurchaseOrderRepository extends CrudRepository<PurchaseOrder, Long> {

    List<PurchaseOrder> findByVendorId(long vendorId);
}
