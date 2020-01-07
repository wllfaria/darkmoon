import { getMySqlConnection } from '../database';
import { RowDataPacket, QueryError } from 'mysql';
import Shirts from '../interfaces/shirts.interface';

// I will refactor this class once I get home.


export default class ShirtsModel {
  public getAll(): Promise<Shirts[]> {
    return new Promise(async (resolve, reject) => {
      let shirts: RowDataPacket[];
      const conn: any = await getMySqlConnection();
      conn.query(
        `
          select
          B.product_name as name,
          B.product_url as url,
          A.sku,
          A.color,
          A.price,
          A.size,
          B.product_type as productType,
          A.model,
          A.gender
          from shirts as A
          inner join skus as B
          on A.sku = B.id
        `, 
        async (error: QueryError, results: RowDataPacket[]) => {
          conn.release();
          if(error) reject(error);
          shirts = await this.getImages(results)
          shirts = await this.getGenders(shirts)
          shirts = await this.getModels(shirts);
          shirts = await this.getTypes(shirts);
          resolve(<Shirts[]>shirts);
        }
      );
    })
  }

  public getByUrl(url: string): Promise<Shirts[]> {
    return new Promise(async (resolve, reject) => {
      let shirts: RowDataPacket[];
      const conn: any = await getMySqlConnection();
      conn.query(
        `
          select
          B.product_name as name,
          B.product_url as url,
          A.sku,
          A.color,
          A.price,
          A.size,
          B.product_type as productType,
          A.model,
          A.gender
          from shirts as A
          inner join skus as B
          on A.sku = B.id
          where B.product_url = ?
        `,
        url,
        async (error: QueryError, results: RowDataPacket[]) => {
          conn.release();
          if(error) reject(error);
          shirts = await this.getImages(results);
          shirts = await this.getGenders(shirts);
          shirts = await this.getModels(shirts)
          shirts = await this.getTypes(shirts);
          resolve(<Shirts[]>shirts);
        }
      )
    })
  }

  // Doing this is to miss the point of the relational database, that is the foreign joins.
  private getImages(shirts: RowDataPacket[]): Promise<RowDataPacket[]> {
    return new Promise((resolve, reject) => {
      shirts.forEach(async (shirt, index, array) => {
        const conn: any = await getMySqlConnection();
        conn.query(
          `
            select
            id,
            url,
            alt
            from product_images 
            where product_sku = ?
          `,
          shirt.sku,
          (error: QueryError, results: RowDataPacket[]) => {
            conn.release();
            if(error) reject(error);
            shirt['images'] = results;
            if(index >= array.length - 1) {
              resolve(shirts);
            }
          }
        )
      })
    })
  }

  private getGenders(shirts: RowDataPacket[]): Promise<RowDataPacket[]> {
    return new Promise((resolve, reject) => {
      shirts.forEach(async (shirt, index, array) => {
        const conn: any = await getMySqlConnection();
        conn.query(
          `
            select
            id,
            name
            from genders 
            where id = ?
          `,
          shirt.gender,
          (error: QueryError, results: RowDataPacket[]) => {
            conn.release();
            if(error) reject(error);
            shirt['gender'] = results[0]
            if(index >= array.length - 1) {
              resolve(shirts);
            }
          }
        )
      })
    })
  }

  private getModels(shirts: RowDataPacket[]): Promise<RowDataPacket[]> {
    return new Promise((resolve, reject) => {
      shirts.forEach(async (shirt, index, array) => {
        const conn: any = await getMySqlConnection();
        conn.query(
          `
            select
            id,
            name
            from models 
            where id = ?
          `,
          shirt.model,
          (error: QueryError, results: RowDataPacket[]) => {
            conn.release();
            if(error) reject(error);
            shirt['model'] = results[0];
            if(index >= array.length - 1) {
              resolve(shirts);
            }
          }
        )
      })
    })
  }

  private getTypes(shirts: RowDataPacket[]): Promise<RowDataPacket[]> {
    return new Promise((resolve, reject) => {
      shirts.forEach(async (shirt, index, array) => {
        const conn: any = await getMySqlConnection();
        await conn.query(
          `
            select
            id,
            name
            from product_types 
            where id = ?
          `,
          shirt.productType,
          (error: QueryError, results: RowDataPacket[]) => {
            if(error) reject(error);
            shirt['productType'] = results[0];
            if(index >= array.length - 1) {
              resolve(shirts);
            }
          }
        )
      })
    })
  }
}