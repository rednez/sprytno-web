import { test, expect } from '@playwright/test';

test('should redirect to login', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveURL(/login/);
});

test('has Signin with Google button', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(
    page.getByRole('button', { name: 'Signin with Google' }),
  ).toBeVisible();
});
