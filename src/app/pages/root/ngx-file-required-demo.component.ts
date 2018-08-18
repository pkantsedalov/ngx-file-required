import { Component } from '@angular/core';

@Component({
  selector: 'ngx-file-required-demo',
  styleUrls: ['./ngx-file-required-demo.css'],
  templateUrl: './ngx-file-required-demo.template.html',
})
export class NgxFileRequiredDemoComponent {
  public requiredFile: any;

  public requiredFileWithCustomErrorMessage: any;
  public requiredFileErrorMessage = 'Set the file value!';

  public toggledRequiredFile: any;
  public isRequired = false;
}
