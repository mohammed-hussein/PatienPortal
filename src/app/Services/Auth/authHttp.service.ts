import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions, RequestOptionsArgs, RequestMethod, Response } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
// import 'rxjs/add/operator/catch';

import { AuthConfigConsts } from '../const.model';
import { LoggerService, LoadingService } from '../../SharedServices/index';
import { SessionHandlerService } from '../../Services/index';

export interface IAuthConfig {
  globalHeaders: Array<Object>;
  headerName: string;
  headerPrefix: string;
  noJwtError: boolean;
  noTokenScheme?: boolean;
  tokenGetter: () => string | Promise<string>;
  tokenName: string;
}

// export class AuthConfigConsts {
//     public static DEFAULT_TOKEN_NAME = 'auth_key';
//     public static DEFAULT_HEADER_NAME = 'Authorization';
//     public static HEADER_PREFIX_BEARER = 'Bearer ';
// }

const AuthConfigDefaults: IAuthConfig = {
  headerName: AuthConfigConsts.DEFAULT_HEADER_NAME,
  headerPrefix: AuthConfigConsts.HEADER_PREFIX_BEARER,
  tokenName: AuthConfigConsts.DEFAULT_TOKEN_NAME,
  tokenGetter: () => sessionStorage.getItem(AuthConfigDefaults.tokenName) as string,
  noJwtError: false,
  globalHeaders: [],
  // globalHeaders: [],
  noTokenScheme: false
};

// export function tokenNotExpired(tokenName = AuthConfigConsts.DEFAULT_TOKEN_NAME, jwt?: string): boolean {

//   const token: string = localStorage.getItem(tokenName);

//   return token != null;
// }

@Injectable()
export class AuthHttp {

  private config = AuthConfigDefaults;
  // public tokenStream: Observable<string>;

  globalHeaders: Array<Object>;

  constructor(private _userSession: SessionHandlerService, private _Logger: LoggerService, private _Loading: LoadingService,
    private router: Router, private http: Http, private defOpts?: RequestOptions) { }

  private mergeOptions(providedOpts: RequestOptionsArgs, defaultOpts?: RequestOptions) {
    let newOptions = defaultOpts || new RequestOptions();
    if (this.config.globalHeaders) {
      this.setGlobalHeaders(this.config.globalHeaders, providedOpts);
    }

    newOptions = newOptions.merge(new RequestOptions(providedOpts));

    return newOptions;
  }

  private requestHelper(requestArgs: RequestOptionsArgs, additionalOptions?: RequestOptionsArgs): Observable<Response> {
    let options = new RequestOptions(requestArgs);
    if (additionalOptions) {
      options = options.merge(additionalOptions);
    }
    return this.request(new Request(this.mergeOptions(options, this.defOpts)));
  }

  private requestWithToken(req: Request, token: string): Observable<Response> {
    if (! this._userSession.tokenNotExpired(undefined, token)) {
      if (!this.config.noJwtError) {
        return new Observable<Response>((obs: any) => {
          obs.error('No Token present or has expired');
        });
      }
    } else {
      req.headers.set(this.config.headerName, this.config.headerPrefix + token);
    }

    return this.http.request(req);
  }

  public setGlobalHeaders(headers: Array<Object>, request: RequestOptionsArgs) {
    if (!request.headers) {
      request.headers = new Headers();
    }
    headers.forEach((header: Object) => {
      let key: string = Object.keys(header)[0];
      let headerValue: string = (header as any)[key];
      (request.headers as Headers).set(key, headerValue);
    });
  }

  public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    if (typeof url === 'string') {
      return this.get(url, options); // Recursion: transform url from String to Request
    }
    // else if ( ! url instanceof Request ) {
    //   throw new Error('First argument must be a url string or Request instance.');
    // }

    // from this point url is always an instance of Request;
    let req: Request = url as Request;
    let token: string | Promise<string> = this.config.tokenGetter();
    if (token instanceof Promise) {
      return Observable.fromPromise(token).mergeMap((jwtToken: string) => this.requestWithToken(req, jwtToken));
    } else {
      return this.requestWithToken(req, token);
    }
  }

  public SetLanguage(lang: string) {
    let obj = { 'Accept-Language': lang };
    if (!this.config.globalHeaders.find(x => this.findLanguage(x, lang))) {
      this.config.globalHeaders.push(obj);
    }
  }

  findLanguage(item: any, value: any) {
    if (item['Accept-Language'] !== undefined) {
      item['Accept-Language'] = value;
      return true;
    }
    return false;
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    // this._Logger.debug('inside authHttp');
    this._Loading.start();
    return this.requestHelper({ body: '', method: RequestMethod.Get, url: url }, options)
      .map(res => {
        this._Loading.done();
        return res;
      })
      .catch(e => {
        this._Loading.done();
        if (e.status === 401) {
          // this.clearUserSession();
          this._userSession.clearUserSession();
        } else {
          return Observable.throw(e);
        }
        // do any other checking for statuses here
      });
    // return Observable.fromPromise(token).mergeMap((jwtToken: string) => this.requestWithToken(req, jwtToken));
  }

  public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.requestHelper({ body: body, method: RequestMethod.Post, url: url }, options);
  }

  public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.requestHelper({ body: body, method: RequestMethod.Put, url: url }, options);
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.requestHelper({ body: '', method: RequestMethod.Delete, url: url }, options);
  }

  public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.requestHelper({ body: body, method: RequestMethod.Patch, url: url }, options);
  }

  public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.requestHelper({ body: '', method: RequestMethod.Head, url: url }, options);
  }

  public options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.requestHelper({ body: '', method: RequestMethod.Options, url: url }, options);
  }

}
