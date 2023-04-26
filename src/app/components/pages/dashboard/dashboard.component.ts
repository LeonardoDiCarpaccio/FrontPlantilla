import { Component, HostListener, OnInit } from '@angular/core';
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
  AbstractControl,
} from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { ClientService } from 'src/app/services/crud/client.service';
import { HelpersService } from 'src/app/services/helpers.service';
import { PriceTypeService } from 'src/app/services/crud/price_type';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private alert: AlertService,
    private clientService: ClientService,
    private commandService: CommandService,
    private helperService: HelpersService,
    private priceTypeService: PriceTypeService,
    private route: ActivatedRoute
  ) {}

  form: FormGroup;
  userPrice: any;
  user: any;
  combinedValue: any;
  commandFormGroup: FormGroup;
  clientFormGroup: FormGroup;
  clientList: any;
  priceTypePlantillaList: any;

  actions: any = null;
  role: any = null;
  beforePositionRai: string = 'none';
  beforePositionRae: string = 'none';
  beforePositionRpe: string = 'none';
  beforePositionRpi: string = 'none';
  receivedData: any;

  arrHeader = [
    { name: 'Apellido', key: 'clientName' },
    { name: 'Nombre', key: 'clientFirstName' },
    { name: 'Organization', key: 'orga' },
    { name: 'Precio Por Plantilla', key: 'price' },
    { name: 'Email', key: 'mail' },
    { name: 'Dirrecion De Envio', key: 'location' },
    // { name: 'Contrasena', key: 'password' },
    // { name: 'Cuenta Actual', key: 'account' },
  ];
  // option which deserve to add a searchBar upper the table, searchbar can be NULL.
  searchBar = {
    placeholder: 'Buscar un usuario',
  };
  ngOnDestroy() {
    const formData = JSON.stringify(this.form.value);
    localStorage.setItem('formData', formData);
  }

  async ngOnInit() {
    this.receivedData = history.state;
    console.log(this.receivedData, 'receivedData');

    if (JSON.parse(localStorage.getItem('user')).roleId == 1) {
      this.role = 'admin';
      this.user = {};
    } else {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.role = 'client';
    }

    await this.priceTypeService.getPriceType({}).subscribe((res) => {
      if (res) {
        this.priceTypePlantillaList = res;
      }
    });

    // Load saved form data from localStorage
    const savedFormData = localStorage.getItem('formData');

    if (savedFormData) {
      const savedData = JSON.parse(savedFormData);
      // Initialize form with saved data
      this.form = this.createForm(savedData);
    } else {
      // Initialize form with default structure
      this.form = this.createForm();
    }

    this.step = 1;
    this.commandFormGroup = this.form.get('command') as FormGroup;
    this.clientFormGroup = this.form.get('client') as FormGroup;

    if (this.role === 'client') {
      let clientId = this.form.get('command');
      clientId.get('clientId').setValue(this.user.id);
      this.form.get('client.clientName').setValue(this.user.clientName);
      this.form
        .get('client.clientFirstname')
        .setValue(this.user.clientFirstName);
      this.form.get('client.orga').setValue(this.user.orga);

      this.form.get('client.phone').setValue(this.user.phone);
      this.form.get('client.mail').setValue(this.user.mail);
      this.form.get('client.location').setValue(this.user.location);
      this.form.get('client.price').setValue(this.user.price);
    }
    this.actions = [{ text: 'Selecionnar', method: this.selectClient }];
    this.updateScreenWidth();
  }

  largeScreen: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateScreenWidth();
  }

  updateScreenWidth(): void {
    this.largeScreen = window.innerWidth > 1030;
  }

  selectClient = (user: any): void => {
    let clientId = this.form.get('command');
    clientId.get('clientId').setValue(user.id);
    this.form.get('client.clientName').setValue(user.clientName);
    this.form.get('client.clientFirstname').setValue(user.clientFirstName);
    this.form.get('client.orga').setValue(user.orga);
    this.form.get('client.phone').setValue(user.phone);
    this.form.get('client.mail').setValue(user.mail);
    this.form.get('client.location').setValue(user.location);
    this.form.get('client.price').setValue(user.price);
  };

  get itemsArray() {
    return this.commandFormGroup?.get('patient') as FormArray;
  }

  getItem(index: any) {
    return this.itemsArray.at(index).get('item') as FormArray;
  }

  getOptions(index: any) {
    return this.itemsArray.at(index).get('options') as FormArray;
  }

  onValueChanged(newValue: number) {
    this.step = newValue;
  }

  addShoeSol(index: any) {
    // if (this.form.get('shoeSols').value.length() != 1) {
    (this.itemsArray.at(index).get('options') as FormArray).push(
      new FormGroup({
        quantity: new FormControl(1, Validators.required),
        model: new FormControl(''),
      })
    );
  }
  updateShoeSol(shoeSolBefore: any, patientIndex: any, options: any) {
    // let shoeSolBefore = (this.itemsArray.at(index).get('item') as FormArray).at(
    //   index
    // );
    console.log(shoeSolBefore.value, 'shoeSolBefore');
    (this.itemsArray.at(patientIndex).get('item') as FormArray).push(
      new FormGroup({
        // FORM NECESARIOS
        correction: new FormControl(
          shoeSolBefore.get('correction').value
            ? shoeSolBefore.get('correction').value
            : ''
        ),
        correctionMin: new FormControl(),
        correctionMax: new FormControl(),
        size: new FormControl(
          shoeSolBefore.get('size').value ? shoeSolBefore.get('size').value : ''
        ),
        model: new FormControl(options.get('model').value),
        quantity: new FormControl(1),

        price: new FormControl(),
        /// ANTEPIEE
        descargaAntepie: new FormControl(
          shoeSolBefore.get('descargaAntepie').value
            ? shoeSolBefore.get('descargaAntepie').value
            : ''
        ),
        WhereDescarga: new FormControl('Billateral'),
        //OLIVAA
        oliva_BarraMetatarsal: new FormControl(
          shoeSolBefore.get('oliva_BarraMetatarsal').value
            ? shoeSolBefore.get('oliva_BarraMetatarsal').value
            : ''
        ),
        whereOliva: new FormControl('Billateral'),
        //RAI
        rai: new FormControl(
          shoeSolBefore.get('rai').value ? shoeSolBefore.get('rai').value : ''
        ),
        whereRai: new FormControl('Billateral'),
        //RAE
        rae: new FormControl(
          shoeSolBefore.get('rae').value ? shoeSolBefore.get('rae').value : ''
        ),
        whereRae: new FormControl('Billateral'),
        //PIE MEDIOOOO
        //ARCO
        arco: new FormControl(
          shoeSolBefore.get('arco').value ? shoeSolBefore.get('arco').value : ''
        ),
        selectedArco1: new FormControl(
          shoeSolBefore.get('selectedArco1').value
            ? shoeSolBefore.get('selectedArco1').value
            : ''
        ),
        selectedArco2: new FormControl(
          shoeSolBefore.get('selectedArco2').value
            ? shoeSolBefore.get('selectedArco2').value
            : ''
        ),
        whereArco: new FormControl('Billateral'),
        //CONTRA ARCO
        contraArco: new FormControl(
          shoeSolBefore.get('contraArco').value
            ? shoeSolBefore.get('contraArco').value
            : ''
        ),
        whereContraArco: new FormControl('Billateral'),

        /// TALON/RETROPIE
        ///ALSA
        alsa: new FormControl(
          shoeSolBefore.get('alsa').value ? shoeSolBefore.get('alsa').value : ''
        ),
        selectedAlsa1: new FormControl(
          shoeSolBefore.get('selectedAlsa1').value
            ? shoeSolBefore.get('selectedAlsa1').value
            : ''
        ),
        selectedAlsa2: new FormControl(
          shoeSolBefore.get('selectedAlsa2').value
            ? shoeSolBefore.get('selectedAlsa2').value
            : ''
        ),
        whereAlsa: new FormControl('Billateral'),

        ///Alcochada
        alcochadaOEspolon: new FormControl(
          shoeSolBefore.get('alcochadaOEspolon').value
            ? shoeSolBefore.get('alcochadaOEspolon').value
            : ''
        ),
        Wherealcochada: new FormControl('Billateral'),

        ///OPTION
        clinica: new FormControl(
          shoeSolBefore.get('clinica').value
            ? shoeSolBefore.get('clinica').value
            : ''
        ),
        talonera: new FormControl(
          shoeSolBefore.get('talonera').value
            ? shoeSolBefore.get('talonera').value
            : ''
        ),

        //RPI
        rpi: new FormControl(
          shoeSolBefore.get('rpi').value ? shoeSolBefore.get('rpi').value : ''
        ),
        selectedRPI1: new FormControl(
          shoeSolBefore.get('selectedRPI1').value
            ? shoeSolBefore.get('selectedRPI1').value
            : ''
        ),
        selectedRPI2: new FormControl(
          shoeSolBefore.get('selectedRPI2').value
            ? shoeSolBefore.get('selectedRPI2').value
            : ''
        ),
        whereRpi: new FormControl('Billateral'),

        ////// RPE
        rpe: new FormControl(
          shoeSolBefore.get('rpe').value ? shoeSolBefore.get('rpe').value : ''
        ),
        selectedRPE1: new FormControl(
          shoeSolBefore.get('selectedRPE1').value
            ? shoeSolBefore.get('selectedRPE1').value
            : ''
        ),
        selectedRPE2: new FormControl(
          shoeSolBefore.get('selectedRPE2').value
            ? shoeSolBefore.get('selectedRPE2').value
            : ''
        ),
        whereRpe: new FormControl('Billateral'),

        //Talonera
        talonera1: new FormControl(
          shoeSolBefore.get('talonera1').value
            ? shoeSolBefore.get('talonera1').value
            : ''
        ),
        taloneraAltura: new FormControl(
          shoeSolBefore.get('taloneraAltura').value
            ? shoeSolBefore.get('taloneraAltura').value
            : ''
        ),
        taloneraType: new FormControl(
          shoeSolBefore.get('taloneraType').value
            ? shoeSolBefore.get('taloneraType').value
            : ''
        ),
        taloneraDescarga: new FormControl(
          shoeSolBefore.get('taloneraDescarga').value
            ? shoeSolBefore.get('taloneraDescarga').value
            : ''
        ),
      })
    );
  }
  addPaciente(index: any) {
    // if (this.form.get('shoeSols').value.length() != 1) {
    (this.itemsArray as FormArray).push(
      new FormGroup({
        patientId: new FormControl(),
        patientName: new FormControl('', Validators.required),
        patientFirstName: new FormControl('', Validators.required),
        options: new FormArray([
          new FormGroup({
            quantity: new FormControl(1),
            model: new FormControl(''),
          }),
        ]),
        item: new FormArray([
          new FormGroup({
            // FORM NECESARIOS
            correction: new FormControl(),
            correctionMin: new FormControl(),
            correctionMax: new FormControl(),
            size: new FormControl('', Validators.required),
            model: new FormControl(''),
            quantity: new FormControl(1),

            price: new FormControl(),
            /// ANTEPIEE
            descargaAntepie: new FormControl(''),
            WhereDescarga: new FormControl('Billateral'),
            //OLIVAA
            oliva_BarraMetatarsal: new FormControl(''),
            whereOliva: new FormControl('Billateral'),
            //RAI
            rai: new FormControl(''),
            whereRai: new FormControl('Billateral'),
            //RAE
            rae: new FormControl(''),
            whereRae: new FormControl('Billateral'),
            //PIE MEDIOOOO
            //ARCO
            arco: new FormControl(''),
            selectedArco1: new FormControl(''),
            selectedArco2: new FormControl(''),
            whereArco: new FormControl('Billateral'),
            //CONTRA ARCO
            contraArco: new FormControl(''),
            whereContraArco: new FormControl('Billateral'),

            /// TALON/RETROPIE
            ///ALSA
            alsa: new FormControl(''),
            selectedAlsa1: new FormControl(''),
            selectedAlsa2: new FormControl(''),
            whereAlsa: new FormControl('Billateral'),

            ///Alcochada
            alcochadaOEspolon: new FormControl(''),
            Wherealcochada: new FormControl('Billateral'),

            ///OPTION
            clinica: new FormControl(''),
            talonera: new FormControl(''),

            //RPI
            rpi: new FormControl(''),
            selectedRPI1: new FormControl(''),
            selectedRPI2: new FormControl(''),
            whereRpi: new FormControl('Billateral'),

            ////// RPE
            rpe: new FormControl(''),
            selectedRPE1: new FormControl(''),
            selectedRPE2: new FormControl(''),
            whereRpe: new FormControl('Billateral'),

            //Talonera
            talonera1: new FormControl(''),
            taloneraAltura: new FormControl(''),
            taloneraType: new FormControl(''),
            taloneraDescarga: new FormControl(''),
          }),
        ]),
      })
    );
  }

  deleteShoeSol(indexItems: any, indexItem: any) {
    if (this.itemsArray.at(indexItems).get('options').value.length > 1) {
      (this.itemsArray.at(indexItems).get('options') as FormArray).removeAt(
        indexItem
      );
    }
  }

  deletePatiente(indexItems: any, indexItem: any) {
    if (this.itemsArray.value.length > 1) {
      (this.itemsArray as FormArray).removeAt(indexItems);
    }
  }

  onSelectTalles(size: any, indexItems: any, indexItem: any) {
    (this.itemsArray.at(indexItems).get('item') as FormArray)
      .at(indexItem)
      .get('correction')
      .setValue(Math.round((parseInt(size) * 10) / 1.5));
    (this.itemsArray.at(indexItems).get('item') as FormArray)
      .at(indexItem)
      .get('correctionMax')
      .setValue(Math.round((parseInt(size) * 10) / 1.5));
    (this.itemsArray.at(indexItems).get('item') as FormArray)
      .at(indexItem)
      .get('correctionMin')
      .setValue(Math.round((parseInt(size) * 10) / 1.5) * 0.85);
  }

  async onSubmit() {
    // let plantillaNombre = 0;
    (this.itemsArray as FormArray).controls.forEach((patient, patientIndex) => {
      (patient.get('item') as FormArray).controls.forEach(
        (item: FormGroup, itemIndex) => {
          /// TEST ENTRE LA VALEUR DE LA TAILLE DE LA SEMELLE ET LA CORRECION

          item.get('selectedArco2').setErrors(null);
          item.get('selectedRPI2').setErrors(null);
          item.get('selectedRPE2').setErrors(null);
          item.get('correction').setErrors(null);
          patient.get('patientName').setErrors(null);
          patient.get('patientFirstName').setErrors(null);
          item.get('size').setErrors(null);

          if (
            item.get('correction').value <
              Math.round((parseInt(item.get('size').value) * 10) / 1.5) *
                0.85 ||
            Math.round((parseInt(item.get('size').value) * 10) / 1.5) <
              item.get('correction').value
          ) {
            item.get('correction').setErrors({ invalid: true });
            this.alert.info(
              'El valor de la correcion no se puede applicar a la talles selecionnada'
            );
          }
          patient.get('patientName').value == ''
            ? patient.get('patientName').setErrors({ invalid: true })
            : null;
          patient.get('patientFirstName').value == ''
            ? patient.get('patientFirstName').setErrors({ invalid: true })
            : null;
          item.get('size').value == ''
            ? item.get('size').setErrors({ invalid: true })
            : null;

          //patient.get('patientFirstName').value == ''
          //patient.get('patientFirstName').setErrors({ invalid: true }) :null;

          if (
            item.get('selectedArco1').value == 'SOBRE ARCO' &&
            item.get('selectedArco2').value == ''
          ) {
            item.get('selectedArco2').setErrors({ invalid: true });
            this.alert.info('El Sobre Arco Neccessita un valor en mm');
          }
          if (
            item.get('selectedRPI1').value != '' &&
            item.get('selectedRPI2').value == ''
          ) {
            item.get('selectedRPI2').setErrors({ invalid: true });
            this.alert.info('El RPI Neccessita un valor en mm');
          }
          if (
            item.get('selectedRPE1').value != '' &&
            item.get('selectedRPE2').value == ''
          ) {
            item.get('selectedRPE2').setErrors({ invalid: true });
            this.alert.info('El RPE Neccessita un valor en mm');
          }
          if (
            item.get('selectedAlsa1').value != '' &&
            item.get('selectedAlsa2').value == ''
          ) {
            item.get('selectedAlsa2').setErrors({ invalid: true });
            this.alert.info('El Alza Neccessita un valor en mm');
          }
        }
      );
    });

    if (this.itemsArray.valid) {
      if (this.role == 'admin') {
        this.clientList = await this.loadCommand();
      } else {
        this.changeStepAhead();
      }
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
        this.clientList = res;
        this.changeStepAhead();
      });
    // this.display = true;
  }

  onSubmitClient() {
    let plantillaNombre: number = 0;
    console.log(
      (this.itemsArray as FormArray).value,
      ' (this.itemsArray as FormArray)'
    );

    (this.itemsArray as FormArray).controls.forEach((patient, patientIndex) => {
      console.log(patientIndex, 'patientIndex 1111');

      (patient.get('options') as FormArray).controls.forEach(
        (options, optionIndex) => {
          let shoeSol = (patient.get('item') as FormArray).at(0);

          this.updateShoeSol(shoeSol, patientIndex, options);
          this.updatePrice(
            options.get('model').value,
            patientIndex,
            optionIndex
          );
        }
      );
      (patient.get('item') as FormArray).removeAt(0);
    });
    (this.itemsArray as FormArray).controls.forEach((patient) => {
      (patient.get('item') as FormArray).controls.forEach((item, itemIndex) => {
        console.log(plantillaNombre, 'plantillaNombre  por plantilla');
        plantillaNombre = Math.round(
          plantillaNombre + parseFloat(item.get('price').value)
        );
      });
    });
    console.log(plantillaNombre, 'plantillaNombre toatl');

    plantillaNombre = Math.round(
      (this.form.get('client')?.get('price').value as number) * plantillaNombre
    );

    console.log(plantillaNombre, 'plantillaNombre toatl 222222');
    this.form.get('command')?.get('price').setValue(plantillaNombre);

    if (this.form.get('client').valid) {
      this.temporarySaveForm();
    }
  }

  updatePrice(model: any, patientIndex: any, indexItem: any) {
    let indexItemTrue = indexItem + 1;
    const matchingObject = this.priceTypePlantillaList.find(
      (obj) => obj.name === model
    );
    const pricePlantilla = matchingObject ? matchingObject.price : null;
    (this.itemsArray.at(patientIndex).get('item') as FormArray)
      .at(indexItemTrue)
      .get('price')
      .setValue(pricePlantilla);
  }

  temporarySaveForm() {
    (this.itemsArray as FormArray).controls.forEach((patient, patientIndex) => {
      (patient.get('item') as FormArray).controls.forEach((item, itemIndex) => {
        /////// TEST ENTRE LA VALEUR DE LA TAILLE DE LA SEMELLE ET LA CORRECIOn

        // item
        //   .get('model')
        //   .setValue(
        //     (patient.get('options') as FormArray).at(itemIndex).get('model')
        //       .value
        //   );

        item
          .get('rpi')
          .setValue(
            (item.get('selectedRPI1').value
              ? item.get('selectedRPI1').value
              : '') +
              (item.get('selectedRPI2').value
                ? '-' + item.get('selectedRPI2').value
                : '') +
              (item.get('selectedRPI1').value != ''
                ? item.get('whereRpi').value != ''
                  ? '-' + item.get('whereRpi').value
                  : ''
                : '')
          );
        item
          .get('rpe')
          .setValue(
            (item.get('selectedRPE1').value
              ? item.get('selectedRPE1').value
              : '') +
              (item.get('selectedRPE2').value
                ? '-' + item.get('selectedRPE2').value
                : '') +
              (item.get('selectedRPE1').value != ''
                ? item.get('whereRpe').value != ''
                  ? '-' + item.get('whereRpe').value
                  : ''
                : '')
          );
        item
          .get('rae')
          .setValue(
            (item.get('rae').value ? item.get('rae').value : '') +
              (item.get('rae').value != ''
                ? item.get('whereRae').value != ''
                  ? '-' + item.get('whereRae').value
                  : ''
                : '')
          );

        item
          .get('oliva_BarraMetatarsal')
          .setValue(
            (item.get('oliva_BarraMetatarsal').value
              ? item.get('oliva_BarraMetatarsal').value
              : '') +
              (item.get('oliva_BarraMetatarsal').value != ''
                ? item.get('whereOliva').value != ''
                  ? '-' + item.get('whereOliva').value
                  : ''
                : '')
          );

        item
          .get('alcochadaOEspolon')
          .setValue(
            (item.get('alcochadaOEspolon').value
              ? item.get('alcochadaOEspolon').value
              : '') +
              (item.get('alcochadaOEspolon').value != ''
                ? item.get('Wherealcochada').value != ''
                  ? '-' + item.get('Wherealcochada').value
                  : ''
                : '')
          );
        item
          .get('descargaAntepie')
          .setValue(
            (item.get('descargaAntepie').value
              ? item.get('descargaAntepie').value
              : '') +
              (item.get('descargaAntepie').value != ''
                ? item.get('WhereDescarga').value != ''
                  ? '-' + item.get('WhereDescarga').value
                  : ''
                : '')
          );
        item
          .get('rai')
          .setValue(
            (item.get('rai').value ? item.get('rai').value : '') +
              (item.get('rai').value != ''
                ? item.get('whereRai').value != ''
                  ? '-' + item.get('whereRai').value
                  : ''
                : '')
          );
        item
          .get('talonera')
          .setValue(
            (item.get('talonera1').value ? item.get('talonera1').value : '') +
              (item.get('taloneraAltura').value
                ? '-' + item.get('taloneraAltura').value
                : '') +
              (item.get('taloneraType').value
                ? '-' + item.get('taloneraType').value
                : '') +
              (item.get('taloneraDescarga').value
                ? '-' + item.get('taloneraDescarga').value
                : '')
          );
        item
          .get('arco')
          .setValue(
            (item.get('selectedArco1').value
              ? item.get('selectedArco1').value
              : '') +
              (item.get('selectedArco2').value
                ? '-' + item.get('selectedArco2').value + 'mm'
                : '') +
              (item.get('selectedArco1').value != ''
                ? item.get('whereArco').value != ''
                  ? '-' + item.get('whereArco').value
                  : ''
                : '')
          );
        item
          .get('contraArco')
          .setValue(
            item.get('contraArco').value +
              (item.get('contraArco').value != ''
                ? item.get('whereContraArco').value != ''
                  ? '-' + item.get('whereContraArco').value
                  : ''
                : '')
          );
        item
          .get('alsa')
          .setValue(
            (item.get('selectedAlsa1').value
              ? item.get('selectedAlsa1').value
              : '') +
              (item.get('selectedAlsa2').value
                ? '-' + item.get('selectedAlsa2').value
                : '') +
              (item.get('selectedAlsa1').value != ''
                ? item.get('whereAlsa').value != ''
                  ? '-' + item.get('whereAlsa').value
                  : ''
                : '')
          );

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
        if (itemIndex != 0) {
          let shoeSolBefore = (patient.get('item') as FormArray).at(0);

          console.log(shoeSolBefore, 'shoelsolbefore');
          item
            .get('clinica')
            .setValue(
              shoeSolBefore.get('clinica').value
                ? shoeSolBefore.get('clinica').value
                : ''
            );
          item
            .get('correction')
            .setValue(
              shoeSolBefore.get('correction').value
                ? shoeSolBefore.get('correction').value
                : ''
            );
          item
            .get('rpi')
            .setValue(
              shoeSolBefore.get('rpi').value
                ? shoeSolBefore.get('rpi').value
                : ''
            );
          item
            .get('rpe')
            .setValue(
              shoeSolBefore.get('rpe').value
                ? shoeSolBefore.get('rpe').value
                : ''
            );
          item
            .get('rae')
            .setValue(
              shoeSolBefore.get('rae').value
                ? shoeSolBefore.get('rae').value
                : ''
            );

          item
            .get('oliva_BarraMetatarsal')
            .setValue(
              shoeSolBefore.get('oliva_BarraMetatarsal').value
                ? shoeSolBefore.get('oliva_BarraMetatarsal').value
                : ''
            );

          item
            .get('alcochadaOEspolon')
            .setValue(
              shoeSolBefore.get('alcochadaOEspolon').value
                ? shoeSolBefore.get('alcochadaOEspolon').value
                : ''
            );
          item
            .get('descargaAntepie')
            .setValue(
              shoeSolBefore.get('descargaAntepie').value
                ? shoeSolBefore.get('descargaAntepie').value
                : ''
            );
          item
            .get('rai')
            .setValue(
              shoeSolBefore.get('rai').value
                ? shoeSolBefore.get('rai').value
                : ''
            );
          item
            .get('talonera')
            .setValue(
              shoeSolBefore.get('talonera').value
                ? shoeSolBefore.get('talonera').value
                : ''
            );
          item
            .get('arco')
            .setValue(
              shoeSolBefore.get('arco').value
                ? shoeSolBefore.get('arco').value
                : ''
            );
          item
            .get('contraArco')
            .setValue(
              shoeSolBefore.get('contraArco').value
                ? shoeSolBefore.get('contraArco').value
                : ''
            );
          item
            .get('alsa')
            .setValue(
              shoeSolBefore.get('alsa').value
                ? shoeSolBefore.get('alsa').value
                : ''
            );
        }
      });
    });
    const formValues = this.form.get('command').value;
    console.log(formValues, 'formValues formValues formValues');
    let pedido = this.stringifyWithCircularReferenceReplacer(formValues);

    this.commandService.insertUpdateCommand(pedido).subscribe((res) => {
      if (res) {
        this.alert.success(
          'Los datos del pedido fueron enregistrado en labase de datos!'
        );
        localStorage.removeItem('formData');
        window.location.reload();
      } else {
        this.alert.error('El servidor se encontro con un problema');
      }
    });
  }
  stringifyWithCircularReferenceReplacer(obj: any): string {
    const seen = new WeakSet();
    return JSON.stringify(obj, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    });
  }
  changeStepAhead() {
    if (this.step != 3) {
      this.step += 1;
    }
    console.log(this.itemsArray.value);
  }
  changeStepBack() {
    if (this.step > 1) {
      this.step -= 1;
      console.log(this.itemsArray.value);

      // (this.itemsArray as FormArray).controls.forEach(
      //   (patient, patientIndex) => {
      //     (patient.get('item') as FormArray).controls.forEach(
      //       (item, itemIndex) => {}
      //     );
      //   }
      // );
    }
  }

  step: any;

  models = ['17', '19', '52', '52 3/4', '29', '17 Flex-Bottines'];
  selectedModel: string;

  ////RPI
  rpis1 = ['', 'ESTANDARD', 'LARGO', 'COMPLETO', 'HASTA 1er'];
  rpis2 = ['1 mm', '2 mm', '3 mm', '4 mm', '5 mm', '6 mm', '7 mm', '8 mm'];

  //RPE
  rpes1 = ['', 'ESTANDARD', 'LARGO', 'COMPLETO', 'HASTA 5'];
  rpes2 = ['1 mm', '2 mm', '3 mm', '4 mm', '5 mm', '6 mm', '7 mm', '8 mm'];

  ////RPI
  rai1 = ['', '1 mm', '2 mm', '3 mm', '4 mm', '5 mm'];
  //RAE
  rae1 = ['', '1 mm', '2 mm', '3 mm', '4 mm', '5 mm'];

  //ARCO
  selectedArco1 = ['', 'ESTANDARD', 'SOBRE ARCO', 'REFORZADO'];
  selectedArco2: number;

  //CONTRA ARCO
  contraArco = ['', 'ESTANDARD', 'LARGA'];

  //TALONERA RETROPIE
  talonera1 = ['', 'TALONERA SIN PEGAR'];
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
  taloneraType = ['', 'ESTANDARD', 'LARGA'];
  taloneraDescarga = ['', 'DESCARGA ESPOLON'];
  //ALSA
  alsa1 = ['', 'ALSA ESTANDARD', 'ALSA LARGA', 'DESCARGA ESPOLON'];
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
  alcochadaOEspolon = ['', 'ACOLCHADO DE TALON', 'DESCARGA ESPOLON'];
  // DESCARGA ANTEPIES
  descargaAntepies = [
    '',
    'DESCARGA STD 1',
    'DESCARGA STD 5',
    'DESCARGA GRD 1',
    'DESCARGA GRD 5',
    'MULTIDESCARGA STD 2',
    'MULTIDESCARGA STD 3',
    'MULTIDESCARGA STD 4',
    'MULTIDESCARGA GRD 2',
    'MULTIDESCARGA GRD 3',
    'MULTIDESCARGA GRD 4',
  ];

  //OLIVA BARRAS
  olivaBarras = [
    '',
    'OLIVA ESTANDARD',
    'OLIVA MEDIA',
    'OLIVA 4',
    'OLIVA 3',
    'OLIVA 2',
    'OLIVA 1',
    'OLIVA 0',
    'BARRA ESTANDARD',
    'BARRA MEDIA',
    'BARRA GRANDE',
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
  createForm(data: any = null): FormGroup {
    const form = new FormGroup({
      client: new FormGroup({
        clientName: new FormControl(''),
        clientFirstname: new FormControl(''),
        orga: new FormControl(''),

        phone: new FormControl(''),
        mail: new FormControl(''),
        location: new FormControl(''),
        price: new FormControl(''),
      }),
      command: new FormGroup({
        clientId: new FormControl(this.user.id, Validators.required),
        creationDateDisplay: new FormControl(
          this.helperService.dateNowString()
        ),
        price: new FormControl('', Validators.required),
        patient: new FormArray([]),
      }),
    });

    if (data) {
      // Load patients from saved data
      for (const patientData of data.command.patient) {
        const patientFormGroup = this.createPatientFormGroup();

        // Clear the default options and items form arrays
        (patientFormGroup.get('options') as FormArray).clear();
        (patientFormGroup.get('item') as FormArray).clear();

        // Load options and items from saved data for each patient
        for (const optionData of patientData.options) {
          const optionFormGroup = this.createOptionFormGroup();
          optionFormGroup.patchValue(optionData);
          (patientFormGroup.get('options') as FormArray).push(optionFormGroup);
        }
        for (const itemData of patientData.item) {
          const itemFormGroup = this.createItemFormGroup();
          itemFormGroup.patchValue(itemData);
          (patientFormGroup.get('item') as FormArray).push(itemFormGroup);
        }

        patientFormGroup.patchValue(patientData);
        (form.get('command.patient') as FormArray).push(patientFormGroup);
      }
    } else {
      // Initialize form with one patient, option, and item
      (form.get('command.patient') as FormArray).push(
        this.createPatientFormGroup()
      );
    }

    return form;
  }

  createPatientFormGroup(): FormGroup {
    return new FormGroup({
      patientName: new FormControl('', Validators.required),
      patientFirstName: new FormControl('', Validators.required),
      patientId: new FormControl(),
      options: new FormArray([this.createOptionFormGroup()]),
      item: new FormArray([this.createItemFormGroup()]),
    });
  }

  createOptionFormGroup(): FormGroup {
    return new FormGroup({
      quantity: new FormControl(1),
      model: new FormControl(''),
    });
  }

  createItemFormGroup(): FormGroup {
    return new FormGroup({
      // FORM NECESARIOS
      quantity: new FormControl(1),
      model: new FormControl(''),
      correction: new FormControl(),
      correctionMin: new FormControl(),
      correctionMax: new FormControl(),

      size: new FormControl(''),

      /// ANTEPIEE
      descargaAntepie: new FormControl(''),
      WhereDescarga: new FormControl('Billateral'),
      //OLIVAA
      oliva_BarraMetatarsal: new FormControl(''),
      whereOliva: new FormControl('Billateral'),
      //RAI
      rai: new FormControl(''),
      whereRai: new FormControl('Billateral'),
      //RAE
      rae: new FormControl(''),
      whereRae: new FormControl('Billateral'),
      //PIE MEDIOOOO
      //ARCO
      arco: new FormControl(''),
      selectedArco1: new FormControl(''),
      selectedArco2: new FormControl(''),
      whereArco: new FormControl('Billateral'),
      //CONTRA ARCO
      contraArco: new FormControl(''),
      whereContraArco: new FormControl('Billateral'),

      /// TALON/RETROPIE
      ///ALSA
      alsa: new FormControl(''),
      selectedAlsa1: new FormControl(''),
      selectedAlsa2: new FormControl(''),
      whereAlsa: new FormControl('Billateral'),

      ///Alcochada
      alcochadaOEspolon: new FormControl(''),
      Wherealcochada: new FormControl('Billateral'),

      ///OPTION
      clinica: new FormControl(''),
      talonera: new FormControl(''),

      //RPI
      rpi: new FormControl(''),
      selectedRPI1: new FormControl(''),
      selectedRPI2: new FormControl(''),
      whereRpi: new FormControl('Billateral'),

      ////// RPE
      rpe: new FormControl(''),
      selectedRPE1: new FormControl(''),
      selectedRPE2: new FormControl(''),
      whereRpe: new FormControl('Billateral'),

      //Talonera
      talonera1: new FormControl(''),
      taloneraAltura: new FormControl(''),
      taloneraType: new FormControl(''),
      taloneraDescarga: new FormControl(''),
      //PRICE
      price: new FormControl(''),
    });
  }
}
