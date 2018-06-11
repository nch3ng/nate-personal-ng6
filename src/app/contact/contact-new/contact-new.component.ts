import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-new',
  templateUrl: './contact-new.component.html',
  styleUrls: ['./contact-new.component.scss']
})
export class ContactNewComponent implements OnInit {
  message;
  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
    this. message = {};
  }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {

    const body = this.message;
    this.httpClient.post('/api/sendEmail', body).subscribe(
      (response) => {
        // Response = { success: boolean, message: text}
        if (response['success'] === true) {
          swal({
            title: 'Thanks You!',
            text: 'Thanks for Contacting me! I will contact you shortly!',
            type: 'success',
            timer: 8000,
            onClose: () => {
              this.router.navigate(['/contact']);
            }
          });
        }
      },
      (err) => {

      }
    );
  }

}
