import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Classe, Student } from 'src/app/models';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent implements OnInit {

  // typer avec la structure disponible dans "models > student.ts"
  student: Student = {
    id: '',
    name: '',
    classe: '',
  
};
  classes: String[] = [];

  studentForm!: FormGroup;

  // injecter le service StudentService
  constructor(private fb: FormBuilder, private location: Location, private activatedRoute: ActivatedRoute, private studentService: StudentService) {

    this.studentForm = this.fb.group({
      name: this.fb.control(this.student.name, {
        validators: [Validators.required],
      }),
      classe: this.fb.control(this.student.classe, {
        validators: [Validators.required],
      }),
    });


    // initialiser la liste des classes disponibles avec le service StudentService
    const availableClasses$ = this.studentService.getAllClasses();
    availableClasses$.subscribe(classes => {
      this.classes = classes.map(classe => classe.id)
    });

  }

  ngOnInit(): void { }

  validate() {
    // enregistrer les modifications avec le service StudentService
    this.student.name = this.studentForm.value.name;
    this.student.classe = this.studentForm.value.classe;

    const updatedStudent$ = this.studentService.createStudent(this.student);
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
