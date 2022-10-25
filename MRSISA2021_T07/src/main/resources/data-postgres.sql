
insert into dermatologist (id, name, surname, email, password, address, city, country, number, role, worksID,authenticated,rating,first_login) values ( nextval('my_user_seq'), 'Mirko', 'Mrkva', 'mrki@gmail.com', '111','Palih studenata 2', 'Novi Sad', 'Serbia', 345125411, 'DERMA', '1', '1',0,true);
insert into pharmacist (id, name, surname, email, password, address, city, country, number, role, worksID,authenticated,rating,first_login) values ( nextval('my_user_seq'), 'Rajko', 'Martic', 'rajko@gmail.com', '222','Radeta Doroslovackog 14', 'Novi Sad', 'Serbia', 1840782, 'PHARMA','1', '1',0,false);
insert into pharmacist (id, name, surname, email, password, address, city, country, number, role, worksID,authenticated,rating,first_login) values ( nextval('my_user_seq'), 'Vlatko', 'Rokvic', 'vlaja@gmail.com', '333','Radeta Doroslovackog 7', 'Novi Sad', 'Serbia', 9403223, 'PHARMA','2', '1',0,false);
insert into dermatologist (id, name, surname, email, password, address, city, country, number, role, worksID,authenticated,rating,first_login) values ( nextval('my_user_seq'), 'Coa', 'Jovanovic', 'imen@gmail.com', '444','Trello table 3', 'Novi Sad', 'Serbia', 2320040, 'DERMA','2', '1',0,false);

insert into patient (id,name,surname,email,password, address,city,country,number,role,authenticated) values (nextval('my_user_seq'),'Dušan','Hajduk','nesto@gmail.com','sifra','Ante Protica 21','Smederevo','Srbija',063416841,'PATIENT', '1');
insert into patient (id,name,surname,email,password, address,city,country,number,role,authenticated) values (nextval('my_user_seq'),'Zoran','Krunic','jovanovic99aleksandar@gmail.com','1212','Lazara Stricevica 43','Novi Sad','Serbia',84921381,'PATIENT', '1');
insert into pharmacy(id, name, address,rating,description) values(nextval('my_pharmacy_seq'), 'Poslednji Lek', 'Bulevar Oslobodjenja 8',0,'Najbolja apoteka');
insert into pharmacy(id, name, address,rating,description) values(nextval('my_pharmacy_seq'), 'Lili Drogerie', 'Peme Zivanca 12',0,'Najbolja u ovom kraju');
insert into pharmacy(id, name, address,rating,description) values(nextval('my_pharmacy_seq'), 'Benu Medic', 'Coe Joa 314',0,'Zale se ljudi mnogo');
insert into pharmacy(id, name, address,rating,description) values(nextval('my_pharmacy_seq'), 'Prvi Maj', 'Urosa Blagojevica 44',0,'Nije losa');
insert into pharmacy(id, name, address,rating,description) values(nextval('my_pharmacy_seq'), 'Peti Maj', 'Nikole Federa 187',0,'Odlicna apoteka');

insert into employment(id, start_hours, end_hours, employee_id, pharmacy_id) values(nextval('my_employment_seq'), 0, 22, 2, 1);
insert into employment(id, start_hours, end_hours, employee_id, pharmacy_id) values(nextval('my_employment_seq'), 0, 22, 3, 1);
insert into employment(id, start_hours, end_hours, employee_id, pharmacy_id) values(nextval('my_employment_seq'), 0, 22, 11, 1);
insert into employment(id, start_hours, end_hours, employee_id, pharmacy_id) values(nextval('my_employment_seq'), 0, 22, 12, 1);
insert into employment(id, start_hours, end_hours, employee_id, pharmacy_id) values(nextval('my_employment_seq'), 0, 22, 14, 2);

