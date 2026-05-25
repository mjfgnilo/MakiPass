import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../common/supabase.service';

@Injectable()
export class AdminService {
  constructor(private supabase: SupabaseService) {}

  async getDashboardStats() {
    const [players, missions, scans] = await Promise.all([
      this.supabase.getClient().from('player_progress').select('*', { count: 'exact', head: true }),
      this.supabase.getClient().from('missions').select('*', { count: 'exact', head: true }),
      this.supabase.getClient().from('scan_logs').select('*', { count: 'exact', head: true }),
    ]);

    return {
      total_players: players.count || 0,
      total_missions: missions.count || 0,
      total_scans: scans.count || 0,
    };
  }

  async getScanLogs(limit = 50) {
    const { data, error } = await this.supabase
      .getClient()
      .from('scan_logs')
      .select('*, qr_codes(code, type), missions(title)')
      .order('scanned_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data;
  }
}
