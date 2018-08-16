import {
  browser, element, by,
  ElementFinder
} from 'protractor';
import { promise as WebDriverPromise } from 'selenium-webdriver';

export class NgxPresentationPage {

  public navigateTo(path: string = ''): WebDriverPromise.Promise<any> {
    return browser.get(`/${path}`);
  }

  public getElementBySelector(selector: string = ''): ElementFinder {
    return element(by.css(selector));
  }

  public getRequiredFileInput(): ElementFinder {
    return element(by.css('#requiredFileInput'));
  }

  public getToggledFileInput(): ElementFinder {
    return element(by.css('#toggledRequiredFileInput'));
  }

  public getIsRequiredCheckbox(): ElementFinder {
    return element(by.css('#isRequiredCheckbox'));
  }

}
