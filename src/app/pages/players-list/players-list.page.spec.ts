import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayersListPage } from './players-list.page';

describe('PlayersListPage', () => {
  let component: PlayersListPage;
  let fixture: ComponentFixture<PlayersListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
