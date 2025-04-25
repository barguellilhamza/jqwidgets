import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { jqxRadioButtonModule } from 'jqwidgets-ng/jqxradiobutton';
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';
import { MonthlyPayService, MonthlyPaySummary } from '../monthly-pay.service';

@Component({
  selector: 'app-monthly-pay-list',
  templateUrl: './monthly-pay-list.component.html',
  standalone: true,
  imports: [jqxGridModule, jqxRadioButtonModule, jqxButtonModule]
})
export class MonthlyPayListComponent implements OnInit {
  @ViewChild('myGrid') myGrid!: jqxGridComponent;
  @ViewChild('endEdit') endEdit!: ElementRef;

  monthlyPays: MonthlyPaySummary[] = [];
  dataAdapter: any;

  columns: any[] = [
    { text: 'Mois', datafield: 'mois', width: 100 },
    { text: 'Entreprise 1', datafield: 'entreprise1', width: 150 },
    { text: 'Pay 1', datafield: 'pay1', width: 100 },
    { text: 'Entreprise 2', datafield: 'entreprise2', width: 150 },
    { text: 'Pay 2', datafield: 'pay2', width: 100 },
    { text: 'Gain', datafield: 'gain', width: 100 },
    { text: 'Gain 2', datafield: 'gain2', width: 100 },  // Nouvelle colonne gain2
    { text: 'Gain Total', datafield: 'gainT', width: 100 }  // Nouvelle colonne gainT
  ];

  toolbarInitialized = false;
  rendertoolbar = (toolbar: any): void => {
    if (this.toolbarInitialized || !toolbar || !toolbar[0]) return;
    this.toolbarInitialized = true;

    let container = document.createElement('div');
    container.style.margin = '5px';

    const buttons = ['Add Row', 'Delete Row', 'Update Row'];
    buttons.forEach((label, index) => {
      const btnContainer = document.createElement('div');
      btnContainer.id = `toolbarBtn${index}`;
      btnContainer.style.cssText = `float: left; margin-left: ${index === 0 ? 0 : 5}px`;
      container.appendChild(btnContainer);
    });

    toolbar[0].appendChild(container);

    const addBtn = jqwidgets.createInstance('#toolbarBtn0', 'jqxButton', { theme: 'material', width: 100, value: 'Add Row' });
    const delBtn = jqwidgets.createInstance('#toolbarBtn1', 'jqxButton', { theme: 'material', width: 100, value: 'Delete Row' });
    const updBtn = jqwidgets.createInstance('#toolbarBtn2', 'jqxButton', { theme: 'material', width: 100, value: 'Update Row' });

    addBtn.addEventHandler('click', () => {
      const newRow: MonthlyPaySummary = {
        mois: '',
        entreprise1: '',
        pay1: 0,
        entreprise2: '',
        pay2: 0,
        gain: 0,
        gain2: 0,  // Initialiser gain2
        gainT: 0   // Initialiser gainT
      };
      this.myGrid.addrow(null, newRow);
      this.monthlyPayService.addMonthlyPay(newRow).subscribe((savedRow) => {
        this.monthlyPays.push(savedRow);
        this.dataAdapter.localdata = this.monthlyPays;
        this.myGrid.updatebounddata();
      });
    });

    delBtn.addEventHandler('click', () => {
      const index = this.myGrid.getselectedrowindex();
      const selectedRow = this.myGrid.getrowdata(index);
      if (!selectedRow || selectedRow.id == null) return;
      this.myGrid.deleterow(selectedRow.id);
      this.monthlyPayService.deleteMonthlyPay(selectedRow.id).subscribe(() => {
        this.monthlyPays = this.monthlyPays.filter(p => p.id !== selectedRow.id);
        this.dataAdapter.localdata = this.monthlyPays;
        this.myGrid.updatebounddata();
      });
    });

    updBtn.addEventHandler('click', () => {
      const index = this.myGrid.getselectedrowindex();
      const updatedRow = this.myGrid.getrowdata(index);
      this.monthlyPayService.updateMonthlyPay(updatedRow).subscribe((res) => {
        this.monthlyPays[index] = res;
        this.dataAdapter.localdata = this.monthlyPays;
        this.myGrid.updatebounddata();
      });
    });
  };

  constructor(private monthlyPayService: MonthlyPayService) {}

  ngOnInit(): void {
    this.monthlyPayService.getMonthlyPaySummaries().subscribe((data) => {
      this.monthlyPays = data;

      const source = {
        localdata: this.monthlyPays,
        datatype: 'array',
        datafields: [
          { name: 'id' },
          { name: 'mois' },
          { name: 'entreprise1' },
          { name: 'pay1', type: 'number' },
          { name: 'entreprise2' },
          { name: 'pay2', type: 'number' },
          { name: 'gain', type: 'number' },
          { name: 'gain2', type: 'number' },  // Ajouter gain2 dans les datafields
          { name: 'gainT', type: 'number' }   // Ajouter gainT dans les datafields
        ]
      };

      this.dataAdapter = new jqx.dataAdapter(source);
    });
  }

  cellEndEditEvent(event: any): void {
    const args = event.args;
    const rowIndex = args.rowindex;
    const datafield = args.datafield;
    const newValue = args.value;

    const currentRow = this.myGrid.getrowdata(rowIndex);
    const updatedRow: MonthlyPaySummary = {
      ...currentRow,
      [datafield]: newValue
    };

    this.monthlyPayService.updateMonthlyPay(updatedRow).subscribe((updated) => {
      this.monthlyPays[rowIndex] = updated;
      this.dataAdapter.localdata = this.monthlyPays;
      this.myGrid.updatebounddata('cells');
    });

    this.endEdit.nativeElement.innerHTML =
      `✔️ Ligne mise à jour — ${datafield}: ${newValue}`;
  }
}
