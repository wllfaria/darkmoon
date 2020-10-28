import { expect } from 'chai';
import 'mocha';
import 'ts-mocha';
import EncodingHelper from '../../../../src/helpers/v1/encoding.helper';

describe('EncodingHelper', () => {
  describe('encodePassword', () => {
    it('Expect to be a object', () => {
      expect(EncodingHelper.encodePassword("testpass")).to.be.a('object')
    })
    it('Expect to have property encodedPassword.', () => {
      expect(EncodingHelper.encodePassword("testpass")).to.have.property('encodedPassword');
    })
    it('Expect encodedPassword to be a string.', () => {
      expect(EncodingHelper.encodePassword("testpass")).to.have.property('encodedPassword').with.to.be.a('string');
    })
    it('Expect encodedPassword to not be empty.', () => {
      expect(EncodingHelper.encodePassword("testpass")).to.have.property('encodedPassword').with.to.not.be.empty;
    })
    it('Expect to have property salt.', () => {
      expect(EncodingHelper.encodePassword("testpass")).to.have.property('salt');
    })
    it('Expect salt to be a string.', () => {
      expect(EncodingHelper.encodePassword("testpass")).to.have.property('salt').with.to.be.a('string');
    })
    it('Expect salt to not be empty.', () => {
      expect(EncodingHelper.encodePassword("testpass")).to.have.property('salt').with.to.not.be.empty;
    })
  })
  describe('decodePassword', () => {
    it('Expect to be false', () => {
      expect(EncodingHelper.decodePassword("test", "test", "test")).to.be.a('boolean');
      expect(EncodingHelper.decodePassword("test", "test", "test")).to.be.false;
    })
    it('Expect to be true', () => {
      expect(EncodingHelper.decodePassword("6DT/G1oYiiA6ObbRNVKjar8g1/EQ5XytBBqllcILsTeKNfdMTeCSfIcGi1Y6dSs8UDv27qyuCJJgKRi4NckoUg==", "Wfaria10", "1vDCmE9GUBj5j0zBSV03Pw==")).to.be.a('boolean');
      expect(EncodingHelper.decodePassword("6DT/G1oYiiA6ObbRNVKjar8g1/EQ5XytBBqllcILsTeKNfdMTeCSfIcGi1Y6dSs8UDv27qyuCJJgKRi4NckoUg==", "Wfaria10", "1vDCmE9GUBj5j0zBSV03Pw==")).to.be.true;
    })
  })
  describe('generateGuid', () => {
    it('Expect to be a string', () => {
      expect(EncodingHelper.generateGuid()).to.be.a('string');
    })
  })
  describe('decodeJWT', () => {
    it('Expect to be valid', () => {
      expect(EncodingHelper.decodeJWT("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6InRlc3RlIHVzZXIgb25lIiwiaWF0IjoxNTc5NjAwMzc4LCJleHAiOjIxODU5Nzk5NzkxMzN9.X9PcPWnuywKdJ9df8MpdgzRBnyrki7GDpB0b6MPqVyM")).to.be.a('object');
      expect(EncodingHelper.decodeJWT("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6InRlc3RlIHVzZXIgb25lIiwiaWF0IjoxNTc5NjAwMzc4LCJleHAiOjIxODU5Nzk5NzkxMzN9.X9PcPWnuywKdJ9df8MpdgzRBnyrki7GDpB0b6MPqVyM")).to.have.property('id');
      expect(EncodingHelper.decodeJWT("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6InRlc3RlIHVzZXIgb25lIiwiaWF0IjoxNTc5NjAwMzc4LCJleHAiOjIxODU5Nzk5NzkxMzN9.X9PcPWnuywKdJ9df8MpdgzRBnyrki7GDpB0b6MPqVyM")).to.have.property('name');
      expect(EncodingHelper.decodeJWT("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6InRlc3RlIHVzZXIgb25lIiwiaWF0IjoxNTc5NjAwMzc4LCJleHAiOjIxODU5Nzk5NzkxMzN9.X9PcPWnuywKdJ9df8MpdgzRBnyrki7GDpB0b6MPqVyM")).to.have.property('iat');
      expect(EncodingHelper.decodeJWT("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6InRlc3RlIHVzZXIgb25lIiwiaWF0IjoxNTc5NjAwMzc4LCJleHAiOjIxODU5Nzk5NzkxMzN9.X9PcPWnuywKdJ9df8MpdgzRBnyrki7GDpB0b6MPqVyM")).to.have.property('exp');
    })
  })
  describe('signJWT', () => {
    it('Expect to be valid', () => {
      expect(EncodingHelper.signJWT({ test: "test" })).to.be.a('string');
      expect(EncodingHelper.signJWT({ hello: "world" })).to.be.a('string');
    })
  })
})