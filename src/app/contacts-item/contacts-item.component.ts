import {Component, Input} from '@angular/core';
import {ContactsService} from "../contacts.service";

@Component({
  selector: 'app-contacts-item',
  templateUrl: './contacts-item.component.html',
  styleUrls: ['./contacts-item.component.scss']
})
export class ContactsItemComponent {
  @Input() name!: string
  @Input() id!: number
  constructor(public contactsService: ContactsService) { }

  public deleteContact(): void {
    this.contactsService.deleteContact(this.id)
  }
}
