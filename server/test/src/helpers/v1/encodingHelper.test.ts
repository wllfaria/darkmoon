import { expect } from 'chai';
import 'mocha';
import 'ts-mocha';
import EncodingHelper from '../../../../src/helpers/v1/encodingHelper.helper';

describe('EncodingHelper', () => {
  describe('encodePassword', () => {
    it('Should return an object', () => {
      expect(EncodingHelper.encodePassword("testpass")).to.be.a('object')
    })
  })
})