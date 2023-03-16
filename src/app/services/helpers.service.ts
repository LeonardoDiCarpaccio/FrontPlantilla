import { Injectable } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { PaperSize, Workbook } from 'exceljs';
import * as fs from 'file-saver';
@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  constructor() {}

  dateNow(onlyDate: boolean) {
    var date = new Date();
    var now_utc = Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours() + 2,
      date.getUTCMinutes(),
      date.getUTCSeconds()
    );

    var finalDate = new Date(now_utc)
      .toISOString()
      .replace(/T/, ' ')
      .replace(/\..+/, '');
    finalDate = onlyDate ? finalDate.substring(0, 10) : finalDate;

    return finalDate;
  }

  createCsvModel(items: any) {
    const title_file = 'Excel Pedido Plantija';
    let workbook = new Workbook();
    const header = [
      '#',
      'Cantidad',
      'Modelo',
      'Talle',
      'Correcciones Der/Izq',
      'Appelido',
      'Correcciones',
      'COMENT',
    ];

    let worksheetPresta = workbook.addWorksheet('Feuil1');
    // Set the page properties
    worksheetPresta.pageSetup.paperSize = 8; // A4
    worksheetPresta.pageSetup.margins = {
      left: 0.2,
      right: 0.2,
      top: 0.5,
      bottom: 0.5,
      header: 0.05,
      footer: 0.05,
    };
    let headerRowPresta = worksheetPresta.addRow(header);
    headerRowPresta.eachCell((cell: any, number: any) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '#000000' },
        bgColor: { argb: '' },
      };
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFF' },
        size: 16,
      };
    });

    // Add this code
    worksheetPresta.getColumn('B').eachCell((cell, rowNumber) => {
      cell.alignment = {
        vertical: 'middle', // center the value vertically in the cell
        horizontal: 'center', // center the value horizontally in the cell
      };
      if (rowNumber > 1 && cell.value) {
        cell.value = Number(cell.value); // Convert the value to number
      }
    });
    // worksheetPresta.addRow([]);

    const billateralRegex = /-Billateral/g; // Regular expression to match "Billateral"
    const derechaRegex = /-Derecha/g; // Regular expression to match "Derecha"
    const izquierdaRegex = /-Izquierda/g; // Regular expression to match "Izquierda"

    items.patient.forEach((patient) => {
      patient.item.forEach((item) => {
        let billateral = '';
        let izquierda = '';
        let derecha = '';
        //ARCO
        if (item.arco) {
          if (item.arco.includes('Izquierda')) {
            item.arco = item.arco.replace(izquierdaRegex, ''); // String with all "Billateral" matches removed
            izquierda += item.arco;
          } else if (item.arco.includes('Derecha')) {
            item.arco = item.arco.replace(derechaRegex, '');
            derecha += item.arco;
          } else {
            item.arco = item.arco.replace(billateralRegex, ''); // String with all "Billateral" matches removed
            billateral += item.arco;
          }
        }

        //CONTRA ARCOO
        if (item.contraArco) {
          if (item.contraArco.includes('Izquierda')) {
            item.contraArco = item.contraArco.replace(izquierdaRegex, '');
            izquierda += '+' + 'CONTRA ARCO ' + item.contraArco;
          } else if (item.contraArco.includes('Derecha')) {
            item.contraArco = item.contraArco.replace(derechaRegex, '');
            derecha += '+' + 'CONTRA ARCO ' + item.contraArco;
          } else {
            item.contraArco = item.contraArco.replace(billateralRegex, '');
            billateral += '+' + 'CONTRA ARCO ' + item.contraArco;
          }
        }

        //OLIVAAA BARRA METATARSAL
        if (item.oliva_BarraMetatarsal) {
          if (item.oliva_BarraMetatarsal.includes('Izquierda')) {
            item.oliva_BarraMetatarsal = item.oliva_BarraMetatarsal.replace(
              izquierdaRegex,
              ''
            ); // String with all "Billateral" matches removed
            izquierda += '+' + item.oliva_BarraMetatarsal;
          } else if (item.oliva_BarraMetatarsal.includes('Derecha')) {
            item.oliva_BarraMetatarsal = item.oliva_BarraMetatarsal.replace(
              derechaRegex,
              ''
            );
            derecha += '+' + item.oliva_BarraMetatarsal;
          } else {
            item.oliva_BarraMetatarsal = item.oliva_BarraMetatarsal.replace(
              billateralRegex,
              ''
            ); // String with all "Billateral" matches removed
            billateral += '+' + item.oliva_BarraMetatarsal;
          }
        }

        //DESCARGA ANTEPIE
        if (item.descargaAntepie) {
          if (item.descargaAntepie.includes('Izquierda')) {
            item.descargaAntepie = item.descargaAntepie.replace(
              izquierdaRegex,
              ''
            ); // String with all "Billateral" matches removed
            izquierda += '+' + item.descargaAntepie;
          } else if (item.descargaAntepie.includes('Derecha')) {
            item.descargaAntepie = item.descargaAntepie.replace(
              derechaRegex,
              ''
            );
            derecha += '+' + item.descargaAntepie;
          } else {
            item.descargaAntepie = item.descargaAntepie.replace(
              billateralRegex,
              ''
            ); // String with all "Billateral" matches removed
            billateral += '+' + item.descargaAntepie;
          }
        }

        //DESCARGA RAI
        if (item.rai) {
          if (item.rai.includes('Izquierda')) {
            item.rai = item.rai.replace(izquierdaRegex, ''); // String with all "Billateral" matches removed
            izquierda += '+' + 'RAI ' + item.rai;
          } else if (item.rai.includes('Derecha')) {
            item.rai = item.rai.replace(derechaRegex, '');
            derecha += '+' + 'RAI ' + item.rai;
          } else {
            item.rai = item.rai.replace(billateralRegex, ''); // String with all "Billateral" matches removed
            billateral += '+' + 'RAI ' + item.rai;
          }
        }

        //DESCARGA RAE
        if (item.rae) {
          if (item.rae.includes('Izquierda')) {
            item.rae = item.rae.replace(izquierdaRegex, ''); // String with all "Billateral" matches removed
            izquierda += '+' + 'RAE ' + item.rae;
          } else if (item.rae.includes('Derecha')) {
            item.rae = item.rae.replace(derechaRegex, '');
            derecha += '+' + 'RAE ' + item.rae;
          } else {
            item.rae = item.rae.replace(billateralRegex, ''); // String with all "Billateral" matches removed
            billateral += '+' + 'RAE ' + item.rae;
          }
        }

        //DESCARGA RPI
        if (item.rpi) {
          if (item.rpi.includes('Izquierda')) {
            item.rpi = item.rpi.replace(izquierdaRegex, ''); // String with all "Billateral" matches removed
            izquierda += '+' + 'RPI ' + item.rpi;
          } else if (item.rpi.includes('Derecha')) {
            item.rpi = item.rpi.replace(derechaRegex, '');
            derecha += '+' + 'RPI ' + item.rpi;
          } else {
            item.rpi = item.rpi.replace(billateralRegex, ''); // String with all "Billateral" matches removed
            billateral += '+' + 'RPI ' + item.rpi;
          }
        }

        //DESCARGA ALSA
        if (item.alsa) {
          if (item.alsa.includes('Izquierda')) {
            item.alsa = item.alsa.replace(izquierdaRegex, ''); // String with all "Billateral" matches removed
            izquierda += '+' + item.alsa;
          } else if (item.alsa.includes('Derecha')) {
            item.alsa = item.alsa.replace(derechaRegex, '');
            derecha += '+' + item.alsa;
          } else {
            item.alsa = item.alsa.replace(billateralRegex, ''); // String with all "Billateral" matches removed
            billateral += '+' + item.alsa;
          }
        }

        //DESCARGA ALSA
        if (item.rpe) {
          if (item.rpe.includes('Izquierda')) {
            item.rpe = item.rpe.replace(izquierdaRegex, ''); // String with all "Billateral" matches removed
            izquierda += '+' + 'RPE ' + item.rpe;
          } else if (item.rpe.includes('Derecha')) {
            item.rpe = item.rpe.replace(derechaRegex, '');
            derecha += '+' + 'RPE ' + item.rpe;
          } else {
            item.rpe = item.rpe.replace(billateralRegex, ''); // String with all "Billateral" matches removed
            billateral += '+' + 'RPE ' + item.rpe;
          }
        }

        //DESCARGA alcochadaOEspolon
        if (item.alcochadaOEspolon) {
          if (item.alcochadaOEspolon.includes('Izquierda')) {
            item.alcochadaOEspolon = item.alcochadaOEspolon.replace(
              izquierdaRegex,
              ''
            ); // String with all "Billateral" matches removed
            izquierda += '+' + item.alcochadaOEspolon;
          } else if (item.alcochadaOEspolon.includes('Derecha')) {
            item.alcochadaOEspolon = item.alcochadaOEspolon.replace(
              derechaRegex,
              ''
            );
            derecha += '+' + item.alcochadaOEspolon;
          } else {
            item.alcochadaOEspolon = item.alcochadaOEspolon.replace(
              billateralRegex,
              ''
            ); // String with all "Billateral" matches removed
            billateral += '+' + item.alcochadaOEspolon;
          }
        }
        billateral = billateral + ' BILLATERAL';
        derecha = derecha + ' DERECHA';
        izquierda = izquierda + ' IZQUIERDA';

        let newrow = [
          item.id,
          item.quantity,
          item.model,
          item.size,
          item.correction,
          patient.patientName + ' ' + patient.patientFirstName,
          'A ' +
            (billateral != ' BILLATERAL' ? billateral : '') +
            (derecha != ' DERECHA' ? '--' + derecha : '') +
            (izquierda != ' IZQUIERDA' ? '--' + izquierda : ''),
          item.talonera + ' ' + item.clinica,
        ];
        worksheetPresta.addRow(newrow);
      });
    });

    // Set the width of columns A to F
    worksheetPresta.getColumn('A').width = 6;
    worksheetPresta.getColumn('B').width = 6;
    worksheetPresta.getColumn('C').width = 6;
    worksheetPresta.getColumn('D').width = 6;
    worksheetPresta.getColumn('E').width = 6;
    worksheetPresta.getColumn('F').width = 20;
    worksheetPresta.getColumn('G').width = 55;
    worksheetPresta.getColumn('H').width = 35;
    // Set the height of the G cell in each row to adjust to the text
    for (let i = 2; i <= worksheetPresta.rowCount; i++) {
      const cellA = worksheetPresta.getCell(`A${i}`);
      const cellB = worksheetPresta.getCell(`B${i}`);
      const cellC = worksheetPresta.getCell(`C${i}`);
      const cellD = worksheetPresta.getCell(`D${i}`);
      const cellE = worksheetPresta.getCell(`E${i}`);
      const cellF = worksheetPresta.getCell(`F${i}`);
      const cellG = worksheetPresta.getCell(`G${i}`);
      const cellH = worksheetPresta.getCell(`H${i}`);

      cellA.alignment = {
        wrapText: true,
        vertical: 'middle',
        horizontal: 'center',
      };
      cellA.font = {
        size: 12,
      };
      cellB.alignment = {
        wrapText: true,
        vertical: 'middle',
        horizontal: 'center',
      };
      cellB.font = {
        size: 12,
      };
      cellC.alignment = {
        wrapText: true,
        vertical: 'middle',
        horizontal: 'center',
      };
      cellC.font = {
        size: 12,
      };
      cellD.alignment = {
        wrapText: true,
        vertical: 'middle',
        horizontal: 'center',
      };
      cellD.font = {
        size: 12,
      };
      cellE.alignment = {
        wrapText: true,
        vertical: 'middle',
        horizontal: 'center',
      };
      cellE.font = {
        size: 12,
      };
      cellF.alignment = {
        wrapText: true,
        vertical: 'middle',
        horizontal: 'center',
      };
      cellF.font = {
        size: 14,
      };
      cellG.alignment = {
        wrapText: true,
        vertical: 'middle',
      };
      cellG.font = {
        size: 15,
      };
      cellH.alignment = {
        wrapText: true,
        vertical: 'middle',
      };
      cellH.font = {
        size: 13,
      };
    }

    //Generate & Save Excel File
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, title_file + '.xlsx');
    });
  }
}