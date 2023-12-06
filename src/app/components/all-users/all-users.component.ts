import { UsersService } from './../../services/users.service';
import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent {
  allUsers: User[] = [];
  displayedColumns: string[] = ['name', 'email', 'phone' , 'update' , 'delete' , 'info'];
  dataSource = new MatTableDataSource<User>();
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _UsersService: UsersService) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.dataSource.filterPredicate = (data: User, filter: string) => {  // filter by name
      return data.name.toLowerCase().includes(filter);
    };

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getAllUsers() {
    this._UsersService.getAllUsers().subscribe((data) => {
      this.allUsers = data.map((e : any)=>{
        const d = e.payload.doc.data();
        d.id = e.payload.doc.id;
        this.allUsers = d;
        return d;
      })
      this.dataSource.data = this.allUsers;
    })
  }

  deleteUser(userId : string) {
    this._UsersService.deleteUser(userId);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
