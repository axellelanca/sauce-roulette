import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Classe, Student } from '../models/student';
import { StudentService } from '../shared/services/student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // utiliser la structure disponible dans "models > student.ts" pour typer cette liste
  // initialiser cette liste par un tableau vide

  classes: Classe[] = []
  students: Student[] = []

  // l'étudiant mis dans la sauce
  saucedStudent!: string;

  sauceForm!: FormGroup;
  
  // injecter le service StudentService
  constructor(private fb: FormBuilder, private studentService: StudentService) {
    // Construction du formulaire (Reactive Forms)
    this.sauceForm = this.fb.group({
      classe: this.fb.control('', {
        // ajouter un validateur "required"
        validators: [Validators.required]
      })
    });

    // utiliser le service StudentService pour récupérer la liste des classes disponibles
    const availableClass$ = this.studentService.getAllClasses();

    availableClass$.subscribe((classes) => {
      this.classes = classes
    });
  }

  onSelectChange() {
    //  lorsque la classe sélectionnée change, il faut utiliser StudentService pour récupérer la liste des étudiants de cette classe
    const changeclass$ = this.studentService.getStudentsByClasse(this.sauceForm.value.classe);

    changeclass$.subscribe((students) => {
      this.students = students
    });
  }

  ngOnInit(): void {
  }

  get classeControl() {
    return this.sauceForm?.controls.classe;
  }

  onSubmit() {
    /* 
    implémenter la méthode de sorte à ce qu'elle choisisse un élève au hasard parmi la liste d'élèves
    cet élève devra ensuite être affecté au champ "saucedStudent"
    */

    const selectedClass = this.students.map(student => student.name);
    const selectedStudent = this.pickRandom(selectedClass);
    this.saucedStudent = selectedStudent;

  }

  private pickRandom(array: string[]): string {
    const random = Math.floor(Math.random() * array.length);
    return array[random];
  }


}
