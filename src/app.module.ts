import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Product } from 'src/models/product';

import { AppService } from 'src/services/app';
import { ServiceProduct } from 'src/services/product';

import { AppController } from 'src/controllers/app';
import { ControllerProducts } from 'src/controllers/products';

import { returnEnv } from 'src/utils/returnEnv';

import { EnvEnum } from 'src/enums/enviroments';

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