insert into employment(id, start_hours, end_hours, employee_id, pharmacy_id) values(nextval('my_employment_seq'), 0, 23, 1, 1);
insert into employment(id, start_hours, end_hours, employee_id, pharmacy_id) values(nextval('my_employment_seq'), 0, 22, 4, 1);
insert into employment(id, start_hours, end_hours, employee_id, pharmacy_id) values(nextval('my_employment_seq'), 0, 22, 8, 1);
insert into employment(id, start_hours, end_hours, employee_id, pharmacy_id) values(nextval('my_employment_seq'), 0, 22, 9, 3);
insert into employment(id, start_hours, end_hours, employee_id, pharmacy_id) values(nextval('my_employment_seq'), 0, 22, 10, 4);
insert into appointment(id, patient_id, price, start_time, end_time, pharmacy_id, doctor_id, report, appeared) values(nextval('my_appointment_seq'), 5, 1000, '2021-06-28 18:30:00', '2021-06-28 19:30:00', 1, 1, '', null);
insert into appointment(id, patient_id, price, start_time, end_time, pharmacy_id, doctor_id, report, appeared) values(nextval('my_appointment_seq'), 5, 1000, '2021-06-28 12:00:00', '2021-06-28 13:30:00', 1, 1, '', null);
insert into appointment(id, patient_id, price, start_time, end_time, pharmacy_id, doctor_id, report, appeared) values(nextval('my_appointment_seq'), null, 500, '2021-06-16 01:00:00', '2021-06-16 02:30:00', 1, 1, '', null);
insert into appointment(id, patient_id, price, start_time, end_time, pharmacy_id, doctor_id, report, appeared) values(nextval('my_appointment_seq'), 6, 500, '2021-06-12 07:00:00', '2021-06-12 07:30:00', 1, 1, '', null);
insert into appointment(id, patient_id, price, start_time, end_time, pharmacy_id, doctor_id, report, appeared) values(nextval('my_appointment_seq'), 5, 1000, '2021-06-10 12:00:00', '2021-06-10 13:30:00', 1, 1, 'Mogao bi malo manje da igra tenkove', true);
insert into absence(id, doctor_id, approved, start_date, end_date, description) values(nextval('my_absence_seq'), 1, false, '2021-06-4', '2021-06-7', 'Dosta mi je pregledanja hajduka');
insert into absence(id, doctor_id, approved, start_date, end_date, description) values(nextval('my_absence_seq'), 1, true, '2021-06-22', '2021-06-25', 'Dosta mi je pregledanja hajduka');
insert into admin(id, address, city, country, email, name, number, password, role, surname, admin_type, works, first_login) values (nextval('my_user_seq'), 'KS', 'Novi Sad', 'Serbia', 'mv@gmail.com', 'Marko', '0694324', '123', 'ADMIN', 'V', 'PHARMA', 1, true);

