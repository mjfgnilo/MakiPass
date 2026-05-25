import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidatorGuard } from '../auth/roles.guard';
import { ValidatorService } from './validator.service';

@Controller('validator')
@UseGuards(AuthGuard('jwt'), ValidatorGuard)
export class ValidatorController {
  constructor(private validatorService: ValidatorService) {}

  @Get('pending')
  async getPendingScans() {
    return this.validatorService.getPendingScans();
  }

  @Get('flagged')
  async getFlaggedScans() {
    return this.validatorService.getFlaggedScans();
  }

  @Get('stats')
  async getStats() {
    return this.validatorService.getValidationStats();
  }

  @Post('approve/:scanId')
  async approveScan(@Param('scanId') scanId: string, @Request() req) {
    return this.validatorService.approveScan(scanId, req.user.id);
  }

  @Post('reject/:scanId')
  async rejectScan(
    @Param('scanId') scanId: string,
    @Body('reason') reason: string,
    @Request() req,
  ) {
    return this.validatorService.rejectScan(scanId, req.user.id, reason);
  }
}
