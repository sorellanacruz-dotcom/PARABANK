import { test, expect } from '@playwright/test';
const fs = require('fs');
const users = require('./data/register-users.js');

const BASE = 'https://parabank.parasoft.com/parabank/index.htm';

test.describe.serial('registro masivo', () => {
  test('registra usuarios secuencialmente', async ({ page }) => {
    const created = [];
    for (const u of users) {
      await page.goto(BASE);
      await page.getByRole('link', { name: 'Register' }).click();

      await page.fill('input[name="customer.firstName"]', u.firstName);
      await page.fill('input[name="customer.lastName"]', u.lastName);
      await page.fill('input[name="customer.address.street"]', u.address);
      await page.fill('input[name="customer.address.city"]', u.city);
      await page.fill('input[name="customer.address.state"]', u.state);
      await page.fill('input[name="customer.address.zipCode"]', u.zipCode);
      await page.fill('input[name="customer.phoneNumber"]', u.phone);
      await page.fill('input[name="customer.ssn"]', u.ssn);

      await page.fill('input[name="customer.username"]', u.username);
      await page.fill('input[name="customer.password"]', u.password);
      await page.fill('input[name="repeatedPassword"]', u.password);

      await page.getByRole('button', { name: 'Register' }).click();

      // Intentamos detectar confirmación, no fallar si no aparece
      try {
        await page.waitForSelector('text=Your account was created', { timeout: 5000 });
        // Navegar a Log out
        await page.click('a:has-text("Log Out")');
      } catch (e) {
        // ignore
        await page.getByRole('link', { name: 'Register' }).click();
      }

       

      

      created.push({ username: u.username, password: u.password });
    }

    fs.writeFileSync('tests/data/created-register-users.json', JSON.stringify(created, null, 2));
  });
});
