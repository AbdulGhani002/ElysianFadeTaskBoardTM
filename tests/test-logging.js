const { expect } = require('chai');
const sinon = require('sinon');
const logger = require('../utils/logger');

describe('Logger', () => {
  let consoleLogStub;

  beforeEach(() => {
    consoleLogStub = sinon.stub(console, 'log');
  });

  afterEach(() => {
    consoleLogStub.restore();
  });

  it('should log info messages', () => {
    const message = 'This is an info message';
    logger.info(message);
    expect(consoleLogStub.calledOnce).to.be.true;
    expect(consoleLogStub.calledWith(`[INFO]: ${message}`)).to.be.true;
  });

  it('should log warning messages', () => {
    const message = 'This is a warning message';
    logger.warn(message);
    expect(consoleLogStub.calledOnce).to.be.true;
    expect(consoleLogStub.calledWith(`[WARN]: ${message}`)).to.be.true;
  });

  it('should log error messages', () => {
    const message = 'This is an error message';
    logger.error(message);
    expect(consoleLogStub.calledOnce).to.be.true;
    expect(consoleLogStub.calledWith(`[ERROR]: ${message}`)).to.be.true;
  });
});
