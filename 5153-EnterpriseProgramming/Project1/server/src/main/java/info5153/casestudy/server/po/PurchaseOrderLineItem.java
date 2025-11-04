package info5153.casestudy.server.po;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Id;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseOrderLineItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long ID;
    private long poId;
    private String productId;
    private int quantity;
}