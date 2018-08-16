import { Component, ViewChild } from '@angular/core';
import { NgxFileRequiredDirective } from '../lib/ngx-file-required.directive';

@Component({
  template: '<div></div>',
})
export default class RequiredTestComponent {

 /**
  * @type {any}
  * @public
  */
  public model: any;

  @ViewChild('ngxfrd')
  public ngxfrd: NgxFileRequiredDirective;
}