insert into dermatologist (id, name, surname, email, password, address, city, country, number, role, worksID,authenticated,rating,first_login) values ( nextval('my_user_seq'), 'Uros', 'Blagojevic', 'uki@gmail.com', '111','Palih studenata 2', 'Novi Sad', 'Serbia', 345125411, 'DERMA', '1', '1',0,false);
insert into dermatologist (id, name, surname, email, password, address, city, country, number, role, worksID,authenticated,rating,first_login) values ( nextval('my_user_seq'), 'Nikola', 'Feder', 'maki@gmail.com', '111','Palih studenata 2', 'Novi Sad', 'Serbia', 345125411, 'DERMA', '1', '1',0,false);
insert into dermatologist (id, name, surname, email, password, address, city, country, number, role, worksID,authenticated,rating,first_login) values ( nextval('my_user_seq'), 'Aleksa', 'Markovic', 'aki@gmail.com', '111','Palih studenata 2', 'Novi Sad', 'Serbia', 345125411, 'DERMA', '1', '1',0,false);
insert into pharmacist (id, name, surname, email, password, address, city, country, number, role, worksID,authenticated,rating,first_login) values ( nextval('my_user_seq'), 'Fica', 'Zivanac', 'ficaZivanac@gmail.com', '222','Radeta Doroslovackog 14', 'Novi Sad', 'Serbia', 1840782, 'PHARMA','3', '1',0,false);
insert into pharmacist (id, name, surname, email, password, address, city, country, number, role, worksID,authenticated,rating,first_login) values ( nextval('my_user_seq'), 'Nikola', 'Feder', 'federKeri@gmail.com', '222','Radeta Doroslovackog 14', 'Novi Sad', 'Serbia', 1840782, 'PHARMA','4', '1',0,false);
insert into appointment(id, patient_id, price, start_time, end_time, pharmacy_id, doctor_id,appeared) values(nextval('my_appointment_seq'), 5, 500, '2021-04-13 01:00:00', '2021-02-13 02:30:00', 1, 1,true);
insert into appointment(id, patient_id, price, start_time, end_time, pharmacy_id, doctor_id,appeared) values(nextval('my_appointment_seq'), 5, 500, '2021-06-13 01:00:00', '2021-06-13 02:30:00', 1, 1,true);
insert into appointment(id, patient_id, price, start_time, end_time, pharmacy_id, doctor_id,appeared) values(nextval('my_appointment_seq'), 5, 500, '2021-06-10 01:00:00', '2021-06-10 02:30:00', 1, 1,true);
insert into appointment(id, patient_id, price, start_time, end_time, pharmacy_id, doctor_id,appeared) values(nextval('my_appointment_seq'), 5, 500, '2021-04-13 01:00:00', '2020-03-13 02:30:00', 1, 1,true);
insert into appointment(id, patient_id, price, start_time, end_time, pharmacy_id, doctor_id,appeared) values(nextval('my_appointment_seq'), 5, 500, '2021-04-13 01:00:00', '2020-03-13 02:30:00', 1, 1,true);
insert into appointment(id, patient_id, price, start_time, end_time, pharmacy_id, doctor_id,appeared) values(nextval('my_appointment_seq'), 5, 500, '2021-04-13 01:00:00', '2020-03-13 02:30:00', 1, 1,true);
insert into appointment(id, patient_id, price, start_time, end_time, pharmacy_id, doctor_id,appeared) values(nextval('my_appointment_seq'), 5, 500, '2021-04-13 01:00:00', '2019-03-13 02:30:00', 1, 1,true);
insert into drug(id, contradiction,drug_code,ingredients,instruction,name,shape,taking_dose, types,points,rating) values(nextval('drug_seq'), 'mucnina', 'l123', 'ibuprofena','3 puta na dan','Brufen','Tableta','max:1800mg','Analgetik',100,0);
insert into drug(id, contradiction,drug_code,ingredients,instruction,name,shape,taking_dose, types,points,rating) values(nextval('drug_seq'), 'glavobolja', 'h555', 'moksifloksacin','1 dnevno','Elfonis','Tableta','max:400mg','Antibiotik',250,0);
insert into drug(id, contradiction,drug_code,ingredients,instruction,name,shape,taking_dose, types,points,rating) values(nextval('drug_seq'), 'virus', 'cov32', 'microchip','kad zatreba 3000din','Pfiser','Igla','100ml','Vakcina',7500,0);
insert into drug(id, contradiction,drug_code,ingredients,instruction,name,shape,taking_dose, types,points,rating) values(nextval('drug_seq'), 'virus', 'cov90', 'microchip','kad zatreba 3000din','Astra','Igla','100ml','Vakcina',15000,0);
insert into drug(id, contradiction,drug_code,ingredients,instruction,name,shape,taking_dose, types,points,rating) values(nextval('drug_seq'), 'virus', 'cov94', 'vodka','kad zatreba 3000din','Sputnik V','Igla','100ml','Vakcina',3000,0);
insert into drug(id, contradiction,drug_code,ingredients,instruction,name,shape,taking_dose, types,points,rating) values(nextval('drug_seq'), 'virus', 'cov98', 'pirinac','kad zatreba 3000din','Sino Vac','Igla','100ml','Vakcina',1500,0);
insert into drug(id, contradiction,drug_code,ingredients,instruction,name,shape,taking_dose, types,points,rating) values(nextval('drug_seq'), 'virus', 'cov99', 'microchip','kad zatreba 3000din','J&J','Igla','100ml','Vakcina',500,0);
insert into drug(id, contradiction,drug_code,ingredients,instruction,name,shape,taking_dose, types,points,rating) values(nextval('drug_seq'), 'virus', 'cov97', 'microchip','kad zatreba 3000din','Moderna','Igla','100ml','Vakcina',50,0);
insert into drug(id, contradiction,drug_code,ingredients,instruction,name,shape,taking_dose, types,points,rating) values(nextval('drug_seq'), 'virus', 'rs323', 'sljiva','jedna casica ujutru','Jutarnja rakija 1l','Casica','50ml','Napitak',75,0);
insert into drug(id, contradiction,drug_code,ingredients,instruction,name,shape,taking_dose, types,points,rating) values(nextval('drug_seq'), 'cough', 'ci38', 'secer','3 puta dnevno','Prospan','Flasica','500ml','Napitak',100,0);
insert into drug(id, contradiction,drug_code,ingredients,instruction,name,shape,taking_dose, types,points,rating) values(nextval('drug_seq'), 'cough', 'ci39', 'menta','4 puta dnevno','Mentol bombone','Kesica','150g','Bobmbona',5,0);

insert into reservation(id, date_reserved, issued, pharmacy_id, total_price)values(nextval('my_reservation_seq'), '2021-05-10 13:30:00', false, 1, 1350);
insert into drug_reservation(id, reservation_id, drug_id, amount, price)values(nextval('my_drug_reservation_seq'), 1, 1, 1, 450);
insert into drug_reservation(id, reservation_id, drug_id, amount, price)values(nextval('my_drug_reservation_seq'), 1, 2, 2, 450);

