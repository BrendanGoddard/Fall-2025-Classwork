INSERT INTO Vendor (Address, City, Province, Postal_Code, Phone, Type, Name, Email)
    VALUES ('123 Maple St', 'London', 'ON', 'N1N-1N1', '(555)555-5551', 'Trusted', 'ABC Supply Co.', 'abc@supply.com');
INSERT INTO Vendor (Address, City, Province, Postal_Code, Phone, Type, Name, Email)
    VALUES ('543 Sycamore Ave', 'Toronto', 'ON', 'N1P-1N2', '(999)555-5552', 'Trusted', 'Big Bills Depot', 'bb@depot.com');
INSERT INTO Vendor (Address, City, Province, Postal_Code, Phone, Type, Name, Email)
    VALUES ('922 Oak St', 'London', 'ON', 'N1N-1N3', '(555)555-5593', 'Untrusted', 'Shady Sams', 'ss@underthetable.com');
INSERT INTO Vendor (Address, City, Province, Postal_Code, Phone, Type, Name, Email)
    VALUES ('123 Streety St.', 'London', 'ON', 'N1N-1N4', '(555)555-55594', 'Trusted', 'Brendan Goddard', 'b_goddard198580@fanshaweonline.ca');

INSERT INTO Product (ID, Vendor_ID, Name, Cost, MSRP, ROP, EOQ, QOH, QOO)
   VALUES ('P-01', 4, 'Graphics Card', 500, 450, 5, 5, 10, 0);
INSERT INTO Product (ID, Vendor_ID, Name, Cost, MSRP, ROP, EOQ, QOH, QOO)
   VALUES ('P-02', 4, 'PC Motherboard', 300, 315, 10, 10, 20, 0);
INSERT INTO Product (ID, Vendor_ID, Name, Cost, MSRP, ROP, EOQ, QOH, QOO)
   VALUES ('P-03', 4, 'PC Case', 200, 200, 15, 15, 30, 0);