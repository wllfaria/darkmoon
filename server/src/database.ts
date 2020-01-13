import { Sequelize } from 'sequelize-typescript';
import * as config from '../db-config.json';
import Person from './models/v1/person.model';
import Address from './models/v1/address.model';
import Card from './models/v1/card.model';
import CardFlag from './models/v1/cardFlag.model';
import Gender from './models/v1/gender.model';
import ProductModel from './models/v1/productModel.model';
import Shirt from './models/v1/shirt.model';
import Sku from './models/v1/sku.model';
import ProductType from './models/v1/productType.model';
import ProductImage from './models/v1/productImage.model';

export class ModelRepository {
  repository: Sequelize | undefined;

  constructor() {
    this.initialize();
  }

  private initialize = () => {
    this.repository = new Sequelize(config.database, config.username, config.password, {
      dialect: "mysql",
      host: config.host,
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    });
    this.addModels();
    // this.repository.sync({ force: true })
  }

  private addModels = () => {
    this.repository?.addModels([
      Address,
      Card,
      CardFlag,
      Gender,
      Person,
      ProductImage,
      ProductModel,
      ProductType,
      Shirt,
      Sku
    ]);
  }

  async testConnection() {
    await this.repository?.authenticate();
    try {
      await Person.create({ first_name: "asdasdasd" })
      console.log("Will create persons.")
      await Person.sync({ force: true });
      await Address.sync({ force: true });
    } catch (e) {
      console.log("Error!", e)
    }
    return null;
  }

  async testTables() {
    // var person = new Person({
    //   first_name: "Willians",
    //   last_name: "Faria",
    //   cpf: "41749257807",
    //   email: "willianasfaria@hotmail.com",
    //   password: "Wfaria10"
    // });
    // await person.save();

    // Person.bulkCreate([{
    //     first_name: "Willians",
    //     last_name: "Faria",
    //     cpf: "41749257807",
    //     email: "willianasfaria@hotmail.com",
    //     password: "Wfaria10"
    //   }, {
    //     first_name: "Artur",
    //     last_name: "Trapp",
    //     cpf: "06341149999",
    //     email: "artptrapp@hotmail.com",
    //     password: "Atrapp10",
    //     addresses: [
    //       {
    //         city: "Dublin",
    //         state: "Co. Dublin",
    //         district: "Ballsbridge"
    //       },
    //       {
    //         city: "Dublin",
    //         state: "Co. Dublin",
    //         district: "Dun Laoghaire"
    //       },
    //     ]
    //   }], { } );

    // await Person.create({
    //   first_name: "Artur",
    //   last_name: "Trapp",
    //   cpf: "06341149999",
    //   email: "artptrapp@hotmail.com",
    //   password: "Atrapp10",
    //   addresses: [
    //     {
    //       city: "Dublin",
    //       state: "Co. Dublin",
    //       district: "Ballsbridge"
    //     },
    //     {
    //       city: "Dublin",
    //       state: "Co. Dublin",
    //       district: "Dun Laoghaire"
    //     },
    //   ]}, { include: Address }
    //   );

    // console.log(person);
  }
}