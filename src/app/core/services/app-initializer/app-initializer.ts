import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

//Export this entire function, which when run will return a function that refreshes the auth token,
// then returns true or false based on whether the refresh suceeded.
// Example of how angular will use it:
//     let appInitializerFunction = initializeAppFactory(someInstanceofAuthService);
//     appInitializerFunction();
export function initializeAppFactory(auth: AuthService): () => Observable<any> {
  return () =>
    auth
      .refreshAccessToken() //refresh the token
      .pipe(
        map(() => {
          //if the refresh succeeded, we're logged in!
          return of(true);
        })
      )
      .pipe(
        catchError(() => {
          //if the refresh failed, we're not logged in
          //we specifically return "false" instead of throwing because
          // not being logged in is not an error condition!
          return of(false);
        })
      );
}
