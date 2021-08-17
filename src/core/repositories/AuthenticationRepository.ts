import acrabDb from '../database/acrabDb';
import { INTEGRATION_APPS } from '../constants/authentication';
import { IDBAuthenticationLogin } from '../interfaces/IAuthentication';

class AuthenticationRepository {
  async getUser(login, password): Promise<IDBAuthenticationLogin> {
    return acrabDb('t_api_access').select(
      'apa_login AS login',
      'apa_password AS password',
      'itg_secret AS secret'
      )
      .innerJoin('t_integration', 'apa_itg_id', 'itg_id')
      .where('apa_login', login)
      .andWhere('apa_password', password)
      .andWhere('apa_itg_id', INTEGRATION_APPS.ACRAB_API)
      .first();
  }
}

export default new AuthenticationRepository();
