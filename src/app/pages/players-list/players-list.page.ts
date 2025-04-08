import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { PlayerService } from 'src/app/service/player.service';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.page.html',
  styleUrls: ['./players-list.page.scss'],
  standalone: false
})
export class PlayersListPage implements OnInit {
  players: any[] = [];

  constructor(private playerService: PlayerService, private router: Router, private platform: Platform) {}

  ngOnInit() {
    this.playerService.getPlayers().subscribe(res => {
      this.players = res.data;
    });

    this.platform.backButton.subscribeWithPriority(10, () => {
      if (this.router.url === '/players') {
        console.log('Back press is disabled on players list page');
      }
    });
  }

  goToDetail(player: any) {
    this.router.navigate(['/player-detail', player.id]);
  }

  takePicture(event: Event, player: any) {
    event.stopPropagation();
    console.log('Taking picture for:', player);
  }

  sharePlayer(event: Event, player: any) {
    event.stopPropagation();
    console.log('Sharing player:', player);
  }
}