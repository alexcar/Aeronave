import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Aeronave } from '../interfaces/aeronave';
import { Resultado } from '../interfaces/resultado';
import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/internal/operators';

const apiUrl = 'http://localhost:3653/api/aeronave';

@Injectable({
  providedIn: 'root'
})
export class AeronaveService {

  constructor(private http: HttpClient) { }

  getAeronaves(resultado: Resultado): Observable<any> {
    return this.http.get<Resultado>(apiUrl)
    .pipe(
      retry(3),
      catchError(err => {
        this.handleError2('getAeronaves', err);
        return of({ erro: true});
      })
    );
  }

  addAeronave(aeronave: Aeronave): Observable<any> {
    return this.http.post<Aeronave>(apiUrl, aeronave)
    .pipe(
      retry(3),
      catchError(err => {
        this.handleError2('addAeronaves', err);
        return of({ erro: true});
      })
    );
  }

  updateAeronave(id: number, aeronave: Aeronave): Observable<any> {
    return this.http.put<Aeronave>(apiUrl + '/' + id, aeronave)
    .pipe(
      retry(3),
      catchError(err => {
        this.handleError2('updateAeronaves', err);
        return of({ erro: true});
      })
    );
  }

  deleteAeronave(id: number, aeronave: Aeronave): Observable<any> {
    return this.http.delete<Aeronave>(apiUrl + '/' + id)
    .pipe(
      retry(3),
      catchError(err => {
        this.handleError2('deleteAeronaves', err);
        return of({ erro: true});
      })
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} falhou: ${error.message}`);
      return of(result as T);
    };
  }

  private handleError2(operation = 'operation', error: any) {
    this.log(`${operation} falhou: ${error.message}`);
  }

  private log(message: string) {
    console.log(message);
  }
}
