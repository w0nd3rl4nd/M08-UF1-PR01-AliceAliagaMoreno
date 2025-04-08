import { Injectable } from '@angular/core';
import { BalldontlieAPI } from '@balldontlie/sdk';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private api: BalldontlieAPI;

  constructor() {
    this.api = new BalldontlieAPI({ apiKey: '8a05334c-84fa-4be2-af08-3bbb0a216f38' });
  }

  getPlayers(): Observable<any> {
    return from(this.api.nba.getPlayers({}));
  }

  getPlayerById(id: number): Observable<any> {
    return from(this.api.nba.getPlayer(id));
  }
}