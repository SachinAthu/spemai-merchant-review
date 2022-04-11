import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  // success and error modal
  isModalOpen: boolean = false;
  isSuccessModal: boolean = false;
  isClosableModal: boolean = false;
  modalTitle:string = '';
  modalBody:string = '';

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private reviewService: ReviewService) {
    this.form = this.fb.group({
      rating: [0, [Validators.required]],
      name: ['', Validators.required],
      gender: ['', [Validators.required]],
      review: ['', [Validators.required]]
    });

  }


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
    // console.log(this.appId, this.transactionId)

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
        // console.log("verifyReview", res);
        this.isPageLoading = false;

        if (res?.status === 100) {
          this.merchantName = res?.data?.merchant_name;
          this.productName = res?.data?.brand_name;
          this.currentRating = res?.data?.current_rating;

          if(this.transactionId) {
            this.form.get('name')?.setValue(res?.data?.reviewer_name);
          }
        } else {
          this.router.navigate(['/unauth']);
        }

      },
      error: (error: any) => {
        console.log("Error", error);
        this.openModal(false, false, 'ERROR!', 'Internal server error. Please try again!');
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
          this.openModal(true, false, 'SUCCESS!', 'Review was successfully submitted.');
        } else if (res.status === 101){
          // unauthorized
          this.router.navigate(['/unauth']);
        } else {
          // server error
          this.openModal(false, true, 'ERROR!', 'Internal server error. Please try again!');
        }
        
      },
      error: (error: any) => {
        this.isLoading = false;
        console.log('Error', error);
        this.openModal(false, true, 'ERROR!', 'Internal server error. Please try again!');
      }
    });

  }

  openModal(isSuccess: boolean, isClosable: boolean, title: string, body: string) {
    this.isSuccessModal = isSuccess;
    this.isClosableModal = isClosable;
    this.modalTitle = title;
    this.modalBody = body;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

}
