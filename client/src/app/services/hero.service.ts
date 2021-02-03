import { Gato } from '../interfaces/gato';
import { Injectable } from '@angular/core';
import { HEROES } from '../mock-heroes';
import { MessageService } from './message.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private urlHeroes: string;
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  constructor(
              private messageService: MessageService,
              private http: HttpClient,

              ) {
                this.urlHeroes = 'http://localhost:5000/api';
              }

  //Traer la información desde el servidor
  getHeroesServidor(): Observable<Gato[]> {
    return this.http.get<Gato[]>(this.urlHeroes+'/heroes')
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Gato[]>('getHeroes', []))
      );
  }

  getHeroServidorId(id: number): Observable<Gato> {
    const url = `${this.urlHeroes}/heroes/${id}`;
    return this.http.get<Gato>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Gato>(`getHero id=${id}`))
    );
  }

  //Traer la información desde el mock-heroes (YA NO SE USA)

  getHeroes(): Observable<Gato[]> {
    this.messageService.add('Servicio de heroes: traer heroes');
    return of(HEROES);
  }
  getHero(id: number): Observable<Gato> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }


  private handleError<T>(operation = 'operation', result?: T) {
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
