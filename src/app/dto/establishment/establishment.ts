import { ActivitySet } from './activity-set';
import { AddressSet } from './address-set';
import { AttDetSet } from './att-det-set';
import { ContactSet } from './contact-set';
import { CpersonSet } from './cperson-set';
import { FormEditSet } from './form-edit-set';
import { HeaderSet } from './header-set';
import { IdSet } from './id-set';
import { MSGSet } from './msgset';
import { NotesSet } from './notes-set';
import { OutletSet } from './outlet-set';

export class Establishment extends HeaderSet {
    activitySet = new ActivitySet();
    addressSet = new AddressSet();
    attDetSet = new AttDetSet();
    contactSet = new ContactSet();
    cPersonSet = new CpersonSet();
    formEditSet = new FormEditSet();
    idSet = new Array<IdSet>();
    msgSet = new MSGSet();
    outlet = new OutletSet();
    notesSet = new NotesSet();
}
