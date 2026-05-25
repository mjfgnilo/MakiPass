import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../common/supabase.service';

@Injectable()
export class BattlepassService {
  constructor(private supabase: SupabaseService) {}

  /** Get battlepass tiers */
  async getTiers() {
    const { data, error } = await this.supabase
      .getClient()
      .from('battlepass_tiers')
      .select('*')
      .order('tier_number', { ascending: true });
    if (error) throw error;
    return data;
  }

  /** Get player progress */
  async getPlayerProgress(playerId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('player_progress')
      .select('*')
      .eq('player_id', playerId)
      .single();

    if (error && error.code === 'PGRST116') {
      // No progress yet, return defaults
      return { player_id: playerId, xp: 0, current_tier: 0 };
    }
    if (error) throw error;
    return data;
  }

  /** Add XP to player */
  async addXp(playerId: string, xpAmount: number) {
    const progress = await this.getPlayerProgress(playerId);
    const newXp = (progress.xp || 0) + xpAmount;

    // Determine new tier
    const tiers = await this.getTiers();
    let currentTier = 0;
    for (const tier of tiers) {
      if (newXp >= tier.xp_required) {
        currentTier = tier.tier_number;
      }
    }

    const { data, error } = await this.supabase
      .getClient()
      .from('player_progress')
      .upsert({
        player_id: playerId,
        xp: newXp,
        current_tier: currentTier,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  /** Claim a tier reward */
  async claimReward(playerId: string, tierNumber: number) {
    const progress = await this.getPlayerProgress(playerId);
    if (progress.current_tier < tierNumber) {
      return { success: false, message: 'Tier not yet reached' };
    }

    const { data, error } = await this.supabase
      .getClient()
      .from('reward_claims')
      .insert({
        player_id: playerId,
        tier_number: tierNumber,
        claimed_at: new Date().toISOString(),
      })
      .select()
      .single();
    if (error) throw error;
    return { success: true, claim: data };
  }

  /** Create a tier (admin) */
  async createTier(tier: { tier_number: number; xp_required: number; reward_description: string }) {
    const { data, error } = await this.supabase
      .getClient()
      .from('battlepass_tiers')
      .insert(tier)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}
