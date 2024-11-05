import { Component, signal, WritableSignal } from '@angular/core';
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
  isLoading = signal(true);

  skeletonArray = new Array(10);

  constructor(private marvelService: MarvelService, private router: Router) { }

  ngOnInit() {
    this.marvelService.getHeroes().then(() => {
      this.isLoading.set(false);
    });
  }

  viewHeroDetails(id: number) {
    this.router.navigate(['/hero', id]);
  }

  onImageLoad(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    const heroId = +imgElement.alt;
    const hero = this.heroes().find(h => h.id === heroId);
    if (hero) {
      hero.imageLoaded = true;
    }
  }

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/placeholder.png'; // TODO define a placeholder image
  }
}
