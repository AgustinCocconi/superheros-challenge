import { Component, WritableSignal } from '@angular/core';
import { MarvelService } from '../../core/services/marvel.service';
import { Router } from '@angular/router';
import { Hero } from '../../core/models/hero.model';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class HomePage {
  heroes: WritableSignal<Hero[]> = this.marvelService.heroesSignal;

  constructor(private marvelService: MarvelService, private router: Router) { }

  ngOnInit() {
    this.marvelService.getHeroes();
  }

  viewHeroDetails(id: number) {
    this.router.navigate(['/hero', id]);
  }
}
