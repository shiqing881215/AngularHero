import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';   // for http call 
import { MessageService } from './message.service';   // import MessageService

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  // pass in a MessageService instance
  constructor(private messageService : MessageService) { }

  // we need to make it async since we don't want the caller to wait
  // here we make use of rx-js 
  getHeroes() : Observable<Hero[]> {
    // send the message to MessageService
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

  getHero(id : number) : Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero id=${id}`)
    return of(HEROES.find(hero => hero.id === id));
  }
}