insert into drug_replacements(drug_id, replacements_id) values(4, 5);
insert into drug_replacements(drug_id, replacements_id) values(5, 4);
insert into drug_replacements(drug_id, replacements_id) values(3, 6);
insert into drug_replacements(drug_id, replacements_id) values(6, 3);
insert into drug_replacements(drug_id, replacements_id) values(3, 4);
insert into drug_replacements(drug_id, replacements_id) values(3, 5);
insert into patient_allergies(patient_id, allergies_id) values(6, 3);
insert into patient_allergies(patient_id, allergies_id) values(6, 6);

insert into admin(id, address, city, country, email, name, number, password, role, surname, admin_type, works,authenticated, first_login) values (nextval('my_user_seq'), 'KS', 'Novi Sad', 'Serbia', 'm@gmail.com', 'Marko', '0694324', '123', 'ADMIN', 'V', 'SYSTEM', 0, '1', true);
insert into pharmacist (id, name, surname, email, password, address, city, country, number, role, worksID,authenticated,rating) values ( nextval('my_user_seq'), 'Dusan', 'Hajducina', 'hajduk@gmail.com', '222','Radeta Doroslovackog 14', 'Novi Sad', 'Serbia', 1840782, 'PHARMA','3', '1',0);
insert into supplier (id, name, surname, email, password, address, city, country, number, role, worksID,authenticated, first_login) values ( nextval('my_user_seq'), 'Ali', 'Baba', 'ali@gmail.com', '111','Palih studenata 276', 'Novi Sad', 'Serbia', 345125411, 'SUPPLY', '1', '1', true);

insert into drug_pharmacy(id, amount, end_price, price,start_price,drug_id, pharmacy_id) values(nextval('drug_pharma_seq'), 100,'2021-05-10',450,'2021-05-05',1,1);
insert into drug_pharmacy(id, amount, end_price, price,start_price,drug_id, pharmacy_id) values(nextval('drug_pharma_seq'), 100,'2021-05-10',250,'2021-05-05',1,2);
insert into drug_pharmacy(id, amount, end_price, price,start_price,drug_id, pharmacy_id) values(nextval('drug_pharma_seq'), 120,'2021-05-10',150,'2021-05-05',1,3);
insert into drug_pharmacy(id, amount, end_price, price,start_price,drug_id, pharmacy_id) values(nextval('drug_pharma_seq'), 300,'2021-05-10',350,'2021-05-05',2,4);
insert into drug_pharmacy(id, amount, end_price, price,start_price,drug_id, pharmacy_id) values(nextval('drug_pharma_seq'), 200,'2021-05-10',650,'2021-05-05',2,2);
insert into drug_pharmacy(id, amount, end_price, price,start_price,drug_id, pharmacy_id) values(nextval('drug_pharma_seq'), 160,'2021-05-10',4250,'2021-05-05',2,5);
insert into drug_pharmacy(id, amount, end_price, price,start_price,drug_id, pharmacy_id) values(nextval('drug_pharma_seq'), 160,'2021-05-10',150,'2021-05-05',2,1);
insert into drug_pharmacy(id, amount, end_price, price,start_price,drug_id, pharmacy_id) values(nextval('drug_pharma_seq'), 160,'2021-05-10',50,'2021-05-05',3,1);

insert into purchase_order(id, approved, end_time,status,admin_id,pharma_id) values(nextval('my_purchase_order_seq'),  false,'2021-08-28 18:30:00', 'Open', 7,1);
insert into purchase_order(id, approved, end_time,status,admin_id,pharma_id) values(nextval('my_purchase_order_seq'),  false,'2021-08-28 18:30:00', 'Closed', 7,1);
insert into purchase_order(id, approved, end_time,status,admin_id,pharma_id) values(nextval('my_purchase_order_seq'),  false,'2021-04-28 18:30:00', 'Closed', 13,2);
insert into purchase_order(id, approved, end_time,status,admin_id,pharma_id) values(nextval('my_purchase_order_seq'),  false,'2021-07-23 18:30:00', 'Open', 13,1);
insert into purchase_order(id, approved, end_time,status,admin_id,pharma_id) values(nextval('my_purchase_order_seq'),  false,'2021-05-28 20:30:00', 'Open', 7,1);
insert into purchase_order(id, approved, end_time,status,admin_id,pharma_id) values(nextval('my_purchase_order_seq'),  false,'2020-10-28 20:30:00', 'Open', 13,3);

insert into purchase_order_drug(id, amount, drug_id,drug_name,purchase_order_id) values(nextval('my_purchase_order_drug_seq'), 2, 1, 'Brufen', 1);
insert into purchase_order_drug(id, amount, drug_id,drug_name,purchase_order_id) values(nextval('my_purchase_order_drug_seq'), 1, 2, 'Elfonis', 1);
insert into purchase_order_drug(id, amount, drug_id,drug_name,purchase_order_id) values(nextval('my_purchase_order_drug_seq'), 3, 2, 'Elfonis', 3);

