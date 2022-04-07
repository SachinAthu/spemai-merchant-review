import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() isSuccess?: boolean;
  @Input() isClosable?: boolean;
  @Input() title?: string;
  @Input() body?: string;

  @Output() closeModal = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClose() {
    this.closeModal.emit();
  }

}
