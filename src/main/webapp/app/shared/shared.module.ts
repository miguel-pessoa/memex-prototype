import { NgModule } from '@angular/core';

import { SharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { TranslateDirective } from './language/translate.directive';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { DurationPipe } from './date/duration.pipe';
import { FormatMediumDatetimePipe } from './date/format-medium-datetime.pipe';
import { FormatMediumDatePipe } from './date/format-medium-date.pipe';
import { SortByDirective } from './sort/sort-by.directive';
import { SortDirective } from './sort/sort.directive';
import { ItemCountComponent } from './pagination/item-count.component';
import { MemexMaterialModule } from './material.module';
import { ValidInputComponent } from './components/valid-input/valid-input.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MapComponent } from './components/map/map.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { StoriesService } from 'app/home/stories/stories.service';
import { UserProfileService } from 'app/home/stories/user-profile/user-profile.service';
import { GraphInfoDialogComponent } from 'app/home/stories/author-graph/graph-info-dialog/graph-info-dialog.component';

@NgModule({
  imports: [SharedLibsModule, MemexMaterialModule, AgmCoreModule.forRoot({ apiKey: 'AIzaSyD11HNBNysegUw8UtfJi_AxNJ1gX8c38Po' })],
  declarations: [
    FindLanguageFromKeyPipe,
    TranslateDirective,
    AlertComponent,
    AlertErrorComponent,
    HasAnyAuthorityDirective,
    DurationPipe,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
    SortByDirective,
    SortDirective,
    ItemCountComponent,
    ValidInputComponent,
    ConfirmDialogComponent,
    MapComponent,
    GraphInfoDialogComponent,
  ],
  exports: [
    SharedLibsModule,
    FindLanguageFromKeyPipe,
    TranslateDirective,
    AlertComponent,
    AlertErrorComponent,
    HasAnyAuthorityDirective,
    DurationPipe,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
    SortByDirective,
    SortDirective,
    ItemCountComponent,
    MemexMaterialModule,
    ValidInputComponent,
    ConfirmDialogComponent,
    MapComponent,
    GraphInfoDialogComponent,
  ],
  providers: [GoogleMapsAPIWrapper, StoriesService, UserProfileService],
})
export class SharedModule {}
