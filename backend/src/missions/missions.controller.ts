import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MissionsService } from './missions.service';

@Controller('missions')
export class MissionsController {
  constructor(private missionsService: MissionsService) {}

  @Get()
  async getAllMissions() {
    return this.missionsService.getAllMissions();
  }

  @Get(':id')
  async getMission(@Param('id') id: string) {
    return this.missionsService.getMissionById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('player/my')
  async getMyMissions(@Request() req) {
    return this.missionsService.getPlayerMissions(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('player/complete/:missionId')
  async completeMission(@Request() req, @Param('missionId') missionId: string) {
    return this.missionsService.completeMission(req.user.id, missionId);
  }
}
