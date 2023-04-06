import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app-material/app-material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { ActivePipe } from './pipes/active.pipe';
import { GenderPipe } from './pipes/gender.pipe';

@NgModule({
  declarations: [ErrorDialogComponent, ActivePipe, GenderPipe],
  imports: [AppMaterialModule, CommonModule],
  exports: [ErrorDialogComponent, ActivePipe, GenderPipe],
})
export class SharedModule {}
