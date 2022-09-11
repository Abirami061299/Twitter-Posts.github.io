import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  authCode = '';
  accesstoken = '';
  clientId = 'bnRxRUlHR29wX29FcGR0a3IxWEQ6MTpjaQ';
  clientSecret = 'Pdu49SmXeo97M4ndoIZjFgrcsFgRml6ekJrNWQqlQSGkFvvfaC';

  constructor(private router: ActivatedRoute, public http: HttpClient) {}

  ngOnInit(): void {
    this.router.queryParams.subscribe((params: Params) => {
      console.log(params);
      this.authCode = params['code'];
    });
  }

  getAccessToken() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic Ym5SeFJVbEhSMjl3WDI5RmNHUjBhM0l4V0VRNk1UcGphUTpQZHU0OVNtWGVvOTdNNG5kb0laakZncmNzRmdSbWw2ZWtKck5XUXFsUVNHa0Z2dmZhQw==',
    });
    let options = { headers: headers };

    this.http
      .post(
        'https://api.twitter.com/2/oauth2/token',
        {
          grant_type: 'authorization_code',
          code: this.authCode,
          client_id: this.clientId,
          client_secret: this.clientSecret,
          redirect_url: 'http://localhost:4200',
          code_verifier: 'challenge',
        },
        options
      )
      .subscribe(
        (res: any) => {
          this.accesstoken = res.access_token;
        },
        (err) => {
          this.accesstoken = err;
        }
      );
  }
}
