import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';



@Module({
    imports:[
  TypeOrmModule.forRootAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'mysql',
      host: configService.getOrThrow('DB_HOST'),
      port: configService.getOrThrow('DB_PORT'),
      username: configService.getOrThrow('DB_USERNAME'),
      password: configService.getOrThrow('DB_PASSWORD'),
      database: configService.getOrThrow('DB_NAME'),
      entities: [User], // Ensure this line includes the User entity
      synchronize: true,
    })
    }),
    ]
})
export class DatabaseModule {}