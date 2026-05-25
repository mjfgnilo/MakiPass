import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/roles.guard';
import { AdminService } from './admin.service';
import { MissionsService } from '../missions/missions.service';
import { QrService } from '../qr/qr.service';
import { BattlepassService } from '../battlepass/battlepass.service';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class AdminController {
  constructor(
    private adminService: AdminService,
    private missionsService: MissionsService,
    private qrService: QrService,
    private battlepassService: BattlepassService,
  ) {}

  @Get('dashboard')
  async getDashboard() {
    return this.adminService.getDashboardStats();
  }

  @Get('scan-logs')
  async getScanLogs() {
    return this.adminService.getScanLogs();
  }

  // Mission CRUD
  @Post('missions')
  async createMission(@Body() body: any) {
    return this.missionsService.createMission(body);
  }

  @Put('missions/:id')
  async updateMission(@Param('id') id: string, @Body() body: any) {
    return this.missionsService.updateMission(id, body);
  }

  @Delete('missions/:id')
  async deleteMission(@Param('id') id: string) {
    return this.missionsService.deleteMission(id);
  }

  // QR Code generation
  @Post('qr/generate/:missionId')
  async generateQr(@Param('missionId') missionId: string) {
    return this.qrService.generateQrCode(missionId);
  }

  @Post('qr/generate-chain/:missionId')
  async generateChainQr(@Param('missionId') missionId: string) {
    return this.qrService.generateChainQrCode(missionId);
  }

  // Battlepass tier management
  @Post('tiers')
  async createTier(@Body() body: { tier_number: number; xp_required: number; reward_description: string }) {
    return this.battlepassService.createTier(body);
  }
}
