/**
 * @license
 * Copyright stbui Inc. All Rights Reserved.
 */
import { Report } from './report';

declare var window;

export class HttpInterceptorHandler {
  constructor() {}

  listener() {
    this.handle();
  }

  handle() {
    let open = window.XMLHttpRequest.prototype.open,
      send = window.XMLHttpRequest.prototype.send;
    let self = this;

    window.XMLHttpRequest.prototype.open = function(
      method,
      url,
      async,
      user,
      password
    ) {
      self.send({
        type: 'xhr',
        url: self.joinUrl(url),
        method,
        status: 200
      });
      // send
      return open.apply(this, arguments);
    };

    window.XMLHttpRequest.prototype.send = function(data) {
      // send
      return send.apply(this, arguments);
    };
  }

  send(config) {
    console.log('xhr: ', config);
    const report = new Report();
    report.push(config);
  }

  joinUrl(url) {
    let regular = /^http|https/g;
    if (regular.test(url)) {
      return url;
    } else {
      return window.location.origin + url;
    }
  }
}
