import {AuthResponseModel} from '../core/services/auth-response.model';

export const getAuthTokens = ()=>{
  const authTokens:AuthResponseModel={
    refresh:localStorage.getItem('refresh')??'',
    access:localStorage.getItem('access')??'',
  }
  return authTokens;
}
