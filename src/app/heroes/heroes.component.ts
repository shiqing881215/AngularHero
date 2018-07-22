import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero'; 
// import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';  // declare to import HeroService class

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

// export so others can use it  
export class HeroesComponent implements OnInit {
  heroes : Hero[];
  // selectedHero : Hero;  // tell this selectedHero type is Hero class

  // Pass a HeroService instance, DI will do this for you automatically
  constructor(private heroService : HeroService) { }

  ngOnInit() {
    // Initialize the heroes
    this.getHeroes();
  }

  /*
  onSelect(hero : Hero) : void {
    this.selectedHero = hero;
  }
  */

  getHeroes() : void {
    // since right now the getHeroes() from heroService is async
    // we need to provide a callback (the function inside of subscribe)
    // this waits for the Observable (what heroService.getHeroes() returns) to emit the array of heroes
    // subscribe passes the emitted array to the callback
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }
}
