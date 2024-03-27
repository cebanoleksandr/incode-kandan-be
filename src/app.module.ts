import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    BoardsModule,
    CardsModule,
    CommentsModule,
    MongooseModule.forRoot('mongodb+srv://cebanoleksandr:S1PdDw0wL1RQ7ppx@cluster0.4yjvmas.mongodb.net/incode-boards')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
