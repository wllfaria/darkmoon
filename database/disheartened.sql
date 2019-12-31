create database db_darkmoon;
use db_darkmoon;
#drop database db_darkmoon;

create table persons(
	id int not null unique auto_increment,
  first_name varchar(45) not null,
  last_name varchar(45) not null,
  cpf char(11) not null,
  birthdate date not null,
  email varchar(255) not null unique,
  uuid varchar(36) default null unique,
  password varchar(140) default null,
  token varchar(140) default null,
  expire datetime default null,
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp,
  deleted_at datetime default null,
  primary key (id)
);

create table product_types (
	id int not null unique auto_increment,
  name varchar(255) not null unique,
	created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp,
  deleted_at datetime default null,
  primary key (id)
);

create table models (
	id int not null unique auto_increment,
  product_type int not null,
  name varchar(100) not null,
	created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp,
  deleted_at datetime default null,
  primary key(id),
  foreign key (product_type) references product_types(id)
);

create table genders (
	id int not null unique auto_increment,
  name varchar(30) not null unique,
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp,
  deleted_at datetime default null,
  primary key(id)
);

create table skus (
	id int not null unique auto_increment,
  product_name varchar(255) not null unique,
  product_url varchar(255) not null unique,
  product_type int not null,
  avaliable boolean not null,
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp,
  deleted_at datetime default null,
  primary key(id),
  foreign key (product_type) references product_types(id)
);

create table shirts (
	id int not null unique auto_increment,
  sku int not null,
  color varchar(30) not null,
  price numeric(14,2) not null,
  sale_price numeric(14,2) default null,
  sale_date datetime default null,
  size enum("PP","P","M","G","GG") not null,
  model int not null,
  gender int not null,
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp,
  deleted_at datetime default null,
  primary key(id),
  foreign key (sku) references skus(id),
  foreign key (model) references models(id),
  foreign key (gender) references genders(id)
);

create table product_images (
  id int not null unique auto_increment,
  url varchar(255) not null unique,
  product_sku int not null,
  alt varchar(140) not null,
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp,
  deleted_at datetime default null,
  primary key (id),
  foreign key (product_sku) references skus(id)
);

create table addresses(
	id int not null unique auto_increment,
  person_id int not null,
  zip_code varchar(8) not null,
  public_place varchar(255) not null,
  neighborhood varchar(255) not null,
  city varchar(255) not null,
  state varchar(2) not null,
  number varchar(99) not null,
	complement varchar(140) default null,
  reference varchar(140) default null,
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp,
  deleted_at datetime default null,
  primary key (id),
  foreign key (person_id) references persons(id)
);

