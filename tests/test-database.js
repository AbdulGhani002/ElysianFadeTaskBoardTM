const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { expect } = require('chai');

dotenv.config();

describe('Database Connection', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it('should connect to the database successfully', () => {
    expect(mongoose.connection.readyState).to.equal(1);
  });

  it('should disconnect from the database successfully', async () => {
    await mongoose.connection.close();
    expect(mongoose.connection.readyState).to.equal(0);
  });
});
