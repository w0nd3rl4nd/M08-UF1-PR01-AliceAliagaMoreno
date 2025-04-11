import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from 'src/app/service/player.service';
import { FavoritesService } from 'src/app/service/favourites.service';
import { Platform } from '@ionic/angular';
import { take } from 'rxjs';

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
    private router: Router,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.playerId = +this.route.snapshot.paramMap.get('id')!;
    this.playerService.getPlayerById(this.playerId).subscribe(res => {
      this.player = res.data;
    });

    this.favoritesService.isFavorite(this.playerId).subscribe(isFav => {
      this.isFavorite = isFav;
    });

    this.platform.backButton.subscribeWithPriority(10, () => {
      if (this.router.url === `/player-detail/${this.playerId}`) {
        this.router.navigate(['/players']);
      }
    });
  }

  toggleFavorite() {
    if (this.isFavorite) {
      this.favoritesService.removeFavorite(this.playerId)
        .pipe(take(1))
        .subscribe({
          next: () => this.isFavorite = false,
          error: console.error
        });
    } else {
      this.favoritesService.addFavorite(this.playerId)
        .pipe(take(1))
        .subscribe({
          next: () => this.isFavorite = true,
          error: console.error
        });
    }
  }
}