import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss'],
})
export class EditStudentComponent implements OnInit {

  // todo typer avec la structure disponible dans "models > student.ts"
  // todo ne pas initialiser l'étudiant en dur comme c'est fait actuellement
  student = {
    id: '1',
    name: 'Toto Tata',
    classe: 'classe 1',
  };

  // todo ne pas initialiser la liste des classes disponibles en dur comme c'est fait actuellement mais plutôt avec une liste vide
  classes = ['classe 1', 'classe 2', 'classe 3', '2A Init', '2A WD'];

  studentForm!: FormGroup;

  // todo injecter le service StudentService
  constructor(private fb: FormBuilder, private location: Location, private activatedRoute: ActivatedRoute) {
    this.studentForm = this.fb.group({
      name: this.fb.control(this.student.name, {
        validators: [Validators.required],
      }),
      classe: this.fb.control(this.student.classe, {
        validators: [Validators.required],
      }),
    });

    // todo initialiser la liste des classes disponibles avec le service StudentService

    this.activatedRoute.params.subscribe(params => {
      // todo récupérer l'étudiant grâce à son id et au service StudentService
      const id = params.id;
    });
  }

  ngOnInit(): void {}

  validate() {
    // todo enregistrer les modifications avec le service StudentService
  }

  cancel() {
    this.location.back();
  }

  get nameControl() {
    return this.studentForm.controls.name;
  }

  get classeControl() {
    return this.studentForm.controls.classe;
  }
}
