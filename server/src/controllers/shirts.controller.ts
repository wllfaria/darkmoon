import { Request, Response } from 'express';

import ShirtsModel from "../models/shirts.model";
import Shirts from '../interfaces/shirts.interface';

export default class ShirtsController {
  

  public async getAll(_req: Request, res: Response) {
    try {
      console.log("entered")
      const shirtsModel: ShirtsModel = new ShirtsModel();
      const result: Shirts[] = await shirtsModel.getAll();
      console.log(result);
      res.status(200).json({data: result})
    } catch (error) {
      res.status(400).json({failed: true})
    }
  }

  public async getByUrl(_req: Request, res: Response) {
    try {
      const shirtsModel: ShirtsModel = new ShirtsModel();
      const result: Shirts[] = await shirtsModel.getByUrl(_req.params.url)
      res.status(200).json({data: result});
    } catch (error) {
      res.status(400).json({failed: true})
    }
  }
}