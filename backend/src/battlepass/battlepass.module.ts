import { Module } from '@nestjs/common';
import { BattlepassController } from './battlepass.controller';
import { BattlepassService } from './battlepass.service';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [BattlepassController],
  providers: [BattlepassService],
  exports: [BattlepassService],
})
export class BattlepassModule {}
