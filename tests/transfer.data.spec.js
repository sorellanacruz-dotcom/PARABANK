import { test, expect } from '@playwright/test';
const users = require('./data/users.json');

const BASE = 'https://parabank.parasoft.com/parabank/index.htm';

users.forEach(u => {
  test(`transferencia con usuario ${u.username}`, async ({ page }) => {
    // Navegar al sitio
    await page.goto(BASE);
    await page.waitForLoadState('domcontentloaded');

    // Login con credenciales del usuario
    await page.fill('input[name="username"]', u.username);
    await page.fill('input[name="password"]', u.password);
    
    // Click en el botón de login
    await page.click('input[value="Log In"]');
    
    // Esperar a que cargue la página inicial después del login
    await page.waitForURL(/overview/, { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Navegar a Transfer Funds
    await page.click('a:has-text("Transfer Funds")');
    
    // Esperar a que cargue la página de Transfer Funds
    await page.waitForURL(/transfer/, { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Click en el campo amount y escribir 50
    await page.click('input[name="input"]');
    await page.fill('input[name="input"]', '50');
    await page.waitForTimeout(500);

    // Seleccionar primer valor de fromAccountId
  


     await page.click('#fromAccountId');
     const options = page.locator('#fromAccountId');

     const count = await options.count();
     const randomIndex = Math.floor(Math.random() * count);
       await options.nth(randomIndex).click();
       await page.waitForTimeout(500);

    // Seleccionar  valor de toAccountId
   
      await page.click('#toAccountId');
      const options1 = page.locator('#toAccountId');
      const count1 = await options1.count();
      if (count1 > 0  ){
      const randomIndex1 = Math.floor(Math.random() * count1-1) + 1; // Excluye la primera opción (index 0)
  
      await options1.nth(randomIndex1).click();
      }
      await page.waitForTimeout(500);

    
    // Hacer clic en Transfer button
    await page.click('input[value="Transfer"]');

    // Esperar a que la transferencia se procese
    await page.waitForTimeout(2000);
    
    // Verificar que la transferencia fue exitosa
    await expect(page.locator('text=Transfer Complete')).toBeVisible({ timeout: 10000 });
  });
});
