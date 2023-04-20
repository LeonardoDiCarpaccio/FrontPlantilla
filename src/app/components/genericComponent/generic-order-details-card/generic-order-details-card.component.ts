import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { SimpleModalService } from 'ngx-simple-modal';
import { AlertService } from 'src/app/services/alert.service';
import { ClientService } from 'src/app/services/crud/client.service';
import { CommandService } from 'src/app/services/crud/command.service';
import { ItemService } from 'src/app/services/crud/item.service';
import { GenericFormgroupComponent } from '../generic-formgroup/generic-formgroup.component';
import { PatientService } from 'src/app/services/crud/patient.service';
import { Router } from '@angular/router';
import { PriceTypeService } from 'src/app/services/crud/price_type';

@Component({
  selector: 'app-generic-order-details-card',
  templateUrl: './generic-order-details-card.component.html',
  styleUrls: ['./generic-order-details-card.component.scss'],
})
export class GenericOrderDetailsCardComponent implements OnInit {
  @Input() arrMainNgFor: any;
  @Input() actions: any;
  @Output() valueChanged = new EventEmitter<any>();
  // simpleModalService: any;
  item: any;
  constructor(
    private clientService: ClientService,
    private patientService: PatientService,
    private alert: AlertService,
    private simpleModalService: SimpleModalService,
    private itemService: ItemService,
    private commandService: CommandService,
    private router: Router,
    private priceTypeService: PriceTypeService
  ) {}
  priceTypePlantillaList: any;
  async ngOnInit() {
    console.log('arrMainNgFor', this.arrMainNgFor);
    await this.priceTypeService.getPriceType({}).subscribe((res) => {
      if (res) {
        this.priceTypePlantillaList = res;
      }
    });
  }
  deleteShoeSol(item: any, i: any, command: any) {
    if (item && i != 0) {
      this.itemService.deleteItem(item).subscribe((res) => {
        if (res) {
          this.alert.success(
            'Los datos de la plantilla fueron borrado en la base de datos !'
          );
          this.updateCommandLess(command, item);
          let update = {
            id: command.id,
            clientId: command.clientId,
            creationDate: command.creationDate,
            price: command.price,
            statusId: command.statusId,
          };
          this.commandService.insertUpdateCommand(update).subscribe((res) => {
            this.alert.success(
              'Los datos del usuario fueron modificado en la base de datos !'
            );
            window.location.reload();
          });
        } else {
          this.alert.error('El servidor se encontro con un problema');
        }
      });

      this.alert.warn('En Trabajo');
    } else {
      this.alert.error(
        'Si Queres Borrar Un Pedido Usas El Botton Borrar En La Linea Del Pedido'
      );
    }
  }
  addShoeSol(patient: any, item: any, index: any, j: any, command: any) {
    let title = 'Anadir Una plantilla';
    console.log(patient, 'patient', item, 'item');
    console.log(this.priceTypePlantillaList, 'priceTypePlantillaList');

    let form = new FormGroup({
      // patientFirstName: new FormControl(
      //   patient.patientFirstName,
      //   Validators.required
      // ),
      // patientName: new FormControl(patient.patientName, Validators.required),

      // model: new FormControl(item.model, Validators.required),
      model: new FormControl(),
      price: new FormControl(),
      quantity: new FormControl(1, Validators.required),
      size: new FormControl(item.size, Validators.required),
      correction: new FormControl(item.correction, Validators.required),
      oliva_BarraMetatarsal: new FormControl(
        item.oliva_BarraMetatarsal,
        Validators.required
      ),
      descargaAntepie: new FormControl(
        item.descargaAntepie,
        Validators.required
      ),
      rai: new FormControl(item.rai, Validators.required),
      rae: new FormControl(item.rae, Validators.required),
      arco: new FormControl(item.arco, Validators.required),
      contraArco: new FormControl(item.contraArco, Validators.required),
      alsa: new FormControl(item.alsa, Validators.required),
      rpi: new FormControl(item.rpi, Validators.required),
      rpe: new FormControl(item.rpe, Validators.required),
      alcochadaOEspolon: new FormControl(
        item.alcochadaOEspolon,
        Validators.required
      ),
      talonera: new FormControl(item.talonera, Validators.required),
      clinica: new FormControl(item.clinica, Validators.required),
    });

    let subscription = this.simpleModalService
      .addModal(GenericFormgroupComponent, {
        form: form,

        formRules: this.getFormAddShoeSol(),

        title: title,
      })
      .subscribe(async (item) => {
        if (item) {
          console.log(item, 'item');

          this.updatePrice(item.model, item);
          console.log(item, 'item');
          // console.log(item, 'item');
          patient.item.push(item);
          console.log(command, 'command');

          this.updateCommandMore(command, item);

          await this.patientService
            .insertUpdatePatient({
              id: patient.id,
              patientName: patient.patientName,
              patientFirstName: patient.patientFirstName,
              item: patient.item,
            })
            .subscribe((res) => {
              if (res) {
                // window.location.reload();
              } else {
                this.alert.error('El servidor se encontro con un problema');
              }
            });
          let update = {
            id: command.id,
            clientId: command.clientId,
            creationDate: command.creationDate,
            price: command.price,
            statusId: command.statusId,
          };
          await this.commandService
            .insertUpdateCommand(update)
            .subscribe((res) => {
              this.alert.success(
                'Los datos del usuario fueron modificado en la base de datos !'
              );
            });
          //We get modal result
          subscription.unsubscribe();
        }
      });
  }
  updatePrice(model: any, item: any) {
    const matchingObject = this.priceTypePlantillaList.find(
      (obj) => obj.id == model
    );
    const pricePlantilla = matchingObject ? matchingObject.price : null;
    const modelName = matchingObject ? matchingObject.name : null;
    console.log(matchingObject, 'matchingObject');
    item.price = pricePlantilla;
    item.model = modelName;
  }
  updateCommandMore(command: any, item: any) {
    let plantillaNombre: number = 0;

    let newprice = Math.round(parseFloat(item.price) * command.client.price);
    command.price = parseFloat(command.price) + newprice;
  }
  updateCommandLess(command: any, item: any) {
    let plantillaNombre: number = 0;

    let newprice = Math.round(parseFloat(item.price) * command.client.price);
    command.price = parseFloat(command.price) - newprice;
  }
  addPaciente() {
    let title = 'Anadir Un Paciente';
    //(item, 'item');
    let form = new FormGroup({
      id: new FormControl(),
      patientFirstName: new FormControl(),
      patientName: new FormControl(),

      model: new FormControl(),
      quantity: new FormControl(),
      size: new FormControl(),
      correction: new FormControl(),
      oliva_BarraMetatarsal: new FormControl(),
      descargaAntepie: new FormControl(),
      rai: new FormControl(),
      rae: new FormControl(),
      arco: new FormControl(),
      contraArco: new FormControl(),
      alsa: new FormControl(),
      rpi: new FormControl(),
      rpe: new FormControl(),
      alcochadaOEspolon: new FormControl(),
      talonera: new FormControl(),
      clinica: new FormControl(),
    });

    let subscription = this.simpleModalService
      .addModal(GenericFormgroupComponent, {
        form: form,

        formRules: this.getFormAddPatient(),
        title: title,
      })
      .subscribe(async (patient) => {
        if (patient) {
          let item = [
            {
              model: patient.model,
              quantity: 1,
              size: patient.size,
              correction: patient.correction,
              oliva_BarraMetatarsal: patient.oliva_BarraMetatarsal,
              descargaAntepie: patient.descargaAntepie,
              rai: patient.rai,
              rae: patient.rae,
              arco: patient.arco,
              contraArco: patient.contraArco,
              alsa: patient.alsa,
              rpi: patient.rpi,
              rpe: patient.rpe,
              alcochadaOEspolon: patient.alcochadaOEspolon,
              talonera: patient.talonera,
              clinica: patient.clinica,
            },
          ];
          patient['item'] = item;
          console.log(patient, 'patient');
          this.arrMainNgFor.patient.push(patient);

          await this.commandService
            .insertUpdateCommand(this.arrMainNgFor)
            .subscribe((res) => {
              if (res) {
                this.alert.success(
                  'Los datos del usuario fueron modificado en la base de datos !'
                );
                // window.location.reload();
              } else {
                this.alert.error('El servidor se encontro con un problema');
              }
            });

          //We get modal result
          subscription.unsubscribe();
        }
      });
  }
  deletePatiente(patient: any, indexItems: any) {
    if (patient && indexItems != 0) {
      this.patientService.deletePatient(patient).subscribe((res) => {
        if (res) {
          this.alert.success(
            'Los datos de la plantilla fueron borrado en la base de datos !'
          );
          window.location.reload();
        } else {
          this.alert.error('El servidor se encontro con un problema');
        }
      });

      this.alert.warn('En Trabajo');
    } else {
      this.alert.error(
        'Si Queres Borrar Un Pedido Usas El Botton Borrar En La Linea Del Pedido'
      );
    }
  }

  /// Modificar la forma del anadir pedido con los nuevos datos
  ///
  updatePlantija = (patient: any): void => {
    console.log(this.priceTypePlantillaList, 'priceTypePlantillaList');
    if (this.actions != 'InOrder') {
      console.log(patient.item[0], 'item');
      let item = patient.item[0];
      // this.router.navigate(['/dashboard'], {
      //   state: { patient: patient, item: item },
      // });
      let title = 'Cambiar Los Datos De la plantilla';
      let form = new FormGroup({
        id: new FormControl(item.id, Validators.required),
        patientFirstName: new FormControl(
          patient.patientFirstName,
          Validators.required
        ),
        patientName: new FormControl(patient.patientName, Validators.required),

        model: new FormControl(item.model, Validators.required),
        quantity: new FormControl(item.quantity, Validators.required),
        size: new FormControl(item.size, Validators.required),
        correction: new FormControl(item.correction, Validators.required),
        oliva_BarraMetatarsal: new FormControl(
          item.oliva_BarraMetatarsal,
          Validators.required
        ),
        descargaAntepie: new FormControl(
          item.descargaAntepie,
          Validators.required
        ),
        rai: new FormControl(item.rai, Validators.required),
        rae: new FormControl(item.rae, Validators.required),
        arco: new FormControl(item.arco, Validators.required),
        contraArco: new FormControl(item.contraArco, Validators.required),
        alsa: new FormControl(item.alsa, Validators.required),
        rpi: new FormControl(item.rpi, Validators.required),
        rpe: new FormControl(item.rpe, Validators.required),
        alcochadaOEspolon: new FormControl(
          item.alcochadaOEspolon,
          Validators.required
        ),
        talonera: new FormControl(item.talonera, Validators.required),
        clinica: new FormControl(item.clinica, Validators.required),
      });

      let subscription = this.simpleModalService
        .addModal(GenericFormgroupComponent, {
          form: form,

          formRules: this.formRulesUpdate,
          title: title,
        })
        .subscribe(async (data) => {
          if (data) {
            await this.itemService.insertUpdateItem(data).subscribe((res) => {
              if (res) {
                this.alert.success(
                  'Los datos del usuario fueron modificado en la base de datos !'
                );
                window.location.reload();
              } else {
                this.alert.error('El servidor se encontro con un problema');
              }
            });

            //We get modal result
            subscription.unsubscribe();
          }
        });
    } else if (this.actions == 'InOrder') {
      let a = 1;
      this.valueChanged.emit('1');
    }
  };
  getFormAddShoeSol() {
    return [
      {
        typeForm: 'dropdown',
        placeholder: 'Eligir Un Modelo',
        label: 'Selecionnar El Modelo',
        option: this.priceTypePlantillaList,
        keyOption: 'name',
        formControl: 'model',
      },
    ];
  }
  getFormAddPatient() {
    return [
      {
        typeForm: 'dropdown',
        placeholder: 'Eligir Un Modelo',
        label: 'Selecionnar El Modelo',
        option: this.priceTypePlantillaList,
        keyOption: 'name',
        formControl: 'model',
      },
      {
        typeForm: 'input',
        typeInput: 'text',
        placeholder: 'Apellido',
        label: 'Cambiar El Apellido',
        formControl: 'patientName',
      },
      {
        typeForm: 'input',
        typeInput: 'text',
        placeholder: 'Nombre',
        label: 'Cambiar El Nombre',
        formControl: 'patientFirstName',
      },
      // {
      //   typeForm: 'input',
      //   typeInput: 'text',
      //   placeholder: 'Cantidad',
      //   label: 'Cambiar Cantidad',
      //   formControl: 'quantity',
      // },
      {
        typeForm: 'input',
        typeInput: 'number',
        placeholder: 'Talle',
        label: 'Cambiar El Talle',
        formControl: 'size',
      },
      // {
      //   typeForm: 'input',
      //   typeInput: 'text',
      //   placeholder: 'Mail',
      //   label: 'Cambiar El model',
      //   formControl: 'model',
      // },

      {
        typeForm: 'input',
        typeInput: 'text',
        placeholder: 'Corrección',
        label: 'Cambiar Corrección',
        formControl: 'correction',
      },
      {
        typeForm: 'input',
        typeInput: 'text',
        placeholder: 'oliva_BarraMetatarsal',
        label: 'Cambiar Valor de la oliva_BarraMetatarsal',
        formControl: 'oliva_BarraMetatarsal',
      },
      {
        typeForm: 'input',
        typeInput: 'text',
        placeholder: 'descargaAntepie',
        label: 'Cambiar Valor de la descargaAntepie',
        formControl: 'descargaAntepie',
      },
      {
        typeForm: 'input',
        typeInput: 'text',
        placeholder: 'rai',
        label: 'Cambiar Valor del rai',
        formControl: 'rai',
      },
      {
        typeForm: 'input',
        typeInput: 'text',
        placeholder: 'rae',
        label: 'Cambiar Valor del rae',
        formControl: 'rae',
      },
      {
        typeForm: 'input',
        typeInput: 'text',
        placeholder: 'arco',
        label: 'Cambiar Valor del arco',
        formControl: 'arco',
      },
      {
        typeForm: 'input',
        typeInput: 'text',
        placeholder: 'contraArco',
        label: 'Cambiar Valor del contraArco',
        formControl: 'contraArco',
      },
      {
        typeForm: 'input',
        typeInput: 'text',
        placeholder: 'alsa',
        label: 'Cambiar Valor del alsa',
        formControl: 'alsa',
      },
      {
        typeForm: 'input',
        typeInput: 'text',
        placeholder: 'rpi',
        label: 'Cambiar Valor del rpi',
        formControl: 'rpi',
      },
      {
        typeForm: 'input',
        typeInput: 'text',
        placeholder: 'rpe',
        label: 'Cambiar Valor del rpe',
        formControl: 'rpe',
      },
      {
        typeForm: 'input',
        typeInput: 'text',
        placeholder: 'alcochadaOEspolon',
        label: 'Cambiar Valor del alcochadaOEspolon',
        formControl: 'alcochadaOEspolon',
      },
      {
        typeForm: 'input',
        typeInput: 'text',
        placeholder: 'talonera',
        label: 'Cambiar Valor del talonera',
        formControl: 'talonera',
      },
      {
        typeForm: 'input',
        typeInput: 'text',
        placeholder: 'clinica',
        label: 'Cambiar Valor del clinica',
        formControl: 'clinica',
      },
    ];
  }
  formRulesUpdate = [
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'Apellido',
      label: 'Cambiar El Apellido',
      formControl: 'patientName',
    },
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'Nombre',
      label: 'Cambiar El Nombre',
      formControl: 'patientFirstName',
    },
    // {
    //   typeForm: 'input',
    //   typeInput: 'text',
    //   placeholder: 'Cantidad',
    //   label: 'Cambiar Cantidad',
    //   formControl: 'quantity',
    // },
    {
      typeForm: 'input',
      typeInput: 'number',
      placeholder: 'Talle',
      label: 'Cambiar El Talle',
      formControl: 'size',
    },
    // {
    //   typeForm: 'input',
    //   typeInput: 'text',
    //   placeholder: 'Mail',
    //   label: 'Cambiar El model',
    //   formControl: 'model',
    // },

    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'Corrección',
      label: 'Cambiar Corrección',
      formControl: 'correction',
    },
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'oliva_BarraMetatarsal',
      label: 'Cambiar Valor de la oliva_BarraMetatarsal',
      formControl: 'oliva_BarraMetatarsal',
    },
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'descargaAntepie',
      label: 'Cambiar Valor de la descargaAntepie',
      formControl: 'descargaAntepie',
    },
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'rai',
      label: 'Cambiar Valor del rai',
      formControl: 'rai',
    },
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'rae',
      label: 'Cambiar Valor del rae',
      formControl: 'rae',
    },
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'arco',
      label: 'Cambiar Valor del arco',
      formControl: 'arco',
    },
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'contraArco',
      label: 'Cambiar Valor del contraArco',
      formControl: 'contraArco',
    },
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'alsa',
      label: 'Cambiar Valor del alsa',
      formControl: 'alsa',
    },
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'rpi',
      label: 'Cambiar Valor del rpi',
      formControl: 'rpi',
    },
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'rpe',
      label: 'Cambiar Valor del rpe',
      formControl: 'rpe',
    },
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'alcochadaOEspolon',
      label: 'Cambiar Valor del alcochadaOEspolon',
      formControl: 'alcochadaOEspolon',
    },
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'talonera',
      label: 'Cambiar Valor del talonera',
      formControl: 'talonera',
    },
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'clinica',
      label: 'Cambiar Valor del clinica',
      formControl: 'clinica',
    },
  ];
  addPatient = [
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'Apellido',
      label: 'Cambiar El Apellido',
      formControl: 'patientName',
    },
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'Nombre',
      label: 'Cambiar El Nombre',
      formControl: 'patientFirstName',
    },
  ];
}
