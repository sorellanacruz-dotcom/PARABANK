import { test, expect } from '@playwright/test';
const users = require('./data/users.json');

users.forEach(u => {
  test(`login ${u.username}`, async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await page.fill('input[name="username"]', u.username);
    await page.fill('input[name="password"]', u.password);
    await page.click('input[value="Log In"]');
    await page.waitForURL(/overview/, { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { name: 'Accounts Overview' })).toBeVisible();

    // Intentamos detectar confirmación, no fallar si no aparece
      try {
       
        // Navegar a Log out
        await page.click('a:has-text("Log Out")');
      } catch (e) {
        // ignore
       
      }
  });
});
