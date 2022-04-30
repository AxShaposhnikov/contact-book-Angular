import {Injectable} from "@angular/core";

export interface Info {
    infoTitle: string
    infoValue: string
    id: number
}

export interface Contact {
    name: string
    id: number
    contactInfo: Info[]
}

type flagType = 'added' | 'deleted' | null

export interface Buffer {
    flag: flagType
    contactId: number
    index: number
    info: Info | null
}

@Injectable({providedIn: 'root'})
export class ContactsService {
    stepBackBuffer: Buffer = {
        flag: null,
        contactId: 0,
        index: 0,
        info: null
    }
    contacts: Contact[] = JSON.parse(localStorage.getItem('contacts') || '[]')
    contactId: number = 0

    updateInfo(contacts: Contact[]) {
        localStorage.setItem('contacts', JSON.stringify(contacts))
    }

    changeValuesInStepBackBuffer(flag: flagType, contactsId: number, index: number, info: Info) {
        this.stepBackBuffer.flag = flag
        this.stepBackBuffer.contactId = contactsId
        this.stepBackBuffer.index = index
        this.stepBackBuffer.info = info
    }

    addContact(name: string): void {
        this.contactId++
        this.contacts.unshift({name: name, id: this.contactId, contactInfo: []})
        this.updateInfo(this.contacts)
    }

    deleteContact(id: number): void {
        this.contacts = this.contacts.filter((contact) => contact.id != id)
        if (this.contacts.length == 0) {
            this.contactId = 0
        }
        this.updateInfo(this.contacts)
    }

    addContactInfo(infoName: string, infoValue: string, contact: Contact): void {
        for (let i = 0; i < this.contacts.length; i++){
            if (this.contacts[i].id == contact.id) {
                this.contacts[i].contactInfo.push({
                    infoTitle: infoName,
                    infoValue,
                    id: Math.random()
                })

                this.changeValuesInStepBackBuffer(
                    'added',
                    this.contacts[i].id,
                    this.contacts[i].contactInfo.length - 1,
                    this.contacts[i].contactInfo[this.contacts[i].contactInfo.length - 1]
                )
            }
        }
        this.updateInfo(this.contacts)
    }

    deleteContactInfo(contactId: number, infoId: number): void {
        for (let i = 0; i < this.contacts.length; i++) {
            if (this.contacts[i].id == contactId) {
                for (let j = 0; j < this.contacts[i].contactInfo.length; j++) {
                    if (this.contacts[i].contactInfo[j].id == infoId) {
                      this.changeValuesInStepBackBuffer('deleted', contactId, j, this.contacts[i].contactInfo[j])
                      this.contacts[i].contactInfo.splice(j, 1)
                    }
                }
            }
        }
        this.updateInfo(this.contacts)
    }

    getById(id: number): Contact | undefined {
        return this.contacts.find(c => c.id === id)
    }



    takeStepBack(): void {
        if (this.stepBackBuffer.flag == 'added') {
            this.getById(this.stepBackBuffer.contactId)!.contactInfo?.splice(this.stepBackBuffer.index, 1)
        }

        if (this.stepBackBuffer.flag == 'deleted') {
            this.getById(this.stepBackBuffer.contactId)!.contactInfo?.splice(this.stepBackBuffer.index, 0, this.stepBackBuffer.info!)
        }
        this.updateInfo(this.contacts)
    }
}

