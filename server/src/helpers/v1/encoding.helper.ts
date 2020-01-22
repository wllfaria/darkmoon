import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import uuidv4 from 'uuid/v4'
import '../../env';

export default class EncodingHelper {
  public static encodePassword = (password: string): any => {
    const salt = EncodingHelper.generateSalt();
    const encodedPassword = EncodingHelper.processPassword(password, salt);
    return {
      salt,
      encodedPassword
    };
  }

  public static decodePassword = (comparePassword: string, password: string, salt: string): boolean => {
    const encodedPassword = EncodingHelper.processPassword(password, salt);
    return comparePassword === encodedPassword;
  }

  public static generatePin = (): number => {
    return Math.floor(900000 * Math.random()) + 100000;
  }

  public static generateGuid = (): string => {
    return uuidv4()
  }

  public static signJWT = (person: object): string => {
    return jwt.sign(person, <jwt.Secret>process.env.JWTSECRETKEY, { expiresIn: Math.floor(Date.now() + Number(process.env.JWTEXPIRATION))})
  }

  public static verifyJWT = (token: string): any => {
    return jwt.verify(token, <jwt.Secret>process.env.JWTSECRETKEY)
  }

  public static decodeJWT = (token: string): any => {
    return jwt.decode(token);
  }

  private static generateSalt = (): string => {
    return crypto.randomBytes(Number(process.env.CRYPTOSALT)).toString(process.env.CRYPTOSTRING);
  }

  private static processPassword = (password: string, salt: string): string => {
    return crypto.pbkdf2Sync(<crypto.BinaryLike>password, salt, Number(process.env.CRYPTOITERATIONS), Number(process.env.CRYPTOKEYLEN), <string>process.env.CRYPTOALGORITHM).toString(process.env.CRYPTOSTRING)
  }
}