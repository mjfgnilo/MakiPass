import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MissionsModule } from './missions/missions.module';
import { QrModule } from './qr/qr.module';
import { BattlepassModule } from './battlepass/battlepass.module';
import { AdminModule } from './admin/admin.module';
import { ValidatorModule } from './validator/validator.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    AuthModule,
    MissionsModule,
    QrModule,
    BattlepassModule,
    AdminModule,
    ValidatorModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
