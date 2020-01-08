import Person from "../models/person.model";
import { Request, Response } from "express";
import Persons from "../interfaces/persons.interface";

export default class PersonsController {
  constructor() {}

  public async fullRegister(_req: Request, res: Response) {
    try {
      const personsModel: Person = new Person();
      const person: Persons = {
        first_name: "Willians",
        last_name: "Faria",
        cpf: "41749257807",
        email: "willianasfaria@hotmail.com",
        password: "Wfaria10"
      }
      //const response = await personsModel.fullRegister(person)
      //console.log(response);
      res.status(200).json({ok: true});
    } catch (error) {
      res.status(400).json({failed: true});
    }
  }
}