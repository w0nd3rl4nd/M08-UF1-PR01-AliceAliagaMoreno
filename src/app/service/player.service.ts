import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private dummyPlayers = [
    {
      id: 1,
      first_name: 'LeBron',
      last_name: 'James',
      height_feet: 6,
      height_inches: 9,
      weight_pounds: 250,
      position: 'F',
      team: { full_name: 'Los Angeles Lakers' }
    },
    {
      id: 2,
      first_name: 'Stephen',
      last_name: 'Curry',
      height_feet: 6,
      height_inches: 2,
      weight_pounds: 185,
      position: 'G',
      team: { full_name: 'Golden State Warriors' }
    }
  ];

  getPlayers(): Observable<any> {
    return of({ data: this.dummyPlayers });
  }

  getPlayerById(id: number): Observable<any> {
    const player = this.dummyPlayers.find(p => p.id === id);
    return of(player);
  }
}