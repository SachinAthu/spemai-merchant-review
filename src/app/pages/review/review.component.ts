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
  inputRating: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      gender: ['', [Validators.required]],
      review: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    // console.log(this.id)


  }

  submit() {
    console.log("submit")
  }

}
