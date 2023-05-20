import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { ApiauthService } from "../services/apiauth.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()

export class JwtInterceptor implements HttpInterceptor {

    constructor(private apiauthservice: ApiauthService)
    {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    {
        const usuario = this.apiauthservice.usuarioData;

        if(usuario) 
        {
            request = request.clone({
                setHeaders: 
                {
                    Authorization: `Bearer ${usuario.token}`
                }
            })
        }

        return next.handle(request);

    }

}