package info5153.casestudy.server.vendor;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "vendors", path = "vendors")
public interface VendorRepository extends CrudRepository<Vendor, Long> {
    
}
