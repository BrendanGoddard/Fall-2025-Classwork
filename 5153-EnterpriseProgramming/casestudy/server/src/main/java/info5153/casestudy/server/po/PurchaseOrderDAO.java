package info5153.casestudy.server.po;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public class PurchaseOrderDAO {

    @PersistenceContext
    private EntityManager entityManager;

    /**
     * Retrieve all purchase orders.
     */
    public List<PurchaseOrder> findAll() {
        String jpql = "SELECT p FROM PurchaseOrder p";
        return entityManager.createQuery(jpql, PurchaseOrder.class).getResultList();
    }

    /**
     * Find a single purchase order by ID.
     */
    public PurchaseOrder findById(long id) {
        return entityManager.find(PurchaseOrder.class, id);
    }

    /**
     * Create a new purchase order with line items.
     */
    @Transactional
    public PurchaseOrder create(PurchaseOrder po) {
        // Handle empty or null date field
        if (po.getDate() == null) {
            po.setDate(LocalDateTime.now());
        }

        // Detach line items before persisting parent
        List<PurchaseOrderLineItem> items = po.getItems();
        po.setItems(null);

        // Persist the parent order
        entityManager.persist(po);
        entityManager.flush(); // ensures ID is generated

        // Now persist each line item and assign the generated poId
        if (items != null && !items.isEmpty()) {
            for (PurchaseOrderLineItem item : items) {
                item.setPoId(po.getID());
                entityManager.persist(item);
            }
        }

        // Reattach items to the entity (for response clarity)
        po.setItems(items);

        return po;
    }

    /**
     * Update an existing purchase order and its line items.
     */
    @Transactional
    public PurchaseOrder update(PurchaseOrder po) {
        // Ensure date is valid
        if (po.getDate() == null) {
            po.setDate(LocalDateTime.now());
        }

        // Delete old line items
        entityManager.createQuery("DELETE FROM PurchaseOrderLineItem WHERE poId = :id")
                .setParameter("id", po.getID())
                .executeUpdate();

        // Merge the updated purchase order
        PurchaseOrder updated = entityManager.merge(po);
        entityManager.flush();

        // Re-insert new line items
        if (po.getItems() != null && !po.getItems().isEmpty()) {
            for (PurchaseOrderLineItem item : po.getItems()) {
                item.setPoId(updated.getID());
                entityManager.persist(item);
            }
        }

        return updated;
    }

    /**
     * Delete a purchase order and its associated line items.
     */
    @Transactional
    public int delete(long id) {
        // Delete line items first
        entityManager.createQuery("DELETE FROM PurchaseOrderLineItem WHERE poId = :id")
                .setParameter("id", id)
                .executeUpdate();

        // Delete parent purchase order
        int deleted = entityManager.createQuery("DELETE FROM PurchaseOrder WHERE ID = :id")
                .setParameter("id", id)
                .executeUpdate();

        return deleted;
    }
}
