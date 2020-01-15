import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import uuidv4 from 'uuid/v4'
import '../../env';
import { MessageFactory } from './MessageFactory/messageFactory';
import ErrorMessage from './MessageFactory/errorMessage';
import { Response } from 'express';

export default class EncoderModel {
  public encodePassword = (password: string): any => {
    const salt = this.generateSalt();
    const encodedPassword = this.processPassword(password, salt);
    return {
      salt,
      encodedPassword
    };
  }

  public decodePassword = (comparePassword: string, password: string, salt: string): boolean => {
    const encodedPassword = this.processPassword(password, salt);
    return comparePassword === encodedPassword;
  }

  public generateGuid = (): string => {
    return uuidv4()
  }

  public signJWT = (person: object): string => {
    return jwt.sign(person, <jwt.Secret>process.env.JWTSECRETKEY, { expiresIn: Math.floor(Date.now() + Number(process.env.JWTEXPIRATION))})
  }

  public verifyJWT = (token: string): any => {
    return jwt.verify(token, <jwt.Secret>process.env.JWTSECRETKEY)
  }

  public decodeJWT = (token: string): any => {
    return jwt.decode(token);
  }

  private generateSalt = (): string => {
    return crypto.randomBytes(Number(process.env.CRYPTOSALT)).toString(process.env.CRYPTOSTRING);
  }

  private processPassword = (password: string, salt: string): string => {
    return crypto.pbkdf2Sync(<crypto.BinaryLike>password, salt, Number(process.env.CRYPTOITERATIONS), Number(process.env.CRYPTOKEYLEN), <string>process.env.CRYPTOALGORITHM).toString(process.env.CRYPTOSTRING)
  }
}