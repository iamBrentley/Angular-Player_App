import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Player } from '../models/player.model';
import { Agents } from '../models/agents.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private PlayerUrl: string = 'http://localhost:3000/PlayerDetails'
  private AgentsUrl: string = 'http://localhost:3000/Agents'

  constructor(private http: HttpClient) { }

  postPlayer(registerObject: Player){
    return this.http.post<Player>(`${this.PlayerUrl}`, registerObject)
  }

  getPlayer(){
    return this.http.get<Player[]>(`${this.PlayerUrl}`)
  }

  getAgents(){
    return this.http.get<Agents[]>(`${this.AgentsUrl}`)
  }

  updatePlayer(registerObject: Player, id: number){
    return this.http.put<Player>(`${this.PlayerUrl}/${id}`, registerObject)
  }

  deletePlayer(id: number){
    return this.http.delete<Player>(`${this.PlayerUrl}/${id}`)
  }

  getRegisteredPlayer(id: number){
    return this.http.get<Player>(`${this.PlayerUrl}/${id}`)
  }

  getRegisteredPlayerAgent(name: string){
    return this.http.get<Agents>(`${this.AgentsUrl}/${name}`)
  }
}
