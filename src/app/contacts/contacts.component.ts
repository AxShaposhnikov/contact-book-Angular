import { Component, OnInit } from '@angular/core';
import {ContactsService} from "../contacts.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  form!: FormGroup
  constructor(public contactsService: ContactsService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      contactName: new FormControl('', Validators.required)
    })
  }

  submit() {
    this.contactsService.addContact(this.form.value.contactName)
    this.form.reset()
  }
}
