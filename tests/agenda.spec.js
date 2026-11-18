import { test, expect } from '@playwright/test';

test('cadastro, ordenação, filtros, ações e persistência', async ({ page }) => {
  const erros = [];
  page.on('pageerror', erro => erros.push(erro.message));
  await page.goto('/');
  await expect(page.locator('.pendentes')).toHaveText('3');
  await expect(page.locator('.feitas')).toHaveText('1');
  await expect(page.locator('.proxima')).toHaveText('Matemática — 18/11');
  await expect(page.locator('.materia')).toHaveText(['Português', 'Matemática', 'Inglês', 'História']);
  await page.locator('#materia').fill('   ');
  await page.locator('#tipo').selectOption('prova');
  await page.locator('#data').fill('2026-11-15');
  await page.getByRole('button', { name: 'Adicionar', exact: true }).click();
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page.locator('.entrega')).toHaveCount(4);
  await page.locator('#filtro').selectOption('prova');
  await expect(page.locator('.entrega')).toHaveCount(1);
  await expect(page.locator('.pendentes')).toHaveText('3');
  await page.locator('#materia').fill('  Física  ');
  await page.getByRole('button', { name: 'Adicionar', exact: true }).click();
  await expect(page.locator('.materia')).toHaveText(['Física', 'Matemática']);
  await expect(page.locator('#materia')).toHaveValue('');
  await expect(page.locator('#tipo')).toHaveValue('');
  await expect(page.locator('#data')).toHaveValue('');
  await expect(page.getByRole('alert')).toHaveCount(0);
  await expect(page.locator('.proxima')).toHaveText('Física — 15/11');
  const fisica = page.locator('.entrega').filter({ hasText: 'Física' });
  await fisica.getByRole('button', { name: 'Feita', exact: true }).click();
  await expect(fisica).toHaveClass(/feita/);
  await page.reload();
  await expect(page.locator('.feitas')).toHaveText('2');
  await fisica.getByRole('button', { name: 'Reabrir', exact: true }).click();
  await expect(page.locator('.pendentes')).toHaveText('4');
  await page.reload();
  await expect(fisica).not.toHaveClass(/feita/);
  await fisica.getByRole('button', { name: 'Apagar entrega de Física', exact: true }).click();
  await page.reload();
  await expect(page.locator('.materia')).toHaveText(['Português', 'Matemática', 'Inglês', 'História']);
  for (const [tipo, nomes] of [['prova', ['Matemática']], ['trabalho', ['Português', 'História']], ['apresentacao', ['Inglês']]]) {
    await page.locator('#filtro').selectOption(tipo);
    await expect(page.locator('.materia')).toHaveText(nomes);
    await expect(page.locator('.pendentes')).toHaveText('3');
  }
  await page.getByRole('button', { name: 'Apagar as feitas', exact: true }).click();
  await page.reload();
  await expect(page.locator('.feitas')).toHaveText('0');
  await expect(page.getByRole('button', { name: 'Apagar as feitas', exact: true })).toBeDisabled();
  while (await page.locator('.entrega').count()) await page.locator('.botao-apagar').first().click();
  await expect(page.getByText('Nada por aqui.', { exact: true })).toBeVisible();
  await expect(page.locator('.proxima')).toHaveText('Nada pendente');
  await page.reload();
  await expect(page.locator('.entrega')).toHaveCount(0);
  expect(await page.evaluate(() => localStorage.getItem('agenda-de-entregas'))).toBe('[]');
  expect(erros).toEqual([]);
});

test('dados inválidos e migração da agenda antiga', async ({ page }) => {
  await page.goto('/');
  for (const invalido of ['{', '{}', '[null]', '[{"id":1,"materia":"X","tipo":"prova","data":"2026-02-30","feita":false}]']) {
    await page.evaluate(valor => localStorage.setItem('agenda-de-entregas', valor), invalido);
    await page.reload();
    await expect(page.locator('.entrega')).toHaveCount(4);
    await expect(page.getByRole('status')).toBeVisible();
  }
  await page.evaluate(() => localStorage.setItem('agenda-de-entregas', JSON.stringify([
    { materia: 'Antiga', tipo: 'Apresentação', data: '2026-11-20', feita: false },
  ])));
  await page.reload();
  await expect(page.locator('.materia')).toHaveText('Antiga');
  await page.locator('.botao-apagar').click();
  await page.reload();
  await expect(page.getByText('Nada por aqui.', { exact: true })).toBeVisible();
});

test('layout em celular e filtro sem resultados', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/');
  await page.locator('#filtro').selectOption('apresentacao');
  await page.locator('.botao-apagar').click();
  await expect(page.getByText('Nada por aqui.', { exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
