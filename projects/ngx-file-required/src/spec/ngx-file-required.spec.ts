/* global expect */

// Import necessary wrappers for Jasmine
import {
  TestBed,
  ComponentFixture
} from '@angular/core/testing';
import {
  FormsModule,
  FormControl,
  ValidationErrors
} from '@angular/forms';
import { ElementRef } from '@angular/core';

// Load the implementations that should be tested
import { NgxFileRequiredDirective } from '../lib/ngx-file-required.directive';
import RequiredTestComponent from './required-test.component';

let fixture: ComponentFixture<RequiredTestComponent>;
let componentInstance: RequiredTestComponent;
let inputElement: HTMLElement;

describe('NGX-FILE-REQUIRED directive', () => {

  describe('properties', () => {

    it('should create an instance', () => {
      const elementRef: ElementRef              = new ElementRef(document.createElement('input'));
      const directive: NgxFileRequiredDirective = new NgxFileRequiredDirective(elementRef);

      expect(directive).toBeTruthy();
    });

    it('should have "required" property with false boolean value by default', () => {
      const elementRef: ElementRef              = new ElementRef(document.createElement('input'));
      const directive: NgxFileRequiredDirective = new NgxFileRequiredDirective(elementRef);

      expect(directive.required).toBe(false);
    });

    it('should have "requiredErrorMsg" property with string value "File is required" by default', () => {
      const elementRef: ElementRef              = new ElementRef(document.createElement('input'));
      const directive: NgxFileRequiredDirective = new NgxFileRequiredDirective(elementRef);

      expect(directive.requiredErrorMsg).toBe('File is required');
    });

    it('should have "multiple" property with false boolean value by default', () => {
      const elementRef: ElementRef              = new ElementRef(document.createElement('input'));
      const directive: NgxFileRequiredDirective = new NgxFileRequiredDirective(elementRef);

      expect(directive.multiple).toBe(false);
    });

  });

  describe('methods', () => {

    it('should have void ngOnInit method', () => {
      const elementRef: ElementRef = new ElementRef(document.createElement('input'));
      const directive: NgxFileRequiredDirective = new NgxFileRequiredDirective(elementRef);

      expect(directive.ngOnInit).toBeDefined();
      expect(typeof directive.ngOnInit).toBe('function');

      spyOn(directive, 'ngOnInit');
      const result = directive.ngOnInit();

      expect(result).toBeUndefined();
      expect(directive.ngOnInit).toHaveBeenCalled();
      expect(directive.ngOnInit).toHaveBeenCalledTimes(1);
      expect(directive.ngOnInit).toHaveBeenCalledWith();
    });

    it('should have validate method which is void by default', () => {
      const elementRef: ElementRef = new ElementRef(document.createElement('input'));
      const directive: NgxFileRequiredDirective = new NgxFileRequiredDirective(elementRef);

      expect(directive.validate).toBeDefined();
      expect(typeof directive.validate).toBe('function');

      spyOn(directive, 'validate');
      const formControl: FormControl = new FormControl();
      const result: ValidationErrors = directive.validate(formControl);

      expect(result).toBeUndefined();
      expect(directive.validate).toHaveBeenCalledTimes(1);
    });

    it('should have validate method which can return an error', () => {
      const elementRef: ElementRef              = new ElementRef(document.createElement('input'));
      const directive: NgxFileRequiredDirective = new NgxFileRequiredDirective(elementRef);
      directive.required                        = true;

      const formControl: FormControl         = new FormControl();
      const result: ValidationErrors         = directive.validate(formControl);
      const expectedResult: ValidationErrors = {required: 'File is required'};

      expect(result).toEqual(expectedResult);
    });

  });

  describe('form', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ FormsModule ],
        declarations: [
          RequiredTestComponent,
          NgxFileRequiredDirective
        ]
      });
    });

    it('should detect correct layout of input with "required" attribute', async (done: Function) => {

      try {
        fixture = TestBed.overrideComponent(RequiredTestComponent, {
          set: {
            template: `
              <form>
                  <input
                    type="file"
                    name="test"
                    required
                    [(ngModel)]="model"
                  />
              </form>
            `
          }
        }).createComponent(RequiredTestComponent);

        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        inputElement = fixture.debugElement.nativeElement.querySelector('input');

        expect(inputElement.classList.contains('ng-untouched')).toBe(true);
        expect(inputElement.classList.contains('ng-pristine')).toBe(true);
        expect(inputElement.classList.contains('ng-invalid')).toBe(true);

        done();
      } catch (err) {
        console.error(err.message);
        throw err;
      }

    });

    it('should detect correct layout of input with required="required" attribute', async (done: Function) => {

      try {
        fixture = TestBed.overrideComponent(RequiredTestComponent, {
          set: {
            template: `
              <form>
                  <input type="file" name="test" required="required" [(ngModel)]="model" />
              </form>
            `
          }
        }).createComponent(RequiredTestComponent);

        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        inputElement = inputElement = fixture.debugElement.nativeElement.querySelector('input');

        expect(inputElement.classList.contains('ng-untouched')).toBe(true);
        expect(inputElement.classList.contains('ng-pristine')).toBe(true);
        expect(inputElement.classList.contains('ng-invalid')).toBe(true);

        done();
      } catch (err) {
        console.error(err.message);
        throw err;
      }

    });

    it('should detect correct layout of input without required attribute', async (done: Function) => {

      try {
        fixture = TestBed.overrideComponent(RequiredTestComponent, {
          set: {
            template: `
              <form>
                  <input type="file" name="test" [(ngModel)]="model" />
              </form>
            `
          }
        }).createComponent(RequiredTestComponent);

        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        inputElement = fixture.debugElement.nativeElement.querySelector('input');

        expect(inputElement.classList.contains('ng-untouched')).toBe(true);
        expect(inputElement.classList.contains('ng-pristine')).toBe(true);
        expect(inputElement.classList.contains('ng-valid')).toBe(true);

        done();
      } catch (err) {
        console.error(err.message);
        throw err;
      }

    });

    it('should detect correct layout of input with truthy required attribute condition', async (done: Function) => {

      try {
        fixture = TestBed.overrideComponent(RequiredTestComponent, {
          set: {
            template: `
              <form>
                  <input type="file" name="test" [attr.required]="true ? 'required' : null" [(ngModel)]="model" />
              </form>
            `
          }
        }).createComponent(RequiredTestComponent);

        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        inputElement = fixture.debugElement.nativeElement.querySelector('input');

        expect(inputElement.classList.contains('ng-untouched')).toBe(true);
        expect(inputElement.classList.contains('ng-pristine')).toBe(true);
        expect(inputElement.classList.contains('ng-invalid')).toBe(true);

        done();
      } catch (err) {
        console.error(err.message);
        throw err;
      }

    });

    it('should detect correct layout of input with falsy required attribute condition', async (done: Function) => {

      try {
        fixture = TestBed.overrideComponent(RequiredTestComponent, {
          set: {
            template: `
              <form>
                  <input type="file" name="test" [attr.required]="condition ? 'required' : null" [(ngModel)]="model" />
              </form>
            `
          }
        }).createComponent(RequiredTestComponent);

        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        inputElement = fixture.debugElement.nativeElement.querySelector('input');

        expect(inputElement.classList.contains('ng-untouched')).toBe(true);
        expect(inputElement.classList.contains('ng-pristine')).toBe(true);
        expect(inputElement.classList.contains('ng-valid')).toBe(true);

        done();
      } catch (err) {
        console.error(err.message);
        throw err;
      }

    });

    describe('"multiple" attribute', () => {

      it('should detect correct values of "multiple" property with "multiple" attribute', async (done: Function) => {

        try {
          fixture = TestBed.overrideComponent(RequiredTestComponent, {
            set: {
              template: `
                <form>
                    <input
                      type="file"
                      name="test"
                      multiple
                      required
                      [(ngModel)]="model"
                      #ngxfrd="ngxFileRequiredDirective"
                    />
                </form>
              `
            }
          }).createComponent(RequiredTestComponent);

          fixture.detectChanges();
          await fixture.whenStable();
          fixture.detectChanges();

          componentInstance = fixture.componentInstance;
          expect(componentInstance.ngxfrd.multiple).toBe(true);

          done();
        } catch (err) {
          console.error(err.message);
          done(err);
        }

      });

      it('should detect correct values of "multiple" property with multiple="multiple" attribute', async (done: Function) => {

        try {
          fixture = TestBed.overrideComponent(RequiredTestComponent, {
            set: {
              template: `
              <form>
                  <input
                    type="file"
                    name="test"
                    multiple="multiple"
                    required
                    [(ngModel)]="model"
                    #ngxfrd="ngxFileRequiredDirective"
                  />
              </form>
            `
            }
          }).createComponent(RequiredTestComponent);

          fixture.detectChanges();
          await fixture.whenStable();
          fixture.detectChanges();

          componentInstance = fixture.componentInstance;
          expect(componentInstance.ngxfrd.multiple).toBe(true);

          done();
        } catch (err) {
          console.error(err.message);
          throw err;
        }

      });

      it('should detect correct correct values of "multiple" property with [multiple]="false" attribute', async (done: Function) => {

        try {
          fixture = TestBed.overrideComponent(RequiredTestComponent, {
            set: {
              template: `
                <form>
                    <input
                      type="file"
                      name="test"
                      [multiple]="false"
                      required
                      [(ngModel)]="model"
                      #ngxfrd="ngxFileRequiredDirective"
                    />
                </form>
              `
            }
          }).createComponent(RequiredTestComponent);

          fixture.detectChanges();
          await fixture.whenStable();
          fixture.detectChanges();

          componentInstance = fixture.componentInstance;
          expect(componentInstance.ngxfrd.multiple).toBe(false);

          done();
        } catch (err) {
          console.error(err.message);
          done(err);
        }

      });

    });

  });

});
