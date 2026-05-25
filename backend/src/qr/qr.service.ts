import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';
import { SupabaseService } from '../common/supabase.service';

@Injectable()
export class QrService {
  constructor(private supabase: SupabaseService) {}

  /** Generate a static QR code for a mission */
  async generateQrCode(missionId: string) {
    const code = uuidv4();
    const { data, error } = await this.supabase
      .getClient()
      .from('qr_codes')
      .insert({
        code,
        mission_id: missionId,
        type: 'static',
        is_active: true,
      })
      .select()
      .single();
    if (error) throw error;

    const qrImage = await QRCode.toDataURL(code);
    return { ...data, qr_image: qrImage };
  }

  /** Generate a rotating (chain) QR code that changes every 30s */
  async generateChainQrCode(missionId: string) {
    const code = uuidv4();
    const expiresAt = new Date(Date.now() + 30000).toISOString();

    const { data, error } = await this.supabase
      .getClient()
      .from('qr_codes')
      .insert({
        code,
        mission_id: missionId,
        type: 'chain',
        is_active: true,
        expires_at: expiresAt,
      })
      .select()
      .single();
    if (error) throw error;

    const qrImage = await QRCode.toDataURL(code);
    return { ...data, qr_image: qrImage };
  }

  /** Validate a scanned QR code */
  async validateQrCode(code: string, playerId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('qr_codes')
      .select('*, missions(*)')
      .eq('code', code)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      return { valid: false, message: 'Invalid or expired QR code' };
    }

    // Check expiration for chain codes
    if (data.type === 'chain' && data.expires_at) {
      if (new Date(data.expires_at) < new Date()) {
        return { valid: false, message: 'QR code has expired' };
      }
    }

    // Log the scan
    await this.supabase.getClient().from('scan_logs').insert({
      player_id: playerId,
      qr_code_id: data.id,
      mission_id: data.mission_id,
      scanned_at: new Date().toISOString(),
    });

    return {
      valid: true,
      mission: data.missions,
      qr_code: { id: data.id, type: data.type },
    };
  }

  /** Get all QR codes (admin) */
  async getAllQrCodes() {
    const { data, error } = await this.supabase
      .getClient()
      .from('qr_codes')
      .select('*, missions(title)')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }
}
