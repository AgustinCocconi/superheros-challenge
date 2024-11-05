// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButtons, IonBackButton, IonThumbnail, IonSpinner, IonSkeletonText } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [CommonModule, IonContent, IonHeader, IonTitle, IonToolbar, FormsModule, IonList, IonItem, IonLabel, IonButtons, IonBackButton, IonThumbnail, TranslateModule, IonSpinner, IonSkeletonText],
    exports: [CommonModule, IonContent, IonHeader, IonTitle, IonToolbar, FormsModule, IonList, IonItem, IonLabel, IonButtons, IonBackButton, IonThumbnail, TranslateModule, IonSpinner, IonSkeletonText],
})
export class SharedModule { }