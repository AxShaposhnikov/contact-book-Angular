import {Component, Input, OnInit} from '@angular/core';
import {Contact, ContactsService} from "../contacts.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit{
  form!: FormGroup
  contact?: Contact
  id?: number
  disabledButton = true

  constructor(
      public contactsService: ContactsService,
      private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      fieldName: new FormControl('', Validators.required),
      fieldValue: new FormControl('', Validators.required)
    })

    this.route.params.subscribe((params: Params) => {
      this.contact = this.contactsService.getById(+params['id'])
      this.id = +params['id']
    })
  }

  submit() {
    this.contactsService.addContactInfo(
        this.form.value.fieldName,
        this.form.value.fieldValue,
        this.contactsService.getById(this.id!)!
    )
    this.form.reset()
    this.disabledButton = false
  }

  takeStepBack() {
    this.disabledButton = true
    this.contactsService.takeStepBack()
  }
}
