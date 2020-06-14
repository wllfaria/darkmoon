import Person from "../../models/v1/person.model";
import log4js from 'log4js';
import { Includeable, Transaction } from "sequelize/types";
import { DH_CHECK_P_NOT_SAFE_PRIME } from "constants";

export default class PersonBLO {

    private errorLogger = log4js.getLogger("error");

    /**
     * Creates a person with given parameters
     * @returns The created person if successful, otherwise undefined 
     */
    public async create(
        name: string,
        email: string,
        cpf: string,
        encodedPassword: string,
        salt: string,
        transaction?: Transaction): Promise<Person | undefined> {
        try {
            const person = await Person.create({ name, email, cpf, password: encodedPassword, salt }, { transaction })
            return person;
        } catch (e) {
            this.errorLogger.error(e.toString());
            return undefined;
        }
    }

    /**
     * Gets a person by it's email address
     * @returns The created found if any, otherwise undefined 
     */
    public async getByEmail(email: string): Promise<Person | null> {
        try {
            const person = await Person.findOne({ where: { email } })
            return person;
        } catch (e) {
            this.errorLogger.error(e.toString());
            return null;
        }
    }

    /**
     * Returns a person by it's identifier.
     * @param id The primary key of the person
     */
    public async getById(id: number): Promise<Person | null> {
        try {
            const person = await Person.findByPk(id);
            return person;
        } catch (e) {
            this.errorLogger.error(e.toString());
            return null;
        }
    }

    /**
     * Removes - and . from a given CPF string
     * @param unformattedCpf The CPF with separators
     */
    public formatCPF(unformattedCpf: string): string {
        return unformattedCpf.replace(/\./g, '').replace(/\-/g, '');
    }

    /**
     * Updates a person name, password and salt by its CPF
     */
    public async updateNameAndPassword(
        cpfToBeUpdated: string,
        name: string,
        password: string,
        salt: string,
        transaction?: Transaction): Promise<Person | undefined> {
        try {
            const result = await Person.update({ name, password, salt }, { where: { cpfToBeUpdated }, transaction });
            let affectedPerson: Person | undefined = undefined;
            if (result[1].length) {
                affectedPerson = result[1][0];
            }
            return affectedPerson
        } catch (e) {
            this.errorLogger.error(e.toString());
            return undefined;
        }
    }

}