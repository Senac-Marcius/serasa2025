import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8081/');
  await page.getByText('').click();
  await page.getByText('Launchs').click();
  await page.getByText('turmas').click();
  await page.getByText('turma 2').click();
});