insert into purchase_order_drug(id, amount, drug_id,drug_name,purchase_order_id) values(nextval('my_purchase_order_drug_seq'), 10, 1, 'Brufen', 5);
insert into purchase_order_drug(id, amount, drug_id,drug_name,purchase_order_id) values(nextval('my_purchase_order_drug_seq'), 20, 2, 'Elfonis', 5);

insert into purchase_order_drug(id, amount, drug_id,drug_name,purchase_order_id) values(nextval('my_purchase_order_drug_seq'), 1, 1, 'Brufen', 4);
insert into purchase_order_drug(id, amount, drug_id,drug_name,purchase_order_id) values(nextval('my_purchase_order_drug_seq'), 1, 2, 'Elfonis', 4);


insert into supplier_purchase_order(id, delivery_time, email, order_id ,price,approved) values(nextval('my_supplier_purchase_order_seq'), '2021-07-30 18:30:00', 'ali@gmail.com', 1, 2200,false);
insert into supplier_purchase_order(id, delivery_time, email, order_id ,price,approved) values(nextval('my_supplier_purchase_order_seq'), '2021-07-30 18:30:00', 'ebay@gmail.com', 1, 3000,false);

insert into supplier_purchase_order(id, delivery_time, email, order_id ,price,approved) values(nextval('my_supplier_purchase_order_seq'), '2021-07-30 18:30:00', 'ali@gmail.com', 5, 4000,false);
insert into supplier_purchase_order(id, delivery_time, email, order_id ,price,approved) values(nextval('my_supplier_purchase_order_seq'), '2021-07-30 18:30:00', 'ebay@gmail.com', 5, 5500,false);


insert into supplier (id, name, surname, email, password, address, city, country, number, role, worksID,authenticated) values ( nextval('my_user_seq'), 'E', 'Bay', 'ebay@gmail.com', '111','Palih studenata 3800', 'Novi Sad', 'Serbia', 31254411, 'SUPPLY', '1', '1');
insert into subscribe (id, patient_id, pharmacy_id) values(nextval('subscribe_seq'), 5, 2);
insert into subscribe (id, patient_id, pharmacy_id) values(nextval('subscribe_seq'), 6, 1);
insert into supplier_purchase_order(id, delivery_time, email, order_id ,price,approved) values(nextval('my_supplier_purchase_order_seq'), '2021-07-30 18:30:00', 'ebay@gmail.com', 4, 3200,false);

insert into appointment(id, patient_id, price, start_time, end_time, pharmacy_id, doctor_id, appeared) values(nextval('my_appointment_seq'), 5, 800, '2021-06-15 02:00:00', '2021-06-15 02:30:00', 2, 4,null);
insert into appointment(id, patient_id, price, start_time, end_time, pharmacy_id, doctor_id, appeared) values(nextval('my_appointment_seq'), 5, 800, '2021-06-13 02:00:00', '2021-06-13 02:30:00', 1, 8,null);
insert into appointment(id, patient_id, price, start_time, end_time, pharmacy_id, doctor_id, appeared) values(nextval('my_appointment_seq'), 5, 1000, '2021-05-13 03:00:00', '2021-05-13 02:30:00', 1, 9,null);
insert into appointment(id, patient_id, price, start_time, end_time, pharmacy_id, doctor_id, appeared) values(nextval('my_appointment_seq'), 5, 800, '2021-05-25 13:00:00', '2021-05-25 17:30:00', 2, 4,false);
insert into appointment(id, patient_id, price, start_time, end_time, pharmacy_id, doctor_id, appeared) values(nextval('my_appointment_seq'), null, 1200, '2021-06-29 02:00:00', '2021-06-15 02:30:00', 2, 4,null);
insert into appointment(id, patient_id, price, start_time, end_time, pharmacy_id, doctor_id, appeared) values(nextval('my_appointment_seq'), null, 300, '2021-06-29 02:00:00', '2021-06-13 02:30:00', 1, 8,null);
insert into appointment(id, patient_id, price, start_time, end_time, pharmacy_id, doctor_id, appeared) values(nextval('my_appointment_seq'), null, 4000, '2021-06-30 03:00:00', '2021-06-13 02:30:00', 1, 9,null);
insert into appointment(id, patient_id, price, start_time, end_time, pharmacy_id, doctor_id, appeared) values(nextval('my_appointment_seq'), null, 500, '2021-06-30 13:00:00', '2021-06-25 17:30:00', 2, 4,false);

