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

create table sizes (
	id int not null unique auto_increment,
  size varchar(3) not null unique,
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp,
  deleted_at datetime default null,
  primary key (id)
);

create table categories(
	id int not null unique auto_increment,
  name varchar(140) not null unique,
	created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp,
  deleted_at datetime default null,
  primary key (id)
);

create table genders (
	id int not null unique auto_increment,
  gender varchar(40) not null unique,
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp,
  deleted_at datetime default null,
  primary key (id)
);

create table products (
	id int not null unique auto_increment,
  code varchar(8) not null,
  name varchar(140) not null,
  url varchar(140) not null,
  price numeric(14,2) not null,
  sale_price numeric(14,2) default null,
  sale_date datetime default null,
  size_id int not null,
  category_id int not null,
  gender_id int not null,
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp,
  deleted_at datetime default null,
  primary key (id),
  foreign key (size_id) references sizes(id),
  foreign key (category_id) references categories(id),
  foreign key (gender_id) references genders(id)
);

create table product_images (
	id int not null unique auto_increment,
  url varchar(255) not null unique,
  product_id int not null,
	created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp,
  deleted_at datetime default null,
  primary key (id),
  foreign key (product_id) references products(id)
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

insert into addresses (person_id, zip_code, public_place, neighborhood, city, state, number, complement, reference) values (3, "04326080", "Vila Fachini", "Avenida Euclides", "São Paulo", "SP", "432", "Casa 11", "bombeiros");