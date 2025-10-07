INSERT INTO Employee (Title, First_Name, Last_Name, Phone, Email)
   VALUES ('Mr.','Bigshot','Smartypants','(555)555-5551','bs@abc.com');
INSERT INTO Employee (Title, First_Name, Last_Name, Phone, Email)
   VALUES ('Mrs.','Penny','Pincher','(555)555-5552','pp@abc.com');
INSERT INTO Employee (Title, First_Name, Last_Name, Phone, Email)
   VALUES ('Mr.','Smoke','Andmirrors','(555)555-5553','sa@abc.com');
INSERT INTO Employee (Title, First_Name, Last_Name, Phone, Email)
   VALUES ('Mr.','Sam','Slick','(555)555-5554','ng@abc.com');
INSERT INTO Employee (Title, First_Name, Last_Name, Phone, Email)
   VALUES ('Mr.','Sloppy','Joe','(555)555-5555','sj@abc.com');
INSERT INTO Employee (Title, First_Name, Last_Name, Phone, Email)
   VALUES ('','Brendan','Goddard','(555)555-5556','b_goddard198580@fanshaweonline.ca');

INSERT INTO Expense_Category (ID, Description) VALUES ('BSM', 'Business Meetings');
INSERT INTO Expense_Category (ID, Description) VALUES ('ENT', 'Entertainment');
INSERT INTO Expense_Category (ID, Description) VALUES ('PARK', 'Parking');
INSERT INTO Expense_Category (ID, Description) VALUES ('LDG', 'Lodging');
INSERT INTO Expense_Category (ID, Description) VALUES ('TRAV', 'Travel');
INSERT INTO Expense_Category (ID, Description) VALUES ('MEAL', 'Meals');
INSERT INTO Expense_Category (ID, Description) VALUES ('TUI', 'Tuition');
INSERT INTO Expense_Category (ID, Description) VALUES ('MISC', 'Miscealleous');
INSERT INTO Expense_Category (ID, Description) VALUES ('OTH', 'OTHER');

INSERT INTO Expense (Employee_ID, Category_ID, Description, Date, Amount)
   VALUES (1, 'PARK', 'Parking for Convention', '2023-04-13', 19.99);
INSERT INTO Expense (Employee_ID, Category_ID, Description, Date,  Amount)
   VALUES (1, 'LDG', 'Hotel for Convention', '2023-04-15', 219.99);
INSERT INTO Expense (Employee_ID, Category_ID, Description, Date,  Amount)
   VALUES (1, 'MEAL', 'Food at Convention', '2023-04-13', 39.99);
INSERT INTO Expense (Employee_ID, Category_ID, Description, Date,  Amount)
   VALUES (2, 'TUI', 'Tuition for Cobol course', '2023-05-19', 29.99);
INSERT INTO Expense (Employee_ID, Category_ID, Description, Date,  Amount)
   VALUES (2, 'MISC', 'Bought widgets for the office', '2023-05-20', 19.99);
INSERT INTO Expense (Employee_ID, Category_ID, Description, Date,  Amount)
   VALUES (6, 'TRAV', 'Bus to Fanshawe', '2025-09-21', 50.00);