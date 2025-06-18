import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CiudadesModule } from './ciudades/ciudades.module';

@Module({
  imports: [CiudadesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
