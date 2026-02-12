import { test, expect } from '@playwright/test';
const BASE = 'https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC';

test('registro de usuario - ConnType=JDBC', async ({ page }) => {
  await page.goto(BASE);
  await page.getByRole('link', { name: 'Register' }).click();

  const username = `jdbc_user_${Date.now()}`;
  const password = 'Password123!';

  await page.fill('input[name="firstName"]', 'Prueba');
  await page.fill('input[name="lastName"]', 'JDBC');
  await page.fill('input[name="address"]', 'C/ Prueba 1');
  await page.fill('input[name="city"]', 'Ciudad');
  await page.fill('input[name="state"]', 'Estado');
  await page.fill('input[name="zipCode"]', '00000');
  await page.fill('input[name="phone"]', '600000000');
  await page.fill('input[name="ssn"]', '000000000');

  await page.fill('input[name="username"]', username);
  await page.fill('input[name="password"]', password);
  await page.fill('input[name="repeatedPassword"]', password);

  await page.getByRole('button', { name: 'Register' }).click();

  // Verificar mensaje de cuenta creada
  await expect(page.locator('text=Your account was created')).toBeVisible({ timeout: 10000 });
});
