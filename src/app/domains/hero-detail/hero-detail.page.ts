import { Component, OnInit, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarvelService } from '../../core/services/marvel.service';
import { Hero } from '../../core/models/hero.model';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.page.html',
  styleUrls: ['./hero-detail.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class HeroDetailPage implements OnInit {
  hero: WritableSignal<Hero | null> = this.marvelService.selectedHeroSignal;

  constructor(private route: ActivatedRoute, private marvelService: MarvelService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.marvelService.getHeroById(id);
    } else {
      console.error('Hero ID is null');
    }
  }
}