insert into product_types (name) values ("shirt");
insert into models (product_type, name) values (1, "longsleeve");
insert into genders (name) values ("male");
insert into genders (name) values ("female");
insert into genders (name) values ("unisex");
insert into skus (product_name, product_url, product_type, avaliable) values ("Phoebe Ribbed Top", "phoebe-ribbed-top", 1, true);
insert into shirts (sku, color, price, size, model, gender) values (1,"white", 123.99, "P", 1, 2);
insert into product_images (url, product_sku, alt) values ("https://cdn.shopify.com/s/files/1/1014/6323/products/PHOEBE-RIBBEDTOP-WHITE-C_1024x1024.jpg", 1, "Women wearing the Phoebe Ribbed Top size P");
insert into product_images (url, product_sku, alt) values ("https://cdn.shopify.com/s/files/1/1014/6323/products/PHOEBE-RIBBEDTOP-WHITE-D_1024x1024.jpg", 1, "Women wearing the Phoebe Ribbed Top size P");
insert into product_images (url, product_sku, alt) values ("https://cdn.shopify.com/s/files/1/1014/6323/products/PHOEBE-RIBBEDTOP-WHITE-B_1024x1024.jpg", 1, "Women wearing the Phoebe Ribbed Top size P");
insert into product_images (url, product_sku, alt) values ("https://cdn.shopify.com/s/files/1/1014/6323/products/PHOEBE-RIBBEDTOP-WHITE_1024x1024.jpg", 1, "Women wearing the Phoebe Ribbed Top size P");
insert into skus (product_name, product_url, product_type, avaliable) values ("Esme Lace Top", "esme-lace-top", 1, true);
insert into shirts (sku, color, price, size, model, gender) values (2,"black", 159.99, "PP", 1, 2);
insert into product_images (url, product_sku, alt) values ("https://cdn.shopify.com/s/files/1/0228/2373/products/ESME-LONGSLEEVETOP-B_1024x1024.jpg", 2, "Women wearing the Esme Lace Top size PP");
insert into product_images (url, product_sku, alt) values ("https://cdn.shopify.com/s/files/1/0228/2373/products/ESME-LONGSLEEVETOP-C_1024x1024.jpg", 2, "Women wearing the Esme Lace Top size PP");
insert into product_images (url, product_sku, alt) values ("https://cdn.shopify.com/s/files/1/0228/2373/products/ESME-LONGSLEEVETOP-D_1024x1024.jpg", 2, "Women wearing the Esme Lace Top size PP");
insert into skus (product_name, product_url, product_type, avaliable) values ("Replicantz Bolero Top", "replicantz-bolero-top", 1, true);
insert into shirts (sku, color, price, size, model, gender) values (3,"black", 79.99, "P", 1, 2);
insert into product_images (url, product_sku, alt) values ("https://cdn.shopify.com/s/files/1/0228/2373/products/REPLICANTZ-BOLERO-B_1024x1024.jpg", 3, "Women wearing the Replicantz Bolero Top size P");
insert into product_images (url, product_sku, alt) values ("https://cdn.shopify.com/s/files/1/0228/2373/products/REPLICANTZ-BOLERO-C_1024x1024.jpg", 3, "Women wearing the Replicantz Bolero Top size P");
insert into product_images (url, product_sku, alt) values ("https://cdn.shopify.com/s/files/1/0228/2373/products/REPLICANTZ-BOLERO_1024x1024.jpg", 3, "Women wearing the Replicantz Bolero Top size P");
insert into skus (product_name, product_url, product_type, avaliable) values ("Halter Top", "halter-top", 1, true);
insert into shirts (sku, color, price, size, model, gender) values (4, "red", 39.99, "M", 1, 2);
insert into product_images (url, product_sku, alt) values ("http://cdn.shopify.com/s/files/1/0228/2373/products/BLACKWIDOWS-HALTERTOP-B_1024x1024.jpg", 4, "Women wearing the Replicantz Bolero Top size P");
insert into product_images (url, product_sku, alt) values ("https://cdn.shopify.com/s/files/1/0228/2373/products/BLACKWIDOWS-HALTERTOP-C_1024x1024.jpg", 4, "Women wearing the Replicantz Bolero Top size P");
insert into product_images (url, product_sku, alt) values ("https://cdn.shopify.com/s/files/1/0228/2373/products/BLACKWIDOWS-HALTERTOP-D_1024x1024.jpg", 4, "Women wearing the Replicantz Bolero Top size P");
insert into skus (product_name, product_url, product_type, avaliable) values ("Capella Lace Top", "capella-lace-top", 1, true);
insert into shirts (sku, color, price, size, model, gender) values (5, "green", 99.99, "P", 1, 2);
insert into product_images (url, product_sku, alt) values ("http://cdn.shopify.com/s/files/1/0228/2373/products/CAPELLA-LACE-TOP-B_1024x1024.jpg", 5, "Women wearing the Capella Lace Top size P");
insert into product_images (url, product_sku, alt) values ("https://cdn.shopify.com/s/files/1/0228/2373/products/CAPELLA-LACE-TOP-C_1024x1024.jpg", 5, "Women wearing the Capella Lace Top size P");
insert into product_images (url, product_sku, alt) values ("https://cdn.shopify.com/s/files/1/0228/2373/products/CAPELLA-LACE-TOP_1024x1024.jpg", 5, "Women wearing the Capella Lace Top size P");
insert into skus (product_name, product_url, product_type, avaliable) values ("Krystal Kaftan", "krystal-kaftan", 1, true);
insert into shirts (sku, color, price, size, model, gender) values (6, "black", 299.99, "P", 1, 2);
insert into product_images (url, product_sku, alt) values ("https://cdn.shopify.com/s/files/1/0228/2373/products/KRYSTAL-KAFTAN-D_1024x1024.jpg", 6, "Women wearing the Krystal Kaftan size P");
insert into product_images (url, product_sku, alt) values ("https://cdn.shopify.com/s/files/1/0228/2373/products/KRYSTAL-KAFTAN-C_1024x1024.jpg", 6, "Women wearing the Krystal Kaftan size P");
insert into product_images (url, product_sku, alt) values ("https://cdn.shopify.com/s/files/1/0228/2373/products/KRYSTAL-KAFTAN-B_1024x1024.jpg", 6, "Women wearing the Krystal Kaftan size P");