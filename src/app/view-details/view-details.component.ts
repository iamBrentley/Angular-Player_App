import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { Player } from '../models/player.model';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { NgConfirmService} from 'ng-confirm-box'

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {
  public dataSource!: MatTableDataSource<Player>;
  public player!: Player[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayColumns: string[] = ['id', 'FirstName', 'LastName', 'Email', 'Alias', 'Rank', 'Agent', 'Action'];

  constructor(private Api: ApiService, private router:Router, private confirm: NgConfirmService){}
  ngOnInit(): void {
    this.getPlayer();
  }

  getPlayer(){
    this.Api.getPlayer().subscribe(res=>{
      this.player = res;
      this.dataSource = new MatTableDataSource(this.player);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  Edit(id:number){
    this.router.navigate(['update', id]);
  }

  Delete(id: number){
    this.Api.deletePlayer(id).subscribe(res=>{
      this.getPlayer();
    })
  }
}
