import { describe, expect, test } from '@jest/globals'

import {
  SocialRemark,
  SocialRemarkMessageProtocolName,
  SubSclSource
} from '../../socialRemark';

function getRemarkMessage(
  testRemarkProtName: string,
  protocolVersion: string,
  action: string,
  target: string
) {
  return `${testRemarkProtName}::${protocolVersion}::${action}::0xa6a548df942e68a32fab3d325a25d8b5306a938aafc6bf205c2edc516cb92000::${target}::testDomain.sub::DOT`;
}

describe('SocialRemark Unit', () => {
  const testRemarkTitle: SocialRemarkMessageProtocolName = 'test_remark_prot_name';
  const protocolVersion = '0.1';

  const testPublicKey = '5H6bn23yFMF2P32AVaqgWoQemLtpGqLZWTMaVsYGZLo8A1bo';
  const testAddressSubsocial =
    '3t5NA8UKsGzrCDMfp8XMEBghiYthWGXGsHbjtJY45NUJDY5P';
  const testAddressPolkadot =
    '162tvMK378WVpa2gTDtgexEocxtTy8thax64fAXd7RpeLXCL';
  const testAddressHex =
    '0xde9f30be09a7cc7f0014261362069b66ce798d7a990def1b7deaa8b4b2a57668';

  const subsclRemarkMessageDomainRegPay = getRemarkMessage(
    testRemarkTitle,
    protocolVersion,
    'DMN_REG',
    testAddressSubsocial
  );
  const subsclRemarkSourceDomainRegPay: SubSclSource<'DMN_REG'> = {
    protName: testRemarkTitle,
    version: protocolVersion,
    action: 'DMN_REG',
    content: {
      domainName: 'testDomain.sub',
      target: testAddressSubsocial,
      token: 'DOT',
      opId: '0xa6a548df942e68a32fab3d325a25d8b5306a938aafc6bf205c2edc516cb92000'
    }
  };

  beforeAll(() => {
    SocialRemark.setConfig({ protNames: [testRemarkTitle] });
  });

  test('SocialRemark from Source to Message', () => {
    const remarkMessage = new SocialRemark()
      .fromSource(subsclRemarkSourceDomainRegPay)
      .toMessage();

    expect(remarkMessage).toEqual(subsclRemarkMessageDomainRegPay);
  });

  test('SocialRemark from Message to Source', () => {
    const remarkSource = new SocialRemark().fromMessage(
      subsclRemarkMessageDomainRegPay
    ).message;

    expect(remarkSource.valid).toEqual(true);

    expect({ ...subsclRemarkSourceDomainRegPay, valid: true }).toMatchObject(
      remarkSource
    );
  });

  test('SocialRemark from Message to Source with invalid protocol version', () => {
    const isValid = new SocialRemark().fromMessage(
      getRemarkMessage(testRemarkTitle, '0.2', 'DMN_REG', testAddressSubsocial)
    ).isValidMessage;

    expect(isValid).toEqual(false);
  });

  test('SocialRemark from Message with target as public key to Source with target as Subsocial', () => {
    const source = new SocialRemark().fromMessage(
      getRemarkMessage(testRemarkTitle, '0.1', 'DMN_REG', testPublicKey)
    ).message;

    expect(source).toMatchObject({
      protName: testRemarkTitle,
      version: protocolVersion,
      action: 'DMN_REG',
      content: {
        domainName: 'testDomain.sub',
        target: testAddressSubsocial,
        token: 'DOT',
        opId: '0xa6a548df942e68a32fab3d325a25d8b5306a938aafc6bf205c2edc516cb92000'
      }
    });
  });

  test('SocialRemark from Source with target as public key to Message with target as Subsocial', () => {
    const message = new SocialRemark()
      .fromSource({
        protName: testRemarkTitle,
        version: protocolVersion,
        action: 'DMN_REG',
        content: {
          domainName: 'testDomain.sub',
          target: testPublicKey,
          token: 'DOT',
          opId: '0xa6a548df942e68a32fab3d325a25d8b5306a938aafc6bf205c2edc516cb92000'
        }
      })
      .toMessage();

    expect(message).toEqual(
      getRemarkMessage(testRemarkTitle, '0.1', 'DMN_REG', testAddressSubsocial)
    );
  });

  test('SocialRemark from Source with target as public key to SocialRemark instance with target as Subsocial', () => {
    const remarkInst = new SocialRemark().fromSource({
      protName: testRemarkTitle,
      version: protocolVersion,
      action: 'DMN_REG',
      content: {
        domainName: 'testDomain.sub',
        target: testPublicKey,
        token: 'DOT',
        opId: '0xa6a548df942e68a32fab3d325a25d8b5306a938aafc6bf205c2edc516cb92000'
      }
    });

    expect(remarkInst.isValidMessage).toEqual(true);
    expect(testAddressSubsocial).toEqual(remarkInst.message.content!.target);
  });
});
