import { Component, OnInit } from '@angular/core';
import { CommandService } from 'src/app/services/crud/command.service';
import { combineLatest } from 'rxjs';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
  ReactiveFormsModule,
  Form,
} from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { ClientService } from 'src/app/services/crud/client.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private alert: AlertService,
    private clientService: ClientService,
    private commandService: CommandService
  ) {}

  form: FormGroup;
  userPrice: any;
  user: any;
  combinedValue: any;
  commandFormGroup: FormGroup;
  clientFormGroup: FormGroup;
  clientList: any;
  actions: any = null;
  role: any = null;
  beforePositionRai: string = 'none';
  beforePositionRae: string = 'none';
  beforePositionRpe: string = 'none';
  beforePositionRpi: string = 'none';
  arrHeader = [
    { name: 'Apellido', key: 'clientName' },
    { name: 'Nombre', key: 'clientFirstName' },
    { name: 'Organization', key: 'orga' },
    // { name: 'Precio Por Plantilla', key: 'price' },
    { name: 'Email', key: 'mail' },
    { name: 'Dirrecion De Envio', key: 'location' },
    // { name: 'Contrasena', key: 'password' },
    // { name: 'Cuenta Actual', key: 'account' },
  ];
  // option which deserve to add a searchBar upper the table, searchbar can be NULL.
  searchBar = {
    placeholder: 'Buscar un usuario',
  };
  ngOnInit(): void {
    ///DONT FORGET LA CONCHA DE TU MADRE
    //Initiate UserInfo FormGroup by callin backend
    //Initiate userPrice variable
    console.log('Initiating', JSON.parse(localStorage.getItem('user')));
    if (JSON.parse(localStorage.getItem('user')).roleId == 1) {
      this.role = 'admin';
      this.user = {};
    } else {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.role = 'client';
    }
    console.log(this.user, 'user');
    // VERIFIER QUE LA DATA CEST BIEN ENREGIRSTR2 DANS LA BASE AVEC LE NOUVEAU FORMAT !!!
    // clientId: [this.user.id,Validators.required], autre facon de lecrire

    this.form = new FormGroup({
      client: new FormGroup({
        clientName: new FormControl(''),
        clientFirstname: new FormControl(''),
        phone: new FormControl(''),
        mail: new FormControl(''),
        location: new FormControl(''),
      }),
      command: new FormGroup({
        clientId: new FormControl(this.user.id, Validators.required),
        creationDate: new FormControl(this.dateNow(true)),
        price: new FormControl(this.user.price, Validators.required),
        patient: new FormArray([
          new FormGroup({
            patientName: new FormControl('', Validators.required),
            patientFirstName: new FormControl('', Validators.required),
            patientId: new FormControl(),
            item: new FormArray([
              new FormGroup({
                // FORM NECESARIOS

                correction: new FormControl([
                  Validators.min(105),
                  Validators.max(360),
                ]),
                size: new FormControl('', Validators.required),
                quantity: new FormControl(1, Validators.required),
                model: new FormControl('', Validators.required),
                /// ANTEPIEE
                descargaAntepie: new FormControl(''),
                oliva_BarraMetatarsal: new FormControl(''),
                rai: new FormControl(''),
                rae: new FormControl(''),
                /// PIE MEDIO
                arco: new FormControl(''),
                contraArco: new FormControl(''),
                /// TALON/RETROPIE
                alsa: new FormControl(''),
                alcochadaOEspolon: new FormControl(''),

                rpi: new FormControl(''),
                rpe: new FormControl(''),

                ///OPTION
                raex: new FormControl(''),
                clinica: new FormControl(''),
                talonera: new FormControl(''),

                ////// RPI
                selectedRPI1: new FormControl(''),
                selectedRPI2: new FormControl(''),
                ////// RPE
                selectedRPE1: new FormControl(''),
                selectedRPE2: new FormControl(''),

                ///ALSA
                selectedAlsa1: new FormControl(''),
                selectedAlsa2: new FormControl(''),
                //ARCO
                selectedArco1: new FormControl(''),
                selectedArco2: new FormControl(''),
                //Talonera
                talonera1: new FormControl(''),
                taloneraAltura: new FormControl(''),
                taloneraType: new FormControl(''),
                taloneraDescarga: new FormControl(''),

                //Option
                whereRae: new FormControl(),
                whereRpe: new FormControl(),
                whereRpi: new FormControl(),
                whereRai: new FormControl(),
              }),
            ]),
          }),
        ]),
      }),

      //dont forget to initiate this object in the constructor or onInit method when the token is added to the prgral
    });

    this.step = 1;
    this.commandFormGroup = this.form.get('command') as FormGroup;
    this.clientFormGroup = this.form.get('client') as FormGroup;

    this.actions = [{ text: 'Selecionnar', method: this.selectClient }];
  }

  selectClient = (user: any): void => {
    let clientId = this.form.get('command');
    console.log(user, 'user');

    console.log(this.form.get('client').value, 'client before');

    clientId.get('clientId').setValue(user.id);
    this.form.get('client.clientName').setValue(user.clientName);
    this.form.get('client.clientFirstname').setValue(user.clientFirstName);
    this.form.get('client.phone').setValue(user.phone);
    this.form.get('client.mail').setValue(user.mail);
    this.form.get('client.location').setValue(user.location);

    // let subscription = this.simpleModalService
    //   .addModal(GenericFormgroupComponent, {
    //     form: form,
    //     formRules: this.formRulesUpdate,
    //     title: title,
    //   })
    //   .subscribe(async (data) => {
    //     if (data) {
    //       await this.clientService.insertUpdateClient(data).subscribe((res) => {
    //         if (res) {
    //           this.alert.success(
    //             'Los datos del usuario fueron modificado en la base de datos !'
    //           );
    //           window.location.reload();
    //         } else {
    //           this.alert.error('El servidor se encontro con un problema');
    //         }
    //       });

    //       //We get modal result
    //       subscription.unsubscribe();
    //       console.log('data del usuarioamigo', data);
    //     }
    //   });
  };
  get itemsArray() {
    return this.commandFormGroup?.get('patient') as FormArray;
  }
  getItem(index: any) {
    return this.itemsArray.at(index).get('item') as FormArray;
  }
  addShoeSol(index: any) {
    console.log(
      this.form.get('command')?.get('patient').value,
      'this form value'
    );
    console.log(
      this.itemsArray.at(index).get('item').value,
      'this form value item '
    );

    // console.log(this.form.get('shoeSols').value.length(), 'length');
    // if (this.form.get('shoeSols').value.length() != 1) {
    (this.itemsArray.at(index).get('item') as FormArray).push(
      new FormGroup({
        // FORM NECESARIOS
        // itemName: new FormControl('', Validators.required),
        // itemFirstName: new FormControl('', Validators.required),
        correction: new FormControl([Validators.min(105), Validators.max(360)]),
        size: new FormControl('', Validators.required),
        quantity: new FormControl(1, Validators.required),
        model: new FormControl('', Validators.required),
        /// ANTEPIEE
        descargaAntepie: new FormControl(''),
        oliva_BarraMetatarsal: new FormControl(''),
        rai: new FormControl(''),
        rae: new FormControl(''),
        /// PIE MEDIO
        arco: new FormControl(''),
        contraArco: new FormControl(''),
        /// TALON/RETROPIE
        alsa: new FormControl(''),
        alcochadaOEspolon: new FormControl(''),

        rpi: new FormControl(''),
        rpe: new FormControl(''),

        ///OPTION
        raex: new FormControl(''),
        clinica: new FormControl(''),
        talonera: new FormControl(''),

        ////// RPI
        selectedRPI1: new FormControl(''),
        selectedRPI2: new FormControl(''),
        ////// RPE
        selectedRPE1: new FormControl(''),
        selectedRPE2: new FormControl(''),

        ///ALSA
        selectedAlsa1: new FormControl(''),
        selectedAlsa2: new FormControl(''),
        //ARCO
        selectedArco1: new FormControl(''),
        selectedArco2: new FormControl(''),
        //Talonera
        talonera1: new FormControl(''),
        taloneraAltura: new FormControl(''),
        taloneraType: new FormControl(''),
        taloneraDescarga: new FormControl(''),

        //Option
        whereRae: new FormControl(),
        whereRpe: new FormControl(),
        whereRpi: new FormControl(),
        whereRai: new FormControl(),
      })
    );
  }
  addPaciente(index: any) {
    console.log(this.itemsArray.value, 'this form value item ');

    // console.log(this.form.get('shoeSols').value.length(), 'length');
    // if (this.form.get('shoeSols').value.length() != 1) {
    (this.itemsArray as FormArray).push(
      new FormGroup({
        patientId: new FormControl(),
        patientName: new FormControl('', Validators.required),
        patientFirstName: new FormControl('', Validators.required),
        item: new FormArray([
          new FormGroup({
            // FORM NECESARIOS
            // itemName: new FormControl('', Validators.required),
            // itemFirstName: new FormControl('', Validators.required),
            correction: new FormControl([
              Validators.min(105),
              Validators.max(360),
            ]),
            size: new FormControl('', Validators.required),
            quantity: new FormControl(1, Validators.required),
            model: new FormControl('', Validators.required),
            /// ANTEPIEE
            descargaAntepie: new FormControl(''),
            oliva_BarraMetatarsal: new FormControl(''),
            rai: new FormControl(''),
            rae: new FormControl(''),
            /// PIE MEDIO
            arco: new FormControl(''),
            contraArco: new FormControl(''),
            /// TALON/RETROPIE
            alsa: new FormControl(''),
            alcochadaOEspolon: new FormControl(''),

            rpi: new FormControl(''),
            rpe: new FormControl(''),

            ///OPTION
            raex: new FormControl(''),
            clinica: new FormControl(''),
            talonera: new FormControl(''),

            ////// RPI
            selectedRPI1: new FormControl(''),
            selectedRPI2: new FormControl(''),
            ////// RPE
            selectedRPE1: new FormControl(''),
            selectedRPE2: new FormControl(''),

            ///ALSA
            selectedAlsa1: new FormControl(''),
            selectedAlsa2: new FormControl(''),
            //ARCO
            selectedArco1: new FormControl(''),
            selectedArco2: new FormControl(''),
            //Talonera
            talonera1: new FormControl(''),
            taloneraAltura: new FormControl(''),
            taloneraType: new FormControl(''),
            taloneraDescarga: new FormControl(''),

            //Option
            whereRae: new FormControl(),
            whereRpe: new FormControl(),
            whereRpi: new FormControl(),
            whereRai: new FormControl(''),
          }),
        ]),
      })
    );
    // }

    // console.log(this.itemsArray.value, 'this form value');
  }

  deleteShoeSol(indexItems: any, indexItem: any) {
    if (this.itemsArray.at(indexItems).get('item').value.length > 1) {
      (this.itemsArray.at(indexItems).get('item') as FormArray).removeAt(
        indexItem
      );
    }
  }
  deletePatiente(indexItems: any, indexItem: any) {
    if (this.itemsArray.value.length > 1) {
      (this.itemsArray as FormArray).removeAt(indexItems);
    }
  }
  async onSubmit() {
    // console.log('Submit1');
    let plantillaNombre = 0;
    console.log(this.itemsArray.value);
    (this.itemsArray as FormArray).controls.forEach((patient) => {
      (patient.get('item') as FormArray).controls.forEach((item) => {
        // console.log(item.value, 'item');
        plantillaNombre++;
        /////// TEST ENTRE LA VALEUR DE LA TAILLE DE LA SEMELLE ET LA CORRECIOn

        // console.log(
        //   Math.round((parseInt(item.get('size').value) * 10) / 1.5) * 0.85,
        //   'get(size).value to mm down'
        // );
        // console.log(item.get('correction').value, 'item mm value correcion');
        // console.log(
        //   Math.round((parseInt(item.get('size').value) * 10) / 1.5),
        //   'get(size).value to mm high'
        // );
        // console.log(
        //   item.get('correction').value <
        //     Math.round((parseInt(item.get('size').value) * 10) / 1.5),
        //   'test if correcion inferio then sup value'
        // );
        if (
          item.get('correction').value <
            Math.round((parseInt(item.get('size').value) * 10) / 1.5) * 0.85 ||
          Math.round((parseInt(item.get('size').value) * 10) / 1.5) <
            item.get('correction').value
        ) {
          this.itemsArray.setErrors({ invalid: 'This field is invalid.' });

          this.alert.info(
            'El valor de la correcion no se puede applicar a la talles selecionnada '
          );
        }
      });
    });

    this.form
      .get('command')
      ?.get('price')
      .setValue(
        (this.form.get('command')?.get('price').value as number) *
          plantillaNombre
      );

    // console.log(this.itemsArray.value);
    // console.log(this.itemsArray.valid);

    if (this.itemsArray.valid) {
      console.log(this.itemsArray.valid);

      this.clientList = await this.loadCommand();
    } else {
      this.alert.info(
        'Los Campos Nombre, Apellido, Modelo, Cantidad y Talle del formulario son obligatorios '
      );
    }
    // this.changeStepAhead();
  }
  async loadCommand() {
    await this.clientService
      .findByClient({
        where: { roleId: 2 },
      })
      .subscribe((res) => {
        console.log(res, 'res');
        this.clientList = res;
        this.changeStepAhead();
        console.log(this.clientList, 'this.clientList');
        console.log(
          this.form.get('command').get('clientId').value,
          "'        this.form.get('clientId').valu'"
        );
      });
    // this.display = true;
  }

  onSubmitClient() {
    console.log('Submit222');
    console.log(this.form.get('client').valid);
    if (this.form.get('client').valid) {
      this.changeStepAhead();
    }
  }

  temporarySaveForm() {
    console.log(
      JSON.parse(JSON.stringify(this.commandFormGroup.value)),
      'pedido ja'
    );
    let pedido = JSON.parse(JSON.stringify(this.commandFormGroup.value));
    this.commandService.insertUpdateCommand(pedido).subscribe((res) => {
      if (res) {
        this.alert.success(
          'Los datos del pedido fueron enregistrado en labase de datos!'
        );
      } else {
        this.alert.error('El servidor se encontro con un problema');
      }
    });
  }

  changeStepAhead() {
    if (this.step != 3) {
      this.step += 1;
    }
  }
  changeStepBack() {
    if (this.step > 1) {
      this.step -= 1;
    }
  }

  //IF CANT REGISTRER LIKE THAT USE CODE BELOW TO CHANGE DATE FORMAT
  dateNow(onlyDate: Boolean) {
    var date = new Date();
    var now_utc = Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate()
    );
    // const dateString = "2023-01-31T00:00:00.000Z";
    // // Convert the date string into a Date object
    // const date = new Date(dateString);
    // // Extract the day, month, and year components from the Date object
    // const day = date.getDate();
    // const month = date.getMonth() + 1; // Note: Month is zero-indexed
    // const year = date.getFullYear();
    // const formattedDate = `${day}-${month}-${year}`;
    // Output: "31-1-2023"

    var finalDate = new Date(now_utc)
      .toISOString()
      .replace(/T/, ' ')
      .replace(/\..+/, '');
    finalDate = onlyDate ? finalDate.substring(0, 10) : finalDate;

    return finalDate;
  }

  /////RPIIIII
  onChangeRpi(indexPatient: number, indexPlantilla: number) {
    let variableRpi = this.form
      .get('command')
      .get('patient')
      .get([indexPatient])
      .get('item')
      .get([indexPlantilla])
      .get('rpi');
    let variableRpi1 = this.form
      .get('command')
      .get('patient')
      .get([indexPatient])
      .get('item')
      .get([indexPlantilla])
      .get('selectedRPI1');
    let variableRpi2 = this.form
      .get('command')
      .get('patient')
      .get([indexPatient])
      .get('item')
      .get([indexPlantilla])
      .get('selectedRPI2');
    variableRpi.setValue(variableRpi1.value + '' + variableRpi2.value);
  }
  //RPIII
  onChangeWhereRpi(
    indexPatient: number,
    indexPlantilla: number,
    position: string
  ) {
    let variableRpi = this.form
      .get('command')
      .get('patient')
      .get([indexPatient])
      .get('item')
      .get([indexPlantilla])
      .get('rpi');
    let variableRpi1 = this.form
      .get('command')
      .get('patient')
      .get([indexPatient])
      .get('item')
      .get([indexPlantilla])
      .get('selectedRPI1');
    let variableRpi2 = this.form
      .get('command')
      .get('patient')
      .get([indexPatient])
      .get('item')
      .get([indexPlantilla])
      .get('selectedRPI2');
    if (this.beforePositionRpi == 'none') {
      variableRpi.setValue(
        variableRpi1.value + '-' + variableRpi2.value + '-' + position
      );
      this.beforePositionRpi = position;
    } else if (position !== this.beforePositionRpi) {
      const regex = /(.*)-.*$/;
      const match = regex.exec(variableRpi.value);
      variableRpi.setValue(match[1]);

      variableRpi.setValue(
        variableRpi1.value + '-' + variableRpi2.value + '-' + position
      );
      this.beforePositionRpi = position;
    }
  }

  //RPEEEE
  onChangeRpe(indexPatient: number, indexPlantilla: number) {
    let variableRpe = this.form
      .get('command')
      .get('patient')
      .get([indexPatient])
      .get('item')
      .get([indexPlantilla])
      .get('rpe');
    let variableRpe1 = this.form
      .get('command')
      .get('patient')
      .get([indexPatient])
      .get('item')
      .get([indexPlantilla])
      .get('selectedRPE1');
    let variableRpe2 = this.form
      .get('command')
      .get('patient')
      .get([indexPatient])
      .get('item')
      .get([indexPlantilla])
      .get('selectedRPE2');
    variableRpe.setValue(variableRpe1.value + '' + variableRpe2.value);
  }
  ///RPEEEE
  onChangeWhereRpe(
    indexPatient: number,
    indexPlantilla: number,
    position: string
  ) {
    let variableRpe = this.form
      .get('command')
      .get('patient')
      .get([indexPatient])
      .get('item')
      .get([indexPlantilla])
      .get('rpe');
    let variableRpe1 = this.form
      .get('command')
      .get('patient')
      .get([indexPatient])
      .get('item')
      .get([indexPlantilla])
      .get('selectedRPE1');
    let variableRpe2 = this.form
      .get('command')
      .get('patient')
      .get([indexPatient])
      .get('item')
      .get([indexPlantilla])
      .get('selectedRPE2');
    if (this.beforePositionRpe == 'none') {
      variableRpe.setValue(
        variableRpe1.value + '-' + variableRpe2.value + '-' + position
      );
      this.beforePositionRpe = position;
    } else if (position !== this.beforePositionRai) {
      const regex = /(.*)-.*$/;
      const match = regex.exec(variableRpe.value);
      variableRpe.setValue(match[1]);

      variableRpe.setValue(
        variableRpe1.value + '-' + variableRpe2.value + '-' + position
      );
      this.beforePositionRpe = position;
    }
  }

  onChangeTalonera(indexPatient: number, indexPlantilla: number) {
    let variableTalonera = this.form
      .get('command')
      .get('patient')
      .get([indexPatient])
      .get('item')
      .get([indexPlantilla])
      .get('talonera');

    let variableTalonera1 = this.form
      .get('command')
      .get('patient')
      .get([indexPatient])
      .get('item')
      .get([indexPlantilla])
      .get('talonera1');

    let variableTaloneraAltura = this.form
      .get('command')
      .get('patient')
      .get([indexPatient])
      .get('item')
      .get([indexPlantilla])
      .get('taloneraAltura');

    let variableTaloneraType = this.form
      .get('command')
      .get('patient')
      .get([indexPatient])
      .get('item')
      .get([indexPlantilla])
      .get('taloneraType');

    let variableTaloneraDescarga = this.form
      .get('command')
      .get('patient')
      .get([indexPatient])
      .get('item')
      .get([indexPlantilla])
      .get('taloneraDescarga');

    if (variableTalonera1.value != '') {
      variableTalonera.setValue(
        (variableTalonera1.value != null ? variableTalonera1.value : '') +
          (variableTaloneraAltura.value != null
            ? '-' + variableTaloneraAltura.value
            : '') +
          (variableTaloneraType.value != null
            ? '-' + variableTaloneraType.value
            : '') +
          (variableTaloneraDescarga.value != null
            ? '-' + variableTaloneraDescarga.value
            : '')
      );
    }
  }

  onChangeRae(indexPatient: number, indexPlantilla: number) {
    let variableRae = this.form
      .get('command')
      .get('patient')
      .get([indexPatient])
      .get('item')
      .get([indexPlantilla])
      .get('rae');
    variableRae.setValue(variableRae.value);
  }
  onChangeWhereRae(
    indexPatient: number,
    indexPlantilla: number,
    position: string
  ) {
    let variableRae = this.form
      .get('command')
      .get('patient')
      .get([indexPatient])
      .get('item')
      .get([indexPlantilla])
      .get('rae');
    if (this.beforePositionRae == 'none') {
      variableRae.setValue(variableRae.value + '-' + position);
      this.beforePositionRae = position;
    } else if (position !== this.beforePositionRae) {
      const regex = /(.*)-.*$/;
      const match = regex.exec(variableRae.value);
      variableRae.setValue(match[1]);

      variableRae.setValue(variableRae.value + '-' + position);
      this.beforePositionRae = position;
    }
  }
  onChangeRai(indexPatient: number, indexPlantilla: number) {
    let variableRai = this.form
      .get('command')
      .get('patient')
      .get([indexPatient])
      .get('item')
      .get([indexPlantilla])
      .get('rai');
    variableRai.setValue(variableRai.value);
  }
  onChangeWhereRai(
    indexPatient: number,
    indexPlantilla: number,
    position: string
  ) {
    let variableRai = this.form
      .get('command')
      .get('patient')
      .get([indexPatient])
      .get('item')
      .get([indexPlantilla])
      .get('rai');
    if (this.beforePositionRai == 'none') {
      variableRai.setValue(variableRai.value + '-' + position);
      this.beforePositionRai = position;
    } else if (position !== this.beforePositionRai) {
      const regex = /(.*)-.*$/;
      const match = regex.exec(variableRai.value);
      variableRai.setValue(match[1]);

      variableRai.setValue(variableRai.value + '-' + position);
      this.beforePositionRai = position;
    }
  }

  onChangeArco(indexPatient: number, indexPlantilla: number) {
    let variableArco = this.form
      .get('command')
      .get('patient')
      .get([indexPatient])
      .get('item')
      .get([indexPlantilla])
      .get('arco');
    if (
      this.form
        .get('command')
        .get('patient')
        .get([indexPatient])
        .get('item')
        .get([indexPlantilla])
        .get('selectedArco1').value != ''
    ) {
      variableArco.setValue(
        this.form
          .get('command')
          .get('patient')
          .get([indexPatient])
          .get('item')
          .get([indexPlantilla])
          .get('selectedArco1').value +
          '-' +
          this.form
            .get('command')
            .get('patient')
            .get([indexPatient])
            .get('item')
            .get([indexPlantilla])
            .get('selectedArco2').value +
          'mm'
      );
    }
  }

  onChangeAlsa(indexPatient: number, indexPlantilla: number) {
    let variableAlsa = this.form
      .get('command')
      .get('patient')
      .get([indexPatient])
      .get('item')
      .get([indexPlantilla])
      .get('alsa');
    let variableAlsa1 = this.form
      .get('command')
      .get('patient')
      .get([indexPatient])
      .get('item')
      .get([indexPlantilla])
      .get('selectedAlsa1');
    let variableAlsa2 = this.form
      .get('command')
      .get('patient')
      .get([indexPatient])
      .get('item')
      .get([indexPlantilla])
      .get('selectedAlsa2');
    if (variableAlsa1.value != '') {
      variableAlsa.setValue(
        (variableAlsa1.value != null ? variableAlsa1.value : '') +
          (variableAlsa2.value != null ? '-' + variableAlsa2.value : '')
      );
    }
    // do something with selectedItem1Value
  }

  step: any;

  models = ['17', '19', '52', '52 3/4', '29', '17 Flex-Bottines'];
  selectedModel: string;

  ////RPI
  rpis1 = ['', 'STANDARD', 'LARGO', 'COMPLETO', 'Hasta 1er'];
  rpis2 = ['1 mm', '2 mm', '3 mm', '4 mm', '5 mm', '6 mm', '7 mm', '8 mm'];

  //RPE
  rpes1 = ['', 'STANDARD', 'LARGO', 'COMPLETO', 'Hasta 5er'];
  rpes2 = ['1 mm', '2 mm', '3 mm', '4 mm', '5 mm', '6 mm', '7 mm', '8 mm'];

  ////RPI
  rai1 = ['', '1 mm', '2 mm', '3 mm', '4 mm', '5 mm'];
  //RAE
  rae1 = ['', '1 mm', '2 mm', '3 mm', '4 mm', '5 mm'];

  //ARCO
  selectedArco1 = ['', 'STANDARD', 'Sobre Arco', 'Arco Reforsado'];
  selectedArco2: number;

  //CONTRA ARCO
  contraArco = ['', 'STANDARD', 'LARGA'];

  //TALONERA RETROPIE
  talonera1 = ['', 'Talonera Sin Pegar'];
  taloneraAltura = [
    '1 mm',
    '2 mm',
    '3 mm',
    '4 mm',
    '5 mm',
    '6 mm',
    '7 mm',
    '8 mm',
    '9 mm',
    '10 mm',
    '11 mm',
  ];
  taloneraType = ['', 'STANDARD', 'LARGA'];
  taloneraDescarga = ['', 'Descarga Espolon'];
  //ALSA
  alsa1 = ['', 'Alsa STANDARD', 'Alsa LARGA', 'Descarga Espolon'];
  alsa2 = [
    '1 mm',
    '2 mm',
    '3 mm',
    '4 mm',
    '5 mm',
    '6 mm',
    '7 mm',
    '8 mm',
    '9 mm',
    '10 mm',
    '11 mm',
  ];
  //alcochadaOEspolon
  alcochadaOEspolon = ['', 'Acolchado De Talon', 'Descarga Espolon'];
  // DESCARGA ANTEPIES
  descargaAntepies = [
    '',
    'Descarga STD 1',
    'Descarga STD 5',
    'Descarga GRD 1',
    'Descarga GRD 5',
    'Mulidescarga STD 2',
    'Mulidescarga STD 3',
    'Mulidescarga STD 4',
    'Mulidescarga GRD 2',
    'Mulidescarga GRD 3',
    'Mulidescarga GRD 4',
  ];

  //OLIVA BARRAS
  olivaBarras = [
    '',
    'Oliva STANDARD',
    'Oliva MEDIA',
    'Oliva 4',
    'Oliva 3',
    'Oliva 2',
    'Oliva 1',
    'Oliva 0',
    'Barra STANDARD',
    'Barra MEDIA',
    'Barra GRANDE',
  ];
  //SIZE/TALLES
  sizes = [
    16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23,
    23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5,
    31, 31.5, 32, 32.5, 33, 33.5, 34, 34.5, 35, 35.5, 36, 36.5, 37, 37.5, 38,
    38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45, 45.5,
    46, 46.5, 47, 47.5, 48, 48.5, 49, 49.5, 50, 50.5, 51, 51.5, 52, 52.5, 53,
    53.5, 54, 54.5,
  ];
  selectedSizes: number;
}
