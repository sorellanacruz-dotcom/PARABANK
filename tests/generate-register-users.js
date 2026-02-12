const { faker } = require('@faker-js/faker');
const fs = require('fs');

const count = 10;
const users = Array.from({ length: count }).map((_, i) => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  address: faker.location.streetAddress(),
  city: faker.location.city(),
  state: faker.location.state(),
  zipCode: faker.location.zipCode(),
  phone: faker.phone.number('##########'),
  ssn: faker.string.numeric(9),
  username: `reg_user_${Date.now()}_${i}`,
  password: 'Password123!'
}));

const outPath = 'tests/data/register-users.js';
fs.writeFileSync(outPath, JSON.stringify(users, null, 2));
console.log(`Wrote ${users.length} users to ${outPath}`);
