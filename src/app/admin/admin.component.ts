import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Student } from '../models';
import { StudentService } from '../shared/services/student.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  displayedColumns = ['classe', 'name', 'action'];

  // utiliser la structure disponible dans "models > student.ts"
  // remplacer par un tableau vide
  students: Student[] = [];

  dataSource!: MatTableDataSource<Student>;

  // todo injecter le service StudentService
  constructor(private router: Router, private studentService: StudentService) {
  }

  ngOnInit(): void {
    // todo initialiser la liste "students" en appelant le services
    const studentsList$ = this.studentService.getAllStudents();
    studentsList$.subscribe( students => {
      this.students = students;
      // todo une fois que la liste est initialisée, initialiser la dataSource avec
      this.dataSource = new MatTableDataSource(this.students);
    });
  }

  applyFilter($event: KeyboardEvent) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editStudent(studentId: string) {
    this.router.navigate(['admin', 'student', studentId]);
  }

  addStudent() {
    this.router.navigate(['admin', 'student', 'add']);
  }

  deleteStudent(studentId: string) {
    // appeler le service StudentService pour supprimer l'étudiant
    const deleteStudent$ = this.studentService.deleteStudent(studentId);
    deleteStudent$.subscribe(() => { });

    // une fois que l'étudiant a été supprimé, mettre à jour la liste d'étudiants
    const studentsList$ = this.studentService.getAllStudents();

    studentsList$.subscribe((students) => {
      this.students = students;
      // une fois que la liste d'étudiants est mise à jour, mettre à jour la dataSource
      this.dataSource = new MatTableDataSource(this.students);
    });
  }
}
