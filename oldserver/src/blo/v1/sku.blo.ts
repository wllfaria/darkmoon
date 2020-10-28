import log4js from 'log4js';
import { Includeable, Transaction } from "sequelize/types";
import Sku from "../../models/v1/sku.model";

export default class SkuBLO {



    /**
     * Returns all the SKUs currently in the database.
     * @param includes The dependant models to be eagerly loaded.
     */
    public async getAll(includes?: Includeable[]): Promise<Sku[]> {
        const result = await Sku.findAll({ include: includes });
        return result;
    }

    /**
     * 
     * @param productUrl The product URL to search for.
     * @param includes The dependant modesl to be eagerly loaded.
     */
    public async getByProductUrl(productUrl: string, includes?: Includeable[]): Promise<Sku | null> {
        const result = await Sku.findOne({ include: includes, where: { product_url: productUrl } });
        return result;
    }

    /**
     * Creates a Sku based on given data.
     */
    public async create(productName: string, productUrl: string, productType: string, available: boolean, transaction?: Transaction): Promise<Sku> {
        const result = await Sku.create({
            product_name: productName,
            product_url: productUrl,
            type_id: productType,
            available
        }, {
            transaction
        });
        return result;
    }
}