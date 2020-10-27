import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CrudOperations } from './crud-operations.interface';

export abstract class CrudService<T, ID> implements CrudOperations<T, ID> {

  private baseURL = 'http://localhost:3000';

  constructor(
    protected http: HttpClient,
    protected base: string
  ) {}

  save(t: T): Observable<T> {
    return this.http.post<T>(this.baseURL + this.base, t);
  }

  update(id: ID, t: T): Observable<T> {
    return this.http.patch<T>(this.baseURL + this.base + '/' + id, t, {});
  }

  findOne(id: ID): Observable<T> {
    return this.http.get<T>(this.baseURL + this.base + '/' + id);
  }

  findAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseURL + this.base);
  }

  delete(id: ID): Observable<T> {
    return this.http.delete<T>(this.baseURL + this.base + '/' + id);
  }
}
