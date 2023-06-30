import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../models/player.model';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit  {

  public registerForm!: FormGroup;  
  AgentList:any;
  public IdToUpdate!: number;
  public isUpdate: boolean = false;
  playerDetail!: Player;


  constructor(private builder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private Api: ApiService,
    private toast: NgToastService,
    private router: Router){

  }
  ngOnInit(): void {
    this.registerForm = this.builder.group({
      FirstName: [''],
      LastName: [''],
      Email: [''],
      Alias: [''],
      Rank: [''],
      Agent: ['']
    });

    this.Api.getAgents().subscribe(data=> {this.AgentList = data})

    this.activeRoute.params.subscribe(val=>{
      this.IdToUpdate = val['id'];
      this.Api.getRegisteredPlayer(this.IdToUpdate).subscribe(res=>{
      this.isUpdate = true;
      this.UpdateFill(res);
      })
    })
  }
  Submit(){
    console.log(this.registerForm.value);
    this.Api.postPlayer(this.registerForm.value).subscribe(res=>{
      this.toast.success({detail:"Success", summary:"Player Details Added", duration:3000});
      alert("Details Saved");
      this.registerForm.reset();
    })
  }

  Update(){
    console.log(this.registerForm.value);
    this.Api.updatePlayer(this.registerForm.value, this.IdToUpdate).subscribe(res=>{
      this.toast.success({detail:"Success", summary:"Player Details Added", duration:3000});
      this.registerForm.reset();
      alert("Details Updated")
      this.router.navigate(['viewdetails']);
    })
  }

  UpdateFill(player:Player){
    this.registerForm.setValue({
      FirstName: player.FirstName,
      LastName: player.LastName,
      Email: player.Email,
      Alias: player.Alias,
      Rank: player.Rank,
      Agent: player.Agent
    })
  }
}
