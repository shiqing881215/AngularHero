import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';   // for http call 
import { catchError, map, tap } from 'rxjs/operators';  // for other operation
import { MessageService } from './message.service';   // import MessageService

import { HttpClient, HttpHeaders } from '@angular/common/http';  // the in-memory http request

// constant defined outside class
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';   // this is the url to web api

  // pass in a MessageService instance
  constructor(
    private http : HttpClient,
    private messageService : MessageService) { }

  // we need to make it async since we don't want the caller to wait
  // here we make use of rx-js 
  getHeroes() : Observable<Hero[]> {
    // send the message to MessageService
    // move to tap method below after using Http call
    // this.messageService.add('HeroService: fetched heroes');
    
    //Used to be this way when use mock service
    //return of(HEROES);

    // All HttpClient methods return an RxJS Observable of something
    // By default, it returns JSON, by applying <Hero[]>, it transform
    // into typed result object
    // use pipe and catchError to handle error case when talking to remote server
    // The catchError() operator intercepts an Observable that failed
    // the parameter passed to catchError() should be a function that handling the error
    // tap method just look at the observable and pass to something eles without
    // changing anything in the original value
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log('HTTP REQUEST : fetched heroes')),
        catchError(this.handleError('getHeroes',[]))
      );
  }

  getHero(id : number) : Observable<Hero> {
    // used to be this before moving to Http call
    // this.messageService.add(`HeroService: fetched hero id=${id}`)
    // return of(HEROES.find(hero => hero.id === id));

    // construct the url first
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`HTTP REQUEST : fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  // 3 params for put : url / object to update / options
  // note since we use the in-memory stimulate service
  // if you don't clear the memory, you can see these update
  // but if you refresh the browser, these change will be gone
  updateHero(hero : Hero) : Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new hero to the server */
  // The return Observable<Hero> should have the id
  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  private log(message : string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
