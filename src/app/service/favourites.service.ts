import { Injectable, Injector } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { Observable, of, from } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';
import { runInInjectionContext } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
    private injector: Injector
  ) {}

  addFavorite(playerId: number): Observable<void> {
    return this.authService.getUser().pipe(
      take(1),
      switchMap(user => {
        if (!user) throw new Error('User not logged in');
        return runInInjectionContext(this.injector, () => 
          from(this.afs.doc(`users/${user.uid}/favorites/${playerId}`).set({ playerId }))
      )})
    );
  }

  removeFavorite(playerId: number): Observable<void> {
    return this.authService.getUser().pipe(
      take(1),
      switchMap(user => {
        if (!user) throw new Error('User not logged in');
        return runInInjectionContext(this.injector, () => 
          from(this.afs.doc(`users/${user.uid}/favorites/${playerId}`).delete()))
      })
    );
  }

  isFavorite(playerId: number): Observable<boolean> {
    return this.authService.getUser().pipe(
      switchMap(user => {
        if (!user) return of(false);
        return this.afs.doc(`users/${user.uid}/favorites/${playerId}`).valueChanges().pipe(
          map(doc => !!doc)
        );
      })
    );
  }
}