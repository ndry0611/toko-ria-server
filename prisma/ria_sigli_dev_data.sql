INSERT INTO categories(name, description)
VALUES('Rem','Kampas Rem, Blok Rem, Sepatu Rem'), ('Transmisi','Kain Klos, Matahari'), ('Perkakas', 'Obeng, Tang, Kunci');

INSERT INTO car_brands(name, manufacture)
VALUES ('Toyota', 'Japan'), ('Honda', 'Japan'), ('Ford', 'America');

INSERT INTO cars(id_car_brand, name, production_year, type)
VALUES (1, 'Avanza Gen 1', '2003-2008', '1.3 G'), (2, 'Jazz', '2004-2008', 'IDSI'), (3, 'Ranger', '2005-2008', '2.5 4x4');

INSERT INTO suppliers(company_name, company_phone, pic_name, pic_phone, bank_account, bank_account_name, address)
VALUES
('Makmur Auto Sejahtera (MAS)', '0823148', 'Kohir', '08421382', '(BCA) 20391230', 'MAS', 'Jl.X no 3'),
('Surya Jaya Teknik (SJT)', '0821393', 'Asiong', '90418239', '(BCA) 2013942', 'Asiong', 'Jl.X no 40');

INSERT INTO spare_part_brands(name, manufacture)VALUES('Aisin', 'Japan'), ('Remco', 'Malaysia'), ('Tekiro', 'Japan');

INSERT INTO spare_parts(id_spare_part_brand, id_category, id_car, id_supplier, name, part_no, genuine, stock, capital_price, sell_method, is_available, sale_price, description, supply_date)
VALUES
(1, 2, 1, 1, 'Kain klos Avanza Gen 1', '19021-bz010', 'asli', 4, 225000, 'pcs', true, 300000, 'Untuk avanza gen 1', now()),
(2, 1, 2, 1, 'Kain rem Jazz IDSI', '19021-RS012', 'asli', 4, 225000, 'pcs', true, 300000, 'Untuk Jazz IDSI', now()),
(3, 3, null, 2, 'Kunci Ring Pas 11-17', 'L-30-12', 'asli', 3, 200000, 'set', true, 220000, 'Kunci Ring Pas Tekiro', now());

INSERT INTO stock_adjustments(id_spare_part, code, description, old_quantity, new_quantity)
VALUES
(1,'A1/03/22','Tambahan', 3,4),
(2,'A1/34/23','Tambahan', 3,4),
(3,'A3/03/40','Tambahan', 2,3);