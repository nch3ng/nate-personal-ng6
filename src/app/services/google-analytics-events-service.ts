import { Router, NavigationEnd } from '@angular/router';
import { Injectable } from '@angular/core';
declare var ga: Function;
@Injectable()
export class GoogleAnalyticsEventsService {
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      try {
        if (typeof ga === 'function') {
          if (event instanceof NavigationEnd) {
            ga('set', 'page', event.urlAfterRedirects);
            ga('send', 'pageview');
            console.log('%%% Google Analytics page view event %%%');
          }
        }
      } catch (e) {
        console.log(e);
      }
    });

  }

  public emitEvent(eventCategory: string,
                   eventAction: string,
                   eventLabel: string = null,
                   eventValue: number = null) {
    ga('send', 'event', { eventCategory, eventLabel, eventAction, eventValue });
  }
}