insert into appointment(id, patient_id, price, start_time, end_time, pharmacy_id, doctor_id, appeared) values(nextval('my_appointment_seq'), null, 1200, '2021-06-29 02:00:00', '2021-06-15 02:30:00', 1, 4,true);
insert into appointment(id, patient_id, price, start_time, end_time, pharmacy_id, doctor_id, appeared) values(nextval('my_appointment_seq'), null, 300, '2021-06-29 02:00:00', '2021-06-13 02:30:00', 1, 8,true);
insert into appointment(id, patient_id, price, start_time, end_time, pharmacy_id, doctor_id, appeared) values(nextval('my_appointment_seq'), null, 4000, '2021-06-30 03:00:00', '2021-06-13 02:30:00', 1, 9,true);
insert into appointment(id, patient_id, price, start_time, end_time, pharmacy_id, doctor_id, appeared) values(nextval('my_appointment_seq'), null, 500, '2021-06-30 13:00:00', '2021-06-25 17:30:00', 1, 4,true);

insert into drug_order_patient(id,price,quantity,reciving_date,start_date,drug_id,patient_id,pharmacy_id, recived, canceled) values(nextval('my_drug_oreder_seq'),300,1,'2021-05-26 13:00:00','2021-05-23 13:00:00',1,5,1, true, false);
insert into drug_order_patient(id,price,quantity,reciving_date,start_date,drug_id,patient_id,pharmacy_id, recived, canceled) values(nextval('my_drug_oreder_seq'),800,3,'2021-05-10 13:00:00','2021-05-24 13:00:00',1,5,2,true, false);
insert into drug_order_patient(id,price,quantity,reciving_date,start_date,drug_id,patient_id,pharmacy_id, recived, canceled) values(nextval('my_drug_oreder_seq'),1300,5,'2021-05-28 13:00:00','2021-05-26 13:00:00',2,5,2,true, false);
insert into drug_order_patient(id,price,quantity,reciving_date,start_date,drug_id,patient_id,pharmacy_id, recived, canceled) values(nextval('my_drug_oreder_seq'),1100,4,'2021-05-15 13:00:00','2021-05-12 13:00:00',2,5,3,true, false);
insert into drug_order_patient(id,price,quantity,reciving_date,start_date,drug_id,patient_id,pharmacy_id, recived, canceled) values(nextval('my_drug_oreder_seq'),1000,4,'2021-05-17 13:00:00','2021-05-05 13:00:00',1,5,1,true, false);
insert into drug_order_patient(id,price,quantity,reciving_date,start_date,drug_id,patient_id,pharmacy_id, recived, canceled) values(nextval('my_drug_oreder_seq'),600,2,'2021-06-30 13:00:00','2021-05-23 13:00:00',2,5,3,true, false);
insert into drug_order_patient(id,price,quantity,reciving_date,start_date,drug_id,patient_id,pharmacy_id, recived, canceled) values(nextval('my_drug_oreder_seq'),600,2,'2021-06-25 14:00:00','2021-05-23 13:00:00',4,5,3,true, false);
insert into drug_order_patient(id,price,quantity,reciving_date,start_date,drug_id,patient_id,pharmacy_id, recived, canceled) values(nextval('my_drug_oreder_seq'),600,2,'2021-06-25 14:00:00','2021-05-23 13:00:00',6,5,3,true, false);

insert into drug_appointment(id, quantity,taking_period,appointment_id,drug_id) values(nextval('my_drug_appointment_seq'), 2,1,2,1);
insert into drug_appointment(id, quantity,taking_period,appointment_id,drug_id) values(nextval('my_drug_appointment_seq'), 3,1,2,2);
insert into drug_appointment(id, quantity,taking_period,appointment_id,drug_id) values(nextval('my_drug_appointment_seq'), 4,1,2,3);
insert into drug_appointment(id, quantity,taking_period,appointment_id,drug_id) values(nextval('my_drug_appointment_seq'), 11,1,3,3);
insert into drug_appointment(id, quantity,taking_period,appointment_id,drug_id) values(nextval('my_drug_appointment_seq'), 11,1,4,3);
insert into patient (id,name,surname,email,password, address,city,country,number,role,authenticated) values (nextval('my_user_seq'),'Marko','Vukotic','vukota99@gmail.com','123','Dule Savic 43','Novi Sad','Serbia',641442583,'PATIENT', '1');
insert into patient (id,name,surname,email,password, address,city,country,number,role,authenticated) values (nextval('my_user_seq'),'Zoran','Ovcin','ovcin99@gmail.com','123','Ovcina 43','Novi Sad','Serbia',63416841,'PATIENT', '1');
insert into patient (id,name,surname,email,password, address,city,country,number,role,authenticated) values (nextval('my_user_seq'),'Mile','Djukic','mile99@gmail.com','123','Mileta 43','Novi Sad','Serbia',69558841,'PATIENT', '1');
insert into patient (id,name,surname,email,password, address,city,country,number,role,authenticated) values (nextval('my_user_seq'),'Darko','Tica','kralj99@gmail.com','123','Daki Kralj 43','Novi Sad','Serbia',688899158,'PATIENT', '1');

