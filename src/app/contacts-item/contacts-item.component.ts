import {Component, Input, OnInit} from '@angular/core';
import {ContactsService} from "../contacts.service";

@Component({
  selector: 'app-contacts-item',
  templateUrl: './contacts-item.component.html',
  styleUrls: ['./contacts-item.component.scss']
})
export class ContactsItemComponent implements OnInit {
  @Input() name?: string
  @Input() id?: number
  constructor(public contactsService: ContactsService) { }

  ngOnInit(): void {
  }

  deleteContact() {
    this.contactsService.deleteContact(this.id!)
  }
}
