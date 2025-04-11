import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from 'src/app/service/player.service';
import { FavoritesService } from 'src/app/service/favourites.service';
import { Platform } from '@ionic/angular';
import { take } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service'; // Add AuthService import

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.page.html',
  styleUrls: ['./player-detail.page.scss'],
  standalone: false
})
export class PlayerDetailPage implements OnInit {
  playerId!: number;
  player: any;
  isFavorite = false;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private favoritesService: FavoritesService,
    private authService: AuthService, // Inject AuthService
    private router: Router,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.playerId = +this.route.snapshot.paramMap.get('id')!;

    // Check if the user is logged in
    this.authService.getUser().pipe(take(1)).subscribe(user => {
      if (!user) {
        console.warn('User not logged in. Redirecting to login...');
        this.router.navigate(['/login']);
      } else {
        this.playerService.getPlayerById(this.playerId).subscribe(res => {
          console.log("User is logged in")
          this.player = res.data;
        });

        this.favoritesService.isFavorite(user.uid, this.playerId).subscribe(isFav => {
          console.log('isFavorite result:', isFav);
          this.isFavorite = isFav;
        });
      }
    });

    this.platform.backButton.subscribeWithPriority(10, () => {
      if (this.router.url === `/player-detail/${this.playerId}`) {
        this.router.navigate(['/players']);
      }
    });
  }

  toggleFavorite() {
    this.authService.getUser().pipe(take(1)).subscribe(user => {
      if (!user) return;
  
      if (this.isFavorite) {
        this.favoritesService.removeFavorite(user.uid, this.playerId)
          .subscribe(() => this.isFavorite = false);
      } else {
        this.favoritesService.addFavorite(user.uid, this.playerId)
          .subscribe(() => this.isFavorite = true);
      }
    });
  }
}
