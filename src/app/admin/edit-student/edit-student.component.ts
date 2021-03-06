import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Classe, Student } from 'src/app/models';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss'],
})
export class EditStudentComponent implements OnInit {

  // typer avec la structure disponible dans "models > student.ts"
  student!: Student;
  classes: String[] = [];

  studentForm!: FormGroup;

  // injecter le service StudentService
  constructor(private fb: FormBuilder, private location: Location, private activatedRoute: ActivatedRoute, private studentService: StudentService) {

    
    // initialiser la liste des classes disponibles avec le service StudentService
    const availableClasses$ = this.studentService.getAllClasses();
    availableClasses$.subscribe(classes => {
      this.classes = classes.map(classe => classe.id)
    });

    this.activatedRoute.params.subscribe(params => {
      // récupérer l'étudiant grâce à son id et au service StudentService
      const id = params.id;
      const student$ = this.studentService.getStudentById(id);
      student$.subscribe(student => {
        this.student = student;
        this.studentForm = this.fb.group({
          name: this.fb.control(this.student.name, {
            validators: [Validators.required]
          }),
          classe: this.fb.control(this.student.classe, {
            validators: [Validators.required]
          })
        });
      });
    });
  }

  ngOnInit(): void { }

  validate() {
    // enregistrer les modifications avec le service StudentService
    this.student.name = this.studentForm.value.name;
    this.student.classe = this.studentForm.value.classe;

    const updatedStudent$ = this.studentService.updateStudent(this.student);
    updatedStudent$.subscribe((student) => {})

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
