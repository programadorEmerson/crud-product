import { Product } from './models/product';
import { Module } from '@nestjs/common';
import { AppController } from './controllers/app';
import { AppService } from './services/app';
import { ControllerProducts } from './controllers/products';
import { ServiceProduct } from './services/product';
import { returnEnv } from './utils/returnEnv';
import { EnvEnum } from './enums/enviroments';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: returnEnv(EnvEnum.HOST),
      port: Number(returnEnv(EnvEnum.PORT)),
      username: returnEnv(EnvEnum.USER_DB),
      password: returnEnv(EnvEnum.PASSWORD),
      database: returnEnv(EnvEnum.DB),
      models: [Product],
    }),
    SequelizeModule.forFeature([Product]),
  ],
  controllers: [AppController, ControllerProducts],
  providers: [AppService, ServiceProduct],
})
export class AppModule {
  constructor(private sequelize: Sequelize) {
    this.sequelize.sync();
    this.sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
      });
  }
}
