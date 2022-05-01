import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
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
  contact: Contact | undefined
  id: number = 0
  disabledButton = true
  @ViewChild('nameInput') inputRef!: ElementRef;

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
        this.contactsService.getById(this.id)!
    )
    this.form.reset()
    this.disabledButton = false
    this.inputRef.nativeElement.focus()
  }

  takeStepBack() {
    this.disabledButton = true
    this.contactsService.takeStepBack()
  }
}
