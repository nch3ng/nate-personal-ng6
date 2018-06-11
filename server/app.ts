import * as express from 'express';
import * as bodyParser from 'body-parser';
import logger = require('./helpers/logger');
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as EmailValidator from 'email-validator';
import * as fs from 'fs';
// import { renderModuleFactory } from '@angular/platform-server';
// import 'core-js/es6';
// import 'core-js/es7/reflect';
// import { AppServerModuleNgFactory } from '../dist/src/app/app-server.module.ngfactory';

require('dotenv').config();

class App {
  public app;
  resume;
  leetcode;

  constructor () {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: false}));
    this.app.use(function timeLog (req, res, next) {
      logger.debug('Time: ', Date.now());
      next();
    });

    // this.resume = express.static(path.join(__dirname, 'resume/dist'));
    this.mountRoutes();
  }

  private mountRoutes (): void {
    const DIST_DIR = path.join(__dirname, '..', 'dist', 'nate-personal-ng6');
    const template = fs.readFileSync(path.join(DIST_DIR, 'index.html')).toString();
    // this.app.engine('html', (_, options, callback) => {
    //   const newOptions = { document: template, url: options.req.url };

    //   renderModuleFactory(AppServerModuleNgFactory, newOptions)
    //     .then(html => callback(null, html));
    // });
    const ng_dist = express.static(DIST_DIR);
    this.app.set('views', 'src');
    this.app.set('view engine', 'html');
    this.app.use(ng_dist);

    this.app.post('/api/sendEmail', (req, res, next) => {

      if (!EmailValidator.validate(req.body.email)) {
        res.status(500).json({success: false, message: 'Please enter correct email address.'});
        return;
      }

      if (!req.body.name || req.body.name === '') {
        res.status(500).json({success: false, message: 'Please enter your name.'});
        return;
      }

      if (!req.body.message || req.body.message === '') {
        res.status(500).json({success: false, message: 'Please enter the message.'});
        return;
      }

      const message = `${req.body.message}`;
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(process.env.SENDGRID_APIKEY);
      const msg = {
        to: 'boo0330@gmail.com',
        from: req.body.name + '<' + req.body.email + '>',
        subject: 'Message from NateC Personal Website',
        text: message,
        html: '<strong>' + message + '</strong>'
      };
      sgMail.send(msg);
      res.status(200).json({success: true, message: 'Successfully sent the message!'});
    });
    // this.app.use(['/'], function(req, res, next) {
    //   // Just send the index.html for other files to support HTML5Mode
    //   res.sendFile('/index.html', { root: DIST_DIR });
    // });

    this.app.get('*.*', ng_dist);
    this.app.get('*', (req, res) => {
      res.render('index', { req });
    });
  }
}

export default new App().app;
