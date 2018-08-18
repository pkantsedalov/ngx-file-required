/* global __dirname */
import * as path from 'path';
import { ElementFinder } from 'protractor';

import { NgxPresentationPage } from './app.po';

const hasClass = async (element: ElementFinder, className: string): Promise<boolean> => {
  const classes: string        = await element.getAttribute('class');
  const classesArray: string[] = classes.split(' ');
  return classesArray.includes(className);
};

describe('ngx-presentation App', () => {
  let page: NgxPresentationPage;

  beforeEach(() => {
    page = new NgxPresentationPage();
  });

  describe('required', () => {

    it('should check the default state of <input type="file" required [(ngModel)]="model" />', async () => {
      page.navigateTo('');
      const fileInputHtmlElement: ElementFinder = page.getRequiredFileInput();

      expect(await hasClass(fileInputHtmlElement, 'ng-untouched')).toBe(true, 'no ng-untouched CSS class');
      expect(await hasClass(fileInputHtmlElement, 'ng-pristine')).toBe(true, 'no ng-pristine CSS class');
      expect(await hasClass(fileInputHtmlElement, 'ng-invalid')).toBe(true, 'no ng-invalid CSS class');
    });

    it('should check the state of <input type="file" required [(ngModel)]="model" /> after setting a value', async () => {
      page.navigateTo('');
      const fileInputHtmlElement: ElementFinder = page.getRequiredFileInput();

      fileInputHtmlElement.sendKeys(path.resolve(__dirname, './test.txt'));

      expect(await hasClass(fileInputHtmlElement, 'ng-valid')).toBe(true, 'no ng-valid CSS class');
    });

    it('should check the state of <input type="file" required [(ngModel)]="model" /> after resetting a value', async () => {
      page.navigateTo('');
      const fileInputHtmlElement: ElementFinder = page.getRequiredFileInput();

      fileInputHtmlElement.sendKeys(path.resolve(__dirname, './test.txt'));
      await fileInputHtmlElement.clear();

      expect(await hasClass(fileInputHtmlElement, 'ng-invalid')).toBe(true, 'no ng-invalid CSS class');
    });

  });

  describe('error message', () => {

    it('should check the default error message', async () => {
      page.navigateTo('');
      const errorMessageHtmlElement: ElementFinder = page.getElementBySelector('.required-file-default-container .required-error-msg-text');

      expect(await errorMessageHtmlElement.getText() === 'File is required').toBe(true, 'no default error message');
    });

    it('should check the custom error message', async () => {
      page.navigateTo('');
      const errorMessageHtmlElement: ElementFinder = page
        .getElementBySelector('.required-file-custom-error-container .required-error-msg-text');

      expect(await errorMessageHtmlElement.getText() === 'Set the file value!').toBe(true, 'no custom error message');
    });

  });

  describe('toggled', () => {

    it('should check the default state of <input type="file" [(ngModel)]="model" />', async () => {
      page.navigateTo('');
      const fileInputHtmlElement: ElementFinder = page.getToggledFileInput();

      expect(await hasClass(fileInputHtmlElement, 'ng-untouched')).toBe(true, 'no ng-untouched CSS class');
      expect(await hasClass(fileInputHtmlElement, 'ng-pristine')).toBe(true, 'no ng-pristine CSS class');
      expect(await hasClass(fileInputHtmlElement, 'ng-valid')).toBe(true, 'no ng-valid CSS class');
    });

    it('should check the state of <input type="file" [(ngModel)]="model" /> after setting a value', async () => {
      page.navigateTo('');
      const fileInputHtmlElement: ElementFinder = page.getToggledFileInput();

      fileInputHtmlElement.sendKeys(path.resolve(__dirname, './test.txt'));

      expect(await hasClass(fileInputHtmlElement, 'ng-valid')).toBe(true, 'no ng-valid CSS class');
    });

    it('should check the state of <input type="file" [(ngModel)]="model" /> after resetting a value', async () => {
      page.navigateTo('');
      const fileInputHtmlElement: ElementFinder = page.getToggledFileInput();

      fileInputHtmlElement.sendKeys(path.resolve(__dirname, './test.txt'));
      await fileInputHtmlElement.clear();

      expect(await hasClass(fileInputHtmlElement, 'ng-valid')).toBe(true, 'no ng-valid CSS class');
    });

    it('should check the default state of <input type="file" [(ngModel)]="model" /> after toggle a checkbox', async () => {
      page.navigateTo('');
      const fileInputHtmlElement: ElementFinder = page.getToggledFileInput();

      expect(await hasClass(fileInputHtmlElement, 'ng-untouched')).toBe(true, 'no ng-untouched CSS class');
      expect(await hasClass(fileInputHtmlElement, 'ng-pristine')).toBe(true, 'no ng-pristine CSS class');
      expect(await hasClass(fileInputHtmlElement, 'ng-valid')).toBe(true, 'no ng-valid CSS class');

      const isRequiredCheckbox: ElementFinder = page.getIsRequiredCheckbox();
      await isRequiredCheckbox.click();

      expect(await hasClass(fileInputHtmlElement, 'ng-invalid')).toBe(true, 'no ng-invalid CSS class');
    });

    it('should check the state of <input type="file" [(ngModel)]="model" /> after setting a value and toggle a checkbox', async () => {
      page.navigateTo('');
      const fileInputHtmlElement: ElementFinder = page.getToggledFileInput();

      fileInputHtmlElement.sendKeys(path.resolve(__dirname, './test.txt'));

      expect(await hasClass(fileInputHtmlElement, 'ng-valid')).toBe(true, 'no ng-valid CSS class');

      const isRequiredCheckbox: ElementFinder = page.getIsRequiredCheckbox();
      await isRequiredCheckbox.click();

      expect(await hasClass(fileInputHtmlElement, 'ng-valid')).toBe(true, 'no ng-valid CSS class');
    });

    it('should check the state of <input type="file" [(ngModel)]="model" /> after resetting a value and toggle a checkbox', async () => {
      page.navigateTo('');
      const fileInputHtmlElement: ElementFinder = page.getToggledFileInput();
      const isRequiredCheckbox: ElementFinder   = page.getIsRequiredCheckbox();

      fileInputHtmlElement.sendKeys(path.resolve(__dirname, './test.txt'));
      expect(await hasClass(fileInputHtmlElement, 'ng-valid')).toBe(true, 'no ng-valid CSS class');

      await isRequiredCheckbox.click();
      await fileInputHtmlElement.clear();

      expect(await hasClass(fileInputHtmlElement, 'ng-invalid')).toBe(true, 'no ng-invalid CSS class');

      fileInputHtmlElement.sendKeys(path.resolve(__dirname, './test.txt'));
      expect(await hasClass(fileInputHtmlElement, 'ng-valid')).toBe(true, 'no ng-valid CSS class');
    });

  });

});
