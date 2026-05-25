import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /** Player login: exchange Supabase access token for app JWT */
  @Post('login')
  async playerLogin(@Body('access_token') accessToken: string) {
    return this.authService.loginWithSupabaseToken(accessToken);
  }

  /** Admin login with username/password */
  @Post('admin/login')
  async adminLogin(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.authService.adminLogin(username, password);
  }

  /** Get current user profile */
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getProfile(@Request() req) {
    return req.user;
  }
}
