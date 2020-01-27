import { Transaction } from "sequelize/types";
import Event from "../../models/v1/event.model";
import EventEntity from "../../models/v1/eventEntity.model";
import EventType from "../../models/v1/eventType.model";
import { Database } from "../../database";

export default class EventListener {
    constructor() {}

    public static registerEvent = async (entity:string, type: string, description: string) => {
        const transaction: Transaction | undefined = await Database.getInstance().getTransaction();
        try {
            const fullEntity: any = await EventEntity.findOne({ where: { name: entity }, transaction });
            const fullType: any = await EventType.findOne({ where: { name: type }, transaction });
            const event: any = await Event.create({ type_id: fullType?.id, entity_id: fullEntity?.id, description }, { transaction });

            await transaction?.commit();
            return event;
        } catch (err) {
            await transaction?.rollback()
            throw new Error(err);
        }
    }    
}