import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule} from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { config } from "dotenv";
import { AuthModule } from './auth/auth.module';
import { SportModule } from './sport/sport.module';
import { PartyModule } from './party/party.module';
config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    AuthModule,
    SportModule,
    PartyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}