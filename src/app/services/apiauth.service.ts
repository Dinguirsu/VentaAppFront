import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Response } from "../Models/response";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Usuario } from "../Models/usuario";
import { map } from 'rxjs/operators';

const httpOption = {
    headers: new HttpHeaders({
      'Contend-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})
  
export class ApiauthService{
    url: string = 'https://localhost:7062/api/User/login';

    private usuarioSubject!: BehaviorSubject<Usuario>;

    public get usuarioData(): Usuario {
        return this.usuarioSubject.value;
    }

    constructor( private _http: HttpClient){
        this.usuarioSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuario') || '{}'));
    }

    login(email : string, password: string): Observable<Response>
    {
        return this._http.post<Response>(this.url, {email, password}, httpOption).pipe(
            map(res => {
                if(res.exito === 1){
                    const usuario: Usuario = res.data;
                    localStorage.setItem('usuario', JSON.stringify(usuario));
                    this.usuarioSubject.next(usuario);
                }
                return res;
            })
        );
    }

    logout()
    {
        localStorage.removeItem('usuario');
        this.usuarioSubject.next(null as any);
    }
}