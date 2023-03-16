import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SimpleModalService } from 'ngx-simple-modal';
import { AlertService } from 'src/app/services/alert.service';
import { ClientService } from 'src/app/services/crud/client.service';
import { CommandService } from 'src/app/services/crud/command.service';
import { ItemService } from 'src/app/services/crud/item.service';
import { GenericFormgroupComponent } from '../generic-formgroup/generic-formgroup.component';

@Component({
  selector: 'app-generic-order-details-card',
  templateUrl: './generic-order-details-card.component.html',
  styleUrls: ['./generic-order-details-card.component.scss'],
})
export class GenericOrderDetailsCardComponent implements OnInit {
  @Input() arrMainNgFor: any;
  @Input() actions: any;
  // simpleModalService: any;
  item: any;
  constructor(
    private clientService: ClientService,
    private alert: AlertService,
    private simpleModalService: SimpleModalService,
    private itemService: ItemService,
    private commandService: CommandService
  ) {}

  ngOnInit(): void {
    console.log(this.arrMainNgFor, 'my array ');
  }
  deleteShoeSol(item: any, i: any) {
    console.log(item, 'item');
    console.log(i, 'iii');
    if (item && i != 0) {
      this.itemService.deleteItem(item).subscribe((res) => {
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
  deletePatiente(patient: any, indexItems: any) {
    if (patient && indexItems != 0) {
      this.commandService.deleteCommand(indexItems).subscribe((res) => {
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
  updatePlantija = (item: any): void => {
    let title = 'Cambiar Los Datos De la plantilla';
    console.log(item, 'item');
    let form = new FormGroup({
      id: new FormControl(item.id, Validators.required),
      itemFirstName: new FormControl(item.itemFirstName, Validators.required),
      itemName: new FormControl(item.itemName, Validators.required),

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
          console.log(data, 'dataaaaaaaaaa');
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
          console.log('data del item', data);
        }
      });
  };

  formRulesUpdate = [
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'Apellido',
      label: 'Cambiar El Apellido',
      formControl: 'itemName',
    },
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'Nombre',
      label: 'Cambiar El Nombre',
      formControl: 'itemFirstName',
    },
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'Cantidad',
      label: 'Cambiar Cantidad',
      formControl: 'quantity',
    },
    {
      typeForm: 'input',
      typeInput: 'number',
      placeholder: 'Talle',
      label: 'Cambiar El Talle',
      formControl: 'size',
    },
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'Mail',
      label: 'Cambiar El model',
      formControl: 'model',
    },

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
