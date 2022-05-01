import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ContactsService} from "../contacts.service";

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.scss']
})
export class ContactItemComponent {
  @Input() title!: string
  @Input() value!: string
  @Input() id!: number
  @Input() contactId!: number
  @Output() setEnable: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(public contactsService: ContactsService) { }

  deleteInfo() {
    this.contactsService.deleteContactInfo(this.contactId, this.id)
    this.setEnable.emit(false)
  }
}