insert into rating_drug(id,rating,rating_date,drug_id,patient_id) values (nextval('my_drug_rating_seq'),4,'2021-06-25',1,5);
insert into rating_drug(id,rating,rating_date,drug_id,patient_id) values (nextval('my_drug_rating_seq'),4,'2021-06-25',3,5);
insert into rating_drug(id,rating,rating_date,drug_id,patient_id) values (nextval('my_drug_rating_seq'),4,'2021-06-25',4,5);
insert into rating_drug(id,rating,rating_date,drug_id,patient_id) values (nextval('my_drug_rating_seq'),4,'2021-06-25',5,5);
insert into rating_drug(id,rating,rating_date,drug_id,patient_id) values (nextval('my_drug_rating_seq'),5,'2021-06-25',1,17);
insert into rating_drug(id,rating,rating_date,drug_id,patient_id) values (nextval('my_drug_rating_seq'),2,'2021-06-25',1,18);
insert into rating_drug(id,rating,rating_date,drug_id,patient_id) values (nextval('my_drug_rating_seq'),1,'2021-06-25',1,19);
insert into rating_drug(id,rating,rating_date,drug_id,patient_id) values (nextval('my_drug_rating_seq'),5,'2021-06-25',1,20);

insert into rating_drug(id,rating,rating_date,drug_id,patient_id) values (nextval('my_drug_rating_seq'),5,'2021-06-25',2,5);
insert into rating_drug(id,rating,rating_date,drug_id,patient_id) values (nextval('my_drug_rating_seq'),4,'2021-06-25',2,19);
insert into rating_drug(id,rating,rating_date,drug_id,patient_id) values (nextval('my_drug_rating_seq'),2,'2021-06-25',2,20);

insert into rating_pharmacy(id,rating,rating_date,pharmacy_id,patient_id) values (nextval('my_pharmacy_rating_seq'),5,'2021-06-25',1,5);
insert into rating_pharmacy(id,rating,rating_date,pharmacy_id,patient_id) values (nextval('my_pharmacy_rating_seq'),5,'2021-06-25',1,6);
insert into rating_pharmacy(id,rating,rating_date,pharmacy_id,patient_id) values (nextval('my_pharmacy_rating_seq'),4,'2021-06-25',1,18);
insert into rating_pharmacy(id,rating,rating_date,pharmacy_id,patient_id) values (nextval('my_pharmacy_rating_seq'),4,'2021-06-25',1,19);
insert into rating_pharmacy(id,rating,rating_date,pharmacy_id,patient_id) values (nextval('my_pharmacy_rating_seq'),5,'2021-06-25',1,20);

insert into rating_pharmacist(id,rating,rating_date,pharmacist_id,patient_id) values (nextval('my_pharmacist_rating_seq'),5,'2021-06-25',2,5);
insert into rating_pharmacist(id,rating,rating_date,pharmacist_id,patient_id) values (nextval('my_pharmacist_rating_seq'),4,'2021-06-25',2,6);
insert into rating_pharmacist(id,rating,rating_date,pharmacist_id,patient_id) values (nextval('my_pharmacist_rating_seq'),3,'2021-06-25',2,18);
insert into rating_pharmacist(id,rating,rating_date,pharmacist_id,patient_id) values (nextval('my_pharmacist_rating_seq'),2,'2021-06-25',2,20);

insert into rating_dermatologist(id,rating,rating_date,dermatologist_id,patient_id) values (nextval('my_dermatologist_rating_seq'),5,'2021-06-25',1,5);
insert into rating_dermatologist(id,rating,rating_date,dermatologist_id,patient_id) values (nextval('my_dermatologist_rating_seq'),4,'2021-06-25',1,6);
insert into rating_dermatologist(id,rating,rating_date,dermatologist_id,patient_id) values (nextval('my_dermatologist_rating_seq'),3,'2021-06-25',1,18);
insert into rating_dermatologist(id,rating,rating_date,dermatologist_id,patient_id) values (nextval('my_dermatologist_rating_seq'),2,'2021-06-25',1,20);

