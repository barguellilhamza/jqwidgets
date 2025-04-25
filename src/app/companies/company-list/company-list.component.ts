import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { CompanyService, Company } from '../company.service';
import { jqxGridModule,jqxGridComponent  } from 'jqwidgets-ng/jqxgrid';
import { jqxRadioButtonModule } from 'jqwidgets-ng/jqxradiobutton';
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  standalone: true,
  imports: [jqxGridModule,jqxRadioButtonModule,jqxButtonModule],
})
export class CompanyListComponent implements OnInit {
  @ViewChild('myGrid') myGrid!: jqxGridComponent;
  @ViewChild('endEdit') endEdit!: ElementRef;
  companies: Company[] = [];  // Stocke toutes les entreprises récupérées
  columns: any[] = [
    { text: 'Company Name', datafield: 'companyName', width: 200 },
    { text: 'Contact Name', datafield: 'contactName', width: 150 },
    { text: 'Title', datafield: 'title', width: 100 },
    { text: 'Address', datafield: 'address', width: 100 },
    { text: 'City', datafield: 'city', width: 100 },
    { text: 'Country', datafield: 'country', width: 100 },
  ];  // Déclare toutes les colonnes à afficher dans la grille

  dataAdapter: any;
  toolbarInitialized = false;
  rendertoolbar = (toolbar: any): void => {
    if (this.toolbarInitialized || !toolbar || !toolbar[0]) return; // évite la recréation multiple

    this.toolbarInitialized = true; // on empêche la prochaine fois
    let container = document.createElement('div');
    container.style.margin = '5px';
    let buttonContainer1 = document.createElement('div');
    let buttonContainer2 = document.createElement('div');
    let buttonContainer3 = document.createElement('div');
    let buttonContainer4 = document.createElement('div');
    buttonContainer1.id = 'buttonContainer1';
    buttonContainer2.id = 'buttonContainer2';
    buttonContainer3.id = 'buttonContainer3';
    buttonContainer4.id = 'buttonContainer4';
    buttonContainer1.style.cssText = 'float: left';
    buttonContainer2.style.cssText = 'float: left; margin-left: 5px';
    buttonContainer3.style.cssText = 'float: left; margin-left: 5px';
    buttonContainer4.style.cssText = 'float: left; margin-left: 5px';
    container.appendChild(buttonContainer1);
    container.appendChild(buttonContainer2);
    container.appendChild(buttonContainer3);
    container.appendChild(buttonContainer4);
    if (toolbar && toolbar[0]) {
      toolbar[0].appendChild(container);
    }    
    let addRowButton = jqwidgets.createInstance('#buttonContainer1', 'jqxButton', { theme: 'material', width: 105, value: 'Add New Row' });
    let addMultipleRowsButton = jqwidgets.createInstance('#buttonContainer2', 'jqxButton', { theme: 'material', width: 170, value: 'Add Multiple New Rows' });
    let deleteRowButton = jqwidgets.createInstance('#buttonContainer3', 'jqxButton', { theme: 'material', width: 150, value: 'Delete Selected Row' });
    let updateRowButton = jqwidgets.createInstance('#buttonContainer4', 'jqxButton', { theme: 'material', width: 155, value: 'Update Selected Row' });
    addRowButton.addEventHandler('click', () => {
      console.log("111");
      const datarow = {
        id: this.companies.length + 1,
        companyName: '',
        contactName: '',
        title: '',
        address: '',
        city: '',
        country: ''
      };
      this.myGrid.addrow(null, datarow);
      // Envoie de la requête pour ajouter l'entreprise
      this.companyService.addCompany(datarow).subscribe((savedCompany) => {
        console.log('Entreprise ajoutée avec succès', savedCompany);

        // Ajoute la nouvelle entreprise à la grille
        this.myGrid.addrow(null, savedCompany);

        // Mise à jour de la liste des entreprises
        this.companies.push(savedCompany);

        // Met à jour les données dans le dataAdapter de jqxGrid
        this.dataAdapter.localdata = this.companies;
        this.myGrid.updatebounddata();
      });
    })
    deleteRowButton.addEventHandler('click', () => {
      const selectedrowindex = this.myGrid.getselectedrowindex();
      console.log(selectedrowindex);
      const dataInfo = this.myGrid.getdatainformation();
      const rowscount = Number(dataInfo?.rowscount);  // 👈 Conversion ici
    
      if (!isNaN(rowscount) && selectedrowindex >= 0 && selectedrowindex < rowscount) {
        const selectedRowData = this.myGrid.getrowdata(selectedrowindex);
        const id = selectedRowData.id;
    
        // Supprimer visuellement la ligne dans la grille
        this.myGrid.deleterow(id);
    
        // Appel API pour suppression réelle
        this.companyService.deleteCompany(id).subscribe(() => {
          console.log('Entreprise supprimée du backend');
    
          // Mettre à jour localement la liste après suppression
          this.companies = this.companies.filter(company => Number(company.id) !== Number(id));

          console.log(this.companies);
          this.myGrid.clear(); // Vide toutes les données de la grille
          const source = {
            localdata: this.companies,  // Mettre à jour les données dans le dataAdapter
            datatype: 'array',
            datafields: [
              { name: 'id' },
              { name: 'companyName' },
              { name: 'contactName' },
              { name: 'title' },
              { name: 'address' },
              { name: 'city' },
              { name: 'country' }
            ]
          };
    
          this.dataAdapter = new jqx.dataAdapter(source); // Re-créer le dataAdapter
    
          // Mettre à jour la grille avec les nouvelles données
          this.myGrid.updatebounddata();  // Force la mise à jour des données dans la grille
        }, error => {
          console.error('Erreur lors de la suppression de l\'entreprise', error);
          
          // Optionnel : ajouter la ligne supprimée de la grille si l'API échoue
          this.myGrid.addrow(null, selectedRowData);
        });
      } else {
        console.warn('Index sélectionné invalide ou pas de données.');
      }
    });
    
    
  };
  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe((data) => {
      console.log('Données récupérées:', data);

      // Garder toutes les entreprises
      this.companies = data;

      // Création du dataAdapter
      const source = {
        localdata: this.companies,  // Utilise toutes les données récupérées
        datatype: 'array',
        datafields: [
          { name: 'id' },
          { name: 'companyName' },
          { name: 'contactName' },
          { name: 'title' },
          { name: 'address' },
          { name: 'city' },
          { name: 'country' }
        ]
      };

      this.dataAdapter = new jqx.dataAdapter(source);  // Création du dataAdapter
    });
  }
  addRowToGrid(): void {
    // Crée une nouvelle ligne (tu peux personnaliser les données)
    const newRow = {
      id: this.companies.length + 1, // ID unique (par exemple, un incrément)
      companyName: 'Nouvelle Entreprise',
      contactName: 'Contact Name',
      title: 'Title',
      address: 'Address',
      city: 'City',
      country: 'Country'
    };
  
    // Envoie de la requête pour ajouter l'entreprise
    this.companyService.addCompany(newRow).subscribe((savedCompany) => {
      console.log('Entreprise ajoutée avec succès', savedCompany);

      // Ajoute la nouvelle entreprise à la grille
      this.myGrid.addrow(null, savedCompany);

      // Mise à jour de la liste des entreprises
      this.companies.push(savedCompany);

      // Met à jour les données dans le dataAdapter de jqxGrid
      this.dataAdapter.localdata = this.companies;
      this.myGrid.updatebounddata();
    });
  }
  cellEndEditEvent(event: any): void {
    let args = event.args;
    const rowIndex = args.rowindex;
    const datafield = args.datafield;
    const newValue = args.value;
  
    // Récupère la ligne existante
    const currentRow = this.myGrid.getrowdata(rowIndex);
  
    // Applique manuellement la modification
    const updatedRow: Company = {
      ...currentRow,
      [datafield]: newValue
    };
  
    console.log('Ligne modifiée envoyée au backend:', updatedRow);
  
    this.companyService.updateCompany(updatedRow).subscribe((updatedCompany) => {
      console.log('Entreprise mise à jour avec succès:', updatedCompany);
  
      // Mettre à jour localement la liste si nécessaire
      this.companies[rowIndex] = updatedCompany;
  
      // Refresh data dans la grille
      this.dataAdapter.localdata = this.companies;
      this.myGrid.updatebounddata('cells');  // Juste les cellules
    });
  
    this.endEdit.nativeElement.innerHTML =
      `✔️ Modification enregistrée — Colonne: ${datafield}, Ligne: ${rowIndex + 1}, Nouvelle Valeur: ${newValue}`;
  }
  
}
