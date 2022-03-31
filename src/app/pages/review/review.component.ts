import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  id: string = '';
  form: FormGroup;
  currentRating: number = 3;
  isInputRateChanged: boolean = false;
  isLoading: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
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
    this.id = this.route.snapshot.params['id'];
    // console.log(this.id)


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
      id: this.id,
      rating: this.rating?.value,
      name: this.name?.value,
      gender: this.gender?.value,
      review: this.review?.value
    }

    setTimeout(() => {
      this.isLoading = false;
      console.log(newReview);
      this.form.reset();
    }, 5000);


  }

}
