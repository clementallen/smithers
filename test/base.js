import chai from 'chai';
import sinon from 'sinon';
import chaiSinon from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiSinon);
chai.use(chaiAsPromised);

global.chai = chai;
global.sinon = sinon;
global.expect = chai.expect;
