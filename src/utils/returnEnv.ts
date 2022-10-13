// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { EnvEnum } from 'src/enums/enviroments';
import { ErrorEnum } from 'src/enums/erros';

export const returnEnv = (env: EnvEnum): string => {
  switch (env) {
    case EnvEnum.DB:
      return String(process.env.DATABASE);
    case EnvEnum.USER_DB:
      return String(process.env.USERNAME);
    case EnvEnum.PASSWORD:
      return String(process.env.PASSWORD);
    case EnvEnum.PORT:
      return String(process.env.PORT);
    case EnvEnum.HOST:
      return String(process.env.HOST);
    default:
      throw new Error(ErrorEnum.ENV_NOT_FOUND);
  }
};
