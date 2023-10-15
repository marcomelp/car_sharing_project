import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Address } from 'src/app/model/address';
import { Payment } from 'src/app/model/payment';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-user-reg',
  templateUrl: './user-reg.component.html',
  styleUrls: ['./user-reg.component.css']
})
export class UserRegComponent{

  // attributi
  @Input() isVisible: boolean = false;
  @Input() users: User[] | undefined;
  @Output() leave = new EventEmitter();
  @Output() register = new EventEmitter();
  @Input() userr: User | undefined;
  @Input() payment: Payment | undefined;
  @Input() address: Address | undefined;
  serverError: any;
  duplicate: any;
  @Input() licenseImage: any;
  customer: any;
  confirmPassword: string = '';

  //costruttore
  constructor(private userService: UserService) { }

  //metodo per chiudere il form di registrazione nuovo utente al tasto "abbandona"
  leaveUserRegForm(form: NgForm): void {
    form.reset(); //pulisce il form
    //qui ci dobbiamo inserire l'immagine standard di patente
    this.licenseImage = undefined;
    this.userr = undefined;
    this.leave.emit();
  }

  formManager(form: NgForm): void {
    if (!this.userr) //se l'utente non c'è
      this.createUser(form); //usa metodo per creare
    else //se c'è
      this.updateUser(form); 
  }

  createUser(form: NgForm): void {
    let image = this.licenseImage ? this.licenseImage : null;
    let address: Address = {
      street: form.value["via"],
      civic: form.value["civico"],
      cap: form.value["cap"],
      town: form.value["comune"],
      province: form.value["provincia"]
    }

    let payment: Payment = {
      type: form.value["tipoCarta"],
      cardNumber: form.value["numeroCarta"],
      holder: form.value["titolare"],
      expiration: form.value["scadenza"]
    }

    
    let user: User = {
      name: form.value["nome"],
      lastname: form.value["cognome"],
      taxCode: form.value["codiceFiscale"],
      licenseNumber: form.value["numeroPatente"],
      mail: form.value["email"],
      password: form.value["password"],
      address: address, //passo alla variabile address l'oggetto address appena creato e compilato
      payment: payment,
      licenseImage : image
    }
    this.userService.userRegistration(user)
      .subscribe({
        next: response => {
          if (response.code == 201) {
            form.reset();
            this.licenseImage = undefined;
            this.serverError = undefined;
            this.duplicate = undefined;
            this.register.emit();
          }
        },
        error: e => {
          if (e.status == 406)
            this.duplicate = "E-mail già in uso";
          else
            console.log(e);
        }
      })
  }

  updateUser(form: NgForm): void {
    if (this.userr && this.userr.address && this.userr.payment) {
      let image = this.licenseImage ? this.licenseImage : null;
      // Aggiorna i campi utente
      this.userr.name = form.value["nome"];
      this.userr.lastname = form.value["cognome"];
      this.userr.taxCode = form.value["codiceFiscale"];
      this.userr.licenseNumber = form.value["numeroPatente"];
      this.userr.mail = form.value["email"];
      this.userr.password = form.value["password"];
      this.userr.licenseImage = image;

      // Aggiorna l'indirizzo (address)
      this.userr.address.street = form.value["via"];
      this.userr.address.civic = form.value["civico"];
      this.userr.address.cap = form.value["cap"];
      this.userr.address.town = form.value["comune"];
      this.userr.address.province = form.value["provincia"];

      // Aggiorna il pagamento (payment)
      this.userr.payment.type = form.value["tipoCarta"];
      this.userr.payment.cardNumber = form.value["numeroCarta"];
      this.userr.payment.holder = form.value["titolare"];
      this.userr.payment.expiration = form.value["scadenza"];

      // Chiamata al servizio per l'aggiornamento
      this.userService.userDataUpdate(this.userr)
        .subscribe({
          next: response => {
            if (response.code == 202) {
              form.reset();
              this.licenseImage = undefined;
              this.userr = undefined;
              this.leave.emit();
            }
          },
          error: e => console.log(e.message)
        });
    }
  }

  //METODO PER GESTIRE UPLOAD IMMAGINE PATENTE
  uploadLicenseImage(event:any): void
  {
    let file: File =event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.licenseImage = reader.result as string;
      event.target.value = "";
    }
  }

  checkRegexp(valore: string, regexp: string) {
    const regex = new RegExp(regexp);
    return regex.test(valore);
  }

}


