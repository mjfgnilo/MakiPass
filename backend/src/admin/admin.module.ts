import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { CommonModule } from '../common/common.module';
import { MissionsModule } from '../missions/missions.module';
import { QrModule } from '../qr/qr.module';
import { BattlepassModule } from '../battlepass/battlepass.module';

@Module({
  imports: [CommonModule, MissionsModule, QrModule, BattlepassModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
