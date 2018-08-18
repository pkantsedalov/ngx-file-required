# ngx-file-required

[![Build Status](https://travis-ci.org/pkantsedalov/ngx-file-required.svg?branch=master)](https://travis-ci.org/pkantsedalov/ngx-file-required)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Todo](#todo)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Description

Angular validation directive for setting and checking `<input type="file" />` value to be required.

Works both with one & multiple files mode.

[Demo](https://pkantsedalov.github.io/ngx-file-required/)

## Installation
`npm install ngx-file-required --save`

or via yarn

`yarn add ngx-file-required -S` (shortcut)

## Usage

Import the module

```typescript
    import { NgModule } from '@angular/core';
    import { NgxFileRequiredModule } from 'ngx-file-required';

    @NgModule({
      // other settings
      imports: [
        // other imports
        NgxFileRequiredModule,
      ]
    })
```

Then use the directive

For dynamic attributes explanation see [this stackoverflow example](https://stackoverflow.com/a/36745752/2385788).

```html
    <!-- 
        1. Make it required by default.
        2. The error message is a default one: 'File is required' 
    -->
    <input
      type="file"
      [(ngModel)]="myFile"
      required="required"
    />
    
    <!-- 
        1. Make it required dynamically.
        2. The error message is a default one: 'File is reqiured'
    -->
    <input
      type="file"
      [(ngModel)]="myFile"
      [attr.required]="{{condition}}"
    />
    
    <!-- 
        1. Make it required by default.
        2. The error message is customized to 'There should be a file' 
    -->
    <input 
      type="file" 
      [(ngModel)]="myFile"
      required="required"
      [requiredErrorMsg]="'There should be a file'" 
    />

    <!--
        1. Make it required by default.
        2. The error message is customized dynamically
    -->
    <input
      type="file"
      required="required"
      [requiredErrorMsg]="customErrorMessage"
    />
```

## Todo
1. Development guide
