import { Injectable } from '@angular/core';

// Définition de l'interface Cocktail
export interface Cocktail {
  nom: string;
  prix: number;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class CocktailService {
  private cocktails: Cocktail[] = [
    { nom: 'Mojito', prix: 8.5, image: 'data:image/jpeg;base64,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' },
    { nom: 'Martini', prix: 10, image: 'data:image/jpeg;base64,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' },
    { nom: 'Margarita', prix: 9, image: 'data:image/jpeg;base64,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' },
  ];

  // Méthode retournant l'ensemble des cocktails
  getCocktails(): Cocktail[] {
    return this.cocktails;
  }
}