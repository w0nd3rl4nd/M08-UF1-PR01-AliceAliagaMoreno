import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { PlayerService } from 'src/app/service/player.service';
import { Share } from '@capacitor/share';

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

  async sharePlayer(event: Event, player: any) {
    event.stopPropagation();
    try {
      await Share.share({
        title: 'Player Information',
        text:
          `Check out ${player.first_name || 'Unknown '} ${ player.last_name || 'Player' }!\n\n` +
          `Position: ${player.position || 'Unknown'}\n` +
          `Height: ${player.height || 'N/A'}\n` +
          `Weight: ${player.weight || 'N/A'} lbs\n` +
          `Jersey Number: ${player.jersey_number || 'N/A'}\n` +
          `College: ${player.college || 'N/A'}\n` +
          `Country: ${player.country || 'N/A'}\n` +
          `Draft Year: ${player.draft_year || 'N/A'}\n` +
          `Draft Round: ${player.draft_round || 'N/A'}\n` +
          `Draft Pick: ${player.draft_number || 'N/A'}`,
        dialogTitle: 'Share Player Details'
      });
    } catch (error) {
      console.error('Error sharing player:', error);
    }
  }
  
}