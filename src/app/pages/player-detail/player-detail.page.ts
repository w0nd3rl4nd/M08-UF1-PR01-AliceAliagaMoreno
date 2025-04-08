import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from 'src/app/service/player.service';
import { Platform } from '@ionic/angular';

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
    private router: Router,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.playerId = +this.route.snapshot.paramMap.get('id')!;
    this.playerService.getPlayerById(this.playerId).subscribe(res => {
      this.player = res;
    });

    this.platform.backButton.subscribeWithPriority(10, () => {
      if (this.router.url === `/player-detail/${this.playerId}`) {
        this.router.navigate(['/players']);
      }
    });
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
}