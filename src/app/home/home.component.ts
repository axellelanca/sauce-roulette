import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // todo utiliser la structure disponible dans "models > student.ts" pour typer cette liste
  // todo initialiser cette liste par un tableau vide
  classes = [
    {id: '1', name: 'classe 1'},
    {id: '2', name: 'classe 2'},
    {id: '3', name: 'classe 3'},
    {id: '4', name: '2A Init'},
    {id: '5', name: '2A WD'}
  ]

  // todo utiliser la structure disponible dans "models > student.ts" pour typer la liste
  // todo remplacer toute cette liste par un tableau vide
  students: {[k: string]: string[]} = {
    'classe 1': ['Thérèse Pirouet', 'Peverell Dufour', 'Rosamonde Bourget', 'Amélie Melanson'],
    'classe 2': ['Seymour Melanson', 'Neville Angélil', 'Sébastien Guédry'],
    'classe 3': ['Jean Descoteaux', 'Charlotte Sicard', 'Millicent Clément', 'Joy Gamelin'],
    '2A Init': ['Jean Melanson', 'Charlotte Angélil', 'Sébastien Bourget', 'Amélie Dufour', 'Joy Pirouet'],
    '2A WD': ['Seymour Guédry', 'Rosamonde Peverell', 'Niguella Gartman', 'Armand Loiselier'],
  };

  // l'étudiant mis dans la sauce
  saucedStudent!: string;

  sauceForm!: FormGroup;
  // todo injecter le service StudentService
  constructor(private fb: FormBuilder) { 
    // Construction du formulaire (Reactive Forms)
    this.sauceForm = this.fb.group({
      classe: this.fb.control('', {
        // todo ajouter un validateur "required"
        validators: []
      })
    });

    // todo utiliser le service StudentService pour récupérer la liste des classes disponibles
  }

  onSelectChange() {
    // todo lorsque la classe sélectionnée change, il faut utiliser StudentService pour récupérer la liste des étudiants de cette classe
  }

  ngOnInit(): void {
  }

  get classeControl() {
    return this.sauceForm?.controls.classe;
  }

  onSubmit() {
    /* 
    todo implémenter la méthode de sorte à ce qu'elle choisisse un élève au hasard parmi la liste d'élèves
    todo cet élève devra ensuite être affecté au champ "saucedStudent"
    */
    
  }

  private pickRandom(array: string[]): string {
    const random = Math.floor(Math.random() * array.length);
    return array[random];
  }
}