insert into reservation(id, date_reserved, issued, pharmacy_id, total_price)values(nextval('my_reservation_seq'), '2021-06-01 13:30:00', true, 1, 1350);
insert into reservation(id, date_reserved, issued, pharmacy_id, total_price)values(nextval('my_reservation_seq'), '2021-06-01 13:30:00', true, 1, 2350);
insert into reservation(id, date_reserved, issued, pharmacy_id, total_price)values(nextval('my_reservation_seq'), '2021-05-01 13:30:00', true, 1, 1000);
insert into reservation(id, date_reserved, issued, pharmacy_id, total_price)values(nextval('my_reservation_seq'), '2021-04-15 13:30:00', true, 1, 500);
insert into reservation(id, date_reserved, issued, pharmacy_id, total_price)values(nextval('my_reservation_seq'), '2021-06-06 13:30:00', true, 1, 1350);

insert into reservation(id, date_reserved, issued, pharmacy_id, total_price)values(nextval('my_reservation_seq'), '2020-06-01 13:30:00', true, 1, 1350);
insert into reservation(id, date_reserved, issued, pharmacy_id, total_price)values(nextval('my_reservation_seq'), '2020-05-04 13:30:00', true, 1, 1350);
insert into reservation(id, date_reserved, issued, pharmacy_id, total_price)values(nextval('my_reservation_seq'), '2019-12-01 13:30:00', true, 1, 1350);
insert into reservation(id, date_reserved, issued, pharmacy_id, total_price)values(nextval('my_reservation_seq'), '2019-12-04 13:30:00', true, 1, 1350);
insert into reservation(id, date_reserved, issued, pharmacy_id, total_price)values(nextval('my_reservation_seq'), '2019-06-01 13:30:00', true, 1, 1350);
insert into reservation(id, date_reserved, issued, pharmacy_id, total_price)values(nextval('my_reservation_seq'), '2019-05-04 13:30:00', true, 1, 1350);
insert into reservation(id, date_reserved, issued, pharmacy_id, total_price)values(nextval('my_reservation_seq'), '2018-01-01 13:30:00', true, 1, 1350);
insert into reservation(id, date_reserved, issued, pharmacy_id, total_price)values(nextval('my_reservation_seq'), '2018-05-04 13:30:00', true, 1, 1350);
insert into reservation(id, date_reserved, issued, pharmacy_id, total_price)values(nextval('my_reservation_seq'), '2018-06-01 13:30:00', true, 1, 1350);
insert into reservation(id, date_reserved, issued, pharmacy_id, total_price)values(nextval('my_reservation_seq'), '2018-11-04 13:30:00', true, 1, 1350);

insert into loyalty_rule(id, discount, high_points, low_points, rank) values(nextval('loyaltyrule_seq'), 0, 500, 0, 'No rank');
insert into loyalty_rule(id, discount, high_points, low_points, rank) values(nextval('loyaltyrule_seq'), 3, 2500, 500, 'Bronze');
insert into loyalty_rule(id, discount, high_points, low_points, rank) values(nextval('loyaltyrule_seq'), 5, 7500, 2500, 'Silver');
insert into loyalty_rule(id, discount, high_points, low_points, rank) values(nextval('loyaltyrule_seq'), 10, 15000, 7500, 'Gold');

insert into loyalty(id, discount, points, rank, user_id)  values(nextval('loyalty_seq'), 10, 17500, 'Gold', 5);
insert into loyalty(id, discount, points, rank, user_id)  values(nextval('loyalty_seq'), 0, 0, 'No rank', 6);

insert into appointment(id, patient_id, price, start_time, end_time, pharmacy_id, doctor_id, report, appeared) values(nextval('my_appointment_seq'), 5, 1000, '2021-05-21 18:10:00', '2021-05-21 19:10:00', 1, 2, '', true);

insert into appointment(id, patient_id, price, start_time, end_time, pharmacy_id, doctor_id, report, appeared) values(nextval('my_appointment_seq'), 5, 1000, '2021-05-22 18:20:00', '2021-05-22 19:20:00', 1, 3, '', true);
insert into appointment(id, patient_id, price, start_time, end_time, pharmacy_id, doctor_id, report, appeared) values(nextval('my_appointment_seq'), 5, 1000, '2021-05-23 18:30:00', '2021-05-23 19:30:00', 1, 3, '', false);
insert into appointment(id, patient_id, price, start_time, end_time, pharmacy_id, doctor_id, report) values(nextval('my_appointment_seq'), 5, 1000, '2021-05-24 18:40:00', '2021-05-24 19:40:00', 1, 2, '');

insert into complaint(id, complaint, patient_id, user_id) values(nextval('complaint_seq'), 'Lose', 20, 9);
insert into patient (id,name,surname,email,password, address,city,country,number,role,authenticated) values (nextval('my_user_seq'),'Marko','V','vukoticmarko99@gmail.com','1','Lazara Stricevica 43','Novi Sad','Serbia',84921381,'PATIENT', '1');


