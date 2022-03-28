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
  form1: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.form1 = this.fb.group({
      rating: [''],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    // console.log(this.id)


  }

}
