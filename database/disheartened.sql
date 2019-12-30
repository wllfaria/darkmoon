create database db_disheartened;
use db_disheartened;

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
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp,
  deleted_at datetime default null,
  primary key(id)
);

create table base_product (
	id int not null unique auto_increment,
  product_id int not null,
  product_type int not null,
  avaliable boolean not null,
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp,
  deleted_at datetime default null,
  primary key(id),
  foreign key (product_type) references product_types (id)
);

create table shirts (
	id int not null unique auto_increment,
  name varchar(255) not null,
  url varchar(255) not null,
  sku int not null,
  color varchar(30) not null,
  price numeric(14,2) not null,
  sile_price numeric(14,2) default null,
  sale_date datetime default null,
  size enum("PP","P","M","G","GG") not null,
  product_type int not null,
  model int not null,
  gender int not null,
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp,
  deleted_at datetime default null,
  primary key(id),
  foreign key (sku) references skus(id),
  foreign key (product_type) references product_types(id),
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