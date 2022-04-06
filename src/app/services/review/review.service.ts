import { Injectable } from '@angular/core';

import { CommonService } from '../common/common.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private commonService: CommonService) { }

  verifyReview(appId: string, transactionId: string = '') {
    let url = `review-verify/?a_id=${appId}`
    if (!transactionId) {
      url = url + `&ref=${transactionId}`;
    }
    return this.commonService.putRequest(url, null);
  }

  saveReview(data: any, appId: string, transactionId: string = '') {
    let url = `add-review/?a_id=${appId}`
    if (!transactionId) {
      url = url + `&ref=${transactionId}`;
    }
    return this.commonService.putRequest(url, data);
  }
    
}
