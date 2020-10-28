import Address from "../../models/v1/address.model";
import log4js from 'log4js';
import { Includeable } from "sequelize/types";

export default class AddressBLO {

    private errorLogger = log4js.getLogger("error");

    /**
     * Returns all the adresses in the database
     * @param includes The foreign keys to be lazy loaded.
     */
    public async getAll(includes?: Includeable[]): Promise<Address[] | null> {
        try {
            const addresses = await Address.findAll({ include: includes});
            return addresses;
        } catch (e) {
            this.errorLogger.error(e.toString());
            return null;
        }
    }

    /**
     * Returns a single Address object by it's primary key.
     * @param id The id of the address to be returned
     * @param includes The foreign keys to be lazy loaded
     */
    public async getById(id: number, includes?: Includeable[]): Promise<Address | null> {
        try {
            const address = await Address.findByPk(id, { include: includes});
            return address;
        } catch (e) {
            this.errorLogger.error(e.toString());
            return null;
        }
    }

    /**
     * Creates an address based on the provided data.
     * @param zipCode String. The zip code of the user.
     * @param district String. The district of the user.
     * @param city String. The city of the user.
     * @param state String. The state of the user.
     * @param number Number. The number of the house of the user.
     * @param complement String. Any extra details.
     */
    public async create(zipCode: string, district: string, neighborhood: string, city: string, state: string, number: string, complement: string): Promise<Address | null> {
        try {
            const result = await Address.create({
                zip_code: zipCode,
                district,
                neighborhood,
                city,
                state,
                number,
                complement
            });
            return result;
        } catch (e) {
            this.errorLogger.error(e.toString());
            return null;
        }
    }

}