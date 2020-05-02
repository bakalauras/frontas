import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { JwtService } from '../jwt.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  logged = false;

  constructor(private breakpointObserver: BreakpointObserver, public service: JwtService) {
    if(!this.service.isTokenExpired)
      this.logged = true;
  }


  logout()
  {
    this.service.logout();
  }
}
