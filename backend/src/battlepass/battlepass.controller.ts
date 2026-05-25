import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BattlepassService } from './battlepass.service';

@Controller('battlepass')
export class BattlepassController {
  constructor(private battlepassService: BattlepassService) {}

  @Get('tiers')
  async getTiers() {
    return this.battlepassService.getTiers();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('progress')
  async getProgress(@Request() req) {
    return this.battlepassService.getPlayerProgress(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('claim/:tierNumber')
  async claimReward(@Request() req, @Param('tierNumber') tierNumber: string) {
    return this.battlepassService.claimReward(req.user.id, parseInt(tierNumber));
  }
}
