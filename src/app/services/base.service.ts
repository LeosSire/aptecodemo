import { Inject, Injectable, OnDestroy } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { environment } from "src/environments/environment";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";

@AutoUnsubscribe()
@Injectable()
export class BaseService<T> implements OnDestroy {
    urlExtension: string;

    constructor(@Inject(String) public _urlExtension: string, protected http: HttpClient) {
        this.urlExtension = _urlExtension;
    }

    ngOnDestroy(): void {
        // Required for AutoUnsubscribe
    }
    
    post(content: any, headers: HttpHeaders) {
        return this.http.post<T>(`${environment.apiAddress}/${this.urlExtension}`, content, { headers: headers });
    }
}
