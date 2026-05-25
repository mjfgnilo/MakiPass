import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { QrService } from './qr.service';

@Controller('qr')
export class QrController {
  constructor(private qrService: QrService) {}

  /** Player scans a QR code */
  @UseGuards(AuthGuard('jwt'))
  @Post('scan')
  async scanQr(@Body('code') code: string, @Request() req) {
    return this.qrService.validateQrCode(code, req.user.id);
  }

  /** Get all QR codes (admin view) */
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllQrCodes() {
    return this.qrService.getAllQrCodes();
  }
}
