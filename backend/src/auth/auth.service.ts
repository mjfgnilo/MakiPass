import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SupabaseService } from '../common/supabase.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private supabase: SupabaseService,
  ) {}

  /** Verify a Supabase access token and return user info */
  async verifySupabaseToken(accessToken: string) {
    const { data, error } = await this.supabase
      .getClient()
      .auth.getUser(accessToken);
    if (error || !data.user) {
      throw new UnauthorizedException('Invalid token');
    }
    return data.user;
  }

  /** Exchange Supabase token for app JWT */
  async loginWithSupabaseToken(accessToken: string) {
    const user = await this.verifySupabaseToken(accessToken);
    const payload = {
      sub: user.id,
      email: user.email,
      role: 'player',
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user.id, email: user.email, role: 'player' },
    };
  }

  /** Admin login with username/password */
  async adminLogin(username: string, password: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('admins')
      .select('*')
      .eq('username', username)
      .single();

    if (error || !data) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await bcrypt.compare(password, data.password_hash);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: data.id,
      username: data.username,
      role: data.role || 'admin',
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: data.id, username: data.username, role: data.role || 'admin' },
    };
  }

  /** Hash a password for admin creation */
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
