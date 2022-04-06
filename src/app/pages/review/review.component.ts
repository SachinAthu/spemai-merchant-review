import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToasterService, ToasterConfig } from 'angular2-toaster';

import { ReviewService } from 'src/app/services/review/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  appId: string = '';
  transactionId: string = '';
  form: FormGroup;
  isInputRateChanged: boolean = false;
  isPageLoading: boolean = false;
  isLoading: boolean = false;
  
  merchantName: string = '';
  productName: string = '';
  currentRating: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private reviewService: ReviewService, private toasterService: ToasterService) {
    this.form = this.fb.group({
      rating: [0, [Validators.required]],
      name: ['', Validators.required],
      gender: ['', [Validators.required]],
      review: ['', [Validators.required]]
    });

  }

  public config: ToasterConfig = new ToasterConfig({
      showCloseButton: true, 
      tapToDismiss: true, 
      timeout: 5
  });

  get rating() {
    return this.form.get('rating');
  }

  get name() {
    return this.form.get('name');
  }

  get gender() {
    return this.form.get('gender');
  }

  get review() {
    return this.form.get('review');
  }

  ngOnInit(): void {
    this.appId = this.route.snapshot.params['appId'];
    this.transactionId = this.route.snapshot.params['transId'];
    console.log(this.appId, this.transactionId)

    this.verifyReview();

  }

  /*
    verify review
  */
  verifyReview() {
    this.isPageLoading = true;

    // verify
    this.reviewService.verifyReview(this.appId, this.transactionId).subscribe({
      next: (res: any) => {
        console.log("verifyReview", res);
        this.isPageLoading = false;

        if (res?.status === 101 || res?.status === 152) {
          // unauthorized or can not find request data
          this.router.navigate(['/unauth']);
        } else {
          this.merchantName = res?.data?.merchant_name;
          this.productName = res?.data?.brand_name;
          this.currentRating = res?.data?.current_rating;
        }

      },
      error: (error: any) => {
        console.log("Error", error);
        this.toasterService.pop('error', 'Error', 'Internal Server Error!');
      }
    });   
  }

  /*
    return error classes for input fields if errors exists
  */
  inputClasses(fieldName: string) {
    let isError: boolean = false;

    switch(fieldName) {
      case 'name':
        if ( (this.name?.invalid && (this.name?.dirty || this.name?.touched)) && this.name?.errors?.['required']) {
          isError = true;
        }
        break;
      case 'gender':
        if ( (this.gender?.invalid && (this.gender?.dirty || this.gender?.touched)) && this.gender?.errors?.['required']) {
          isError = true;
        }
        break;
      case 'review':
        if ( (this.review?.invalid && (this.review?.dirty || this.review?.touched)) && this.review?.errors?.['required']) {
          isError = true;
        }
        break;
      default:
        return
    }

    return { 'input-error': isError };
  }

  /*
    submit review form
  */
  onSubmit() {
    if (this.form.status === 'INVALID') {
      return;
    }
    this.isLoading = true;

    const newReview = {
      rating: this.rating?.value,
      name: this.name?.value,
      gender: this.gender?.value,
      review: this.review?.value
    }

    this.reviewService.saveReview(newReview, this.appId, this.transactionId).subscribe({
      next: (res: any) => {
        // console.log('onSubmit', res);
        this.isLoading = false;
        
        if(res.status === 100) {
          // success
          this.form.reset();
          this.toasterService.pop('success', 'Success', 'Review Submitted.');
          alert('Review Submitted.');
        } else if (res.status === 101){
          // unauthorized
          this.router.navigate(['/unauth']);
        } else {
          // server error
          this.toasterService.pop('error', 'Error', 'Internal Server Error!');
        }
        
      },
      error: (error: any) => {
        this.isLoading = false;
        console.log('Error', error);
        this.toasterService.pop('error', 'Error', 'Internal Server Error!');
      }
    });



  }

}
