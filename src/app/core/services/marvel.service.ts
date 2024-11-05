import { Injectable, signal, WritableSignal } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { Hero } from '../models/hero.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MarvelService {
    private apiUrl = 'https://gateway.marvel.com/v1/public';
    private apiKey = environment.marvel_public_key;

    // Signals for state management
    heroesSignal: WritableSignal<Hero[]> = signal([]);
    selectedHeroSignal: WritableSignal<Hero | null> = signal(null);
    private heroCache: Map<number, Hero> = new Map();

    constructor() { }

    async getHeroes(): Promise<void> {
        // Check if heroesSignal already has data
        if (this.heroesSignal().length > 0) {
            return;
        }

        const response = await CapacitorHttp.request({
            method: 'GET',
            url: `${this.apiUrl}/characters`,
            params: { apikey: this.apiKey }
        });

        if (response.status === 200) {
            const limitedResults = response.data.data.results.slice(0, 20);
            this.heroesSignal.set(limitedResults);
            // Cache the heroes
            limitedResults.forEach((hero: Hero) => this.heroCache.set(hero.id, hero));
        } else {
            console.error('Failed to fetch heroes:', response);
        }
    }

    async getHeroById(id: string): Promise<void> {
        const heroId = +id;
        // Check if the hero is already in the cache
        if (this.heroCache.has(heroId)) {
            this.selectedHeroSignal.set(this.heroCache.get(heroId)!);
            return;
        }

        const response = await CapacitorHttp.request({
            method: 'GET',
            url: `${this.apiUrl}/characters/${id}`,
            params: { apikey: this.apiKey }
        });

        if (response.status === 200) {
            const hero = response.data.data.results[0];
            this.selectedHeroSignal.set(hero);
            // Cache the hero
            this.heroCache.set(hero.id, hero);
        } else {
            console.error('Failed to fetch hero:', response);
        }
    }
}