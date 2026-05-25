import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../common/supabase.service';

@Injectable()
export class ValidatorService {
  constructor(private supabase: SupabaseService) {}

  /** Get pending scans that need verification */
  async getPendingScans() {
    const { data, error } = await this.supabase
      .getClient()
      .from('scan_logs')
      .select('*, qr_codes(code, type, mission_id), missions(title)')
      .eq('verified', false)
      .order('scanned_at', { ascending: false });
    if (error) throw error;
    return data;
  }

  /** Approve a scan */
  async approveScan(scanId: string, validatorId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('scan_logs')
      .update({
        verified: true,
        verified_by: validatorId,
        verified_at: new Date().toISOString(),
        status: 'approved',
      })
      .eq('id', scanId)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  /** Reject a scan (flag as fraudulent) */
  async rejectScan(scanId: string, validatorId: string, reason: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('scan_logs')
      .update({
        verified: true,
        verified_by: validatorId,
        verified_at: new Date().toISOString(),
        status: 'rejected',
        rejection_reason: reason,
      })
      .eq('id', scanId)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  /** Get flagged/anomalous scans */
  async getFlaggedScans() {
    const { data, error } = await this.supabase
      .getClient()
      .from('scan_logs')
      .select('*, qr_codes(code, type), missions(title)')
      .eq('status', 'flagged')
      .order('scanned_at', { ascending: false });
    if (error) throw error;
    return data;
  }

  /** Get validation stats */
  async getValidationStats() {
    const [pending, approved, rejected] = await Promise.all([
      this.supabase.getClient().from('scan_logs').select('*', { count: 'exact', head: true }).eq('verified', false),
      this.supabase.getClient().from('scan_logs').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
      this.supabase.getClient().from('scan_logs').select('*', { count: 'exact', head: true }).eq('status', 'rejected'),
    ]);

    return {
      pending: pending.count || 0,
      approved: approved.count || 0,
      rejected: rejected.count || 0,
    };
  }
}
