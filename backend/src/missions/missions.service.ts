import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../common/supabase.service';

@Injectable()
export class MissionsService {
  constructor(private supabase: SupabaseService) {}

  async getAllMissions() {
    const { data, error } = await this.supabase
      .getClient()
      .from('missions')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }

  async getMissionById(id: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('missions')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }

  async createMission(mission: {
    title: string;
    description: string;
    xp_reward: number;
    type: string;
    starts_at?: string;
    ends_at?: string;
  }) {
    const { data, error } = await this.supabase
      .getClient()
      .from('missions')
      .insert(mission)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateMission(id: string, updates: Partial<any>) {
    const { data, error } = await this.supabase
      .getClient()
      .from('missions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async deleteMission(id: string) {
    const { error } = await this.supabase
      .getClient()
      .from('missions')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return { deleted: true };
  }

  async getPlayerMissions(playerId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('player_missions')
      .select('*, missions(*)')
      .eq('player_id', playerId);
    if (error) throw error;
    return data;
  }

  async completeMission(playerId: string, missionId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('player_missions')
      .upsert({
        player_id: playerId,
        mission_id: missionId,
        completed_at: new Date().toISOString(),
        status: 'completed',
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}
