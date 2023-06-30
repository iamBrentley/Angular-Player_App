import { Component, OnInit } from '@angular/core';
import { Player } from '../models/player.model';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Agents } from '../models/agents.model';

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.css']
})
export class DetailedViewComponent implements OnInit{
  public playerId!: number;
  public agentId!: number;
  public agentName!: string;
  playerDetail!: Player;
  agentDetail!: Agents;

  constructor(private activeRoute: ActivatedRoute, private Api:ApiService){}

  ngOnInit(): void {
    this.activeRoute.params.subscribe(val=>{
      this.playerId = val['id'];
      this.FetchPlayerDetails(this.playerId);
    })
    
    
  }

  FetchPlayerDetails(playerId:number){
    this.Api.getRegisteredPlayer(playerId).subscribe(res=>{
      this.playerDetail = res;
      console.log(this.playerDetail);
    })
  }

  FetchAgentDetails(agentId:number){
    this.Api.getRegisteredPlayerAgent(this.agentName).subscribe(res=>{
      this.agentDetail = res;
      console.log(this.agentDetail);
    })

  }

}
