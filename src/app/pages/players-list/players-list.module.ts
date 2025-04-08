import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayersListPageRoutingModule } from './players-list-routing.module';

import { PlayersListPage } from './players-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayersListPageRoutingModule
  ],
  declarations: [PlayersListPage]
})
export class PlayersListPageModule {}
