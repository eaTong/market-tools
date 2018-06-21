/**
 * Created by eaTong on 2018/6/16 .
 * Description:
 */
import AppStore from './AppStore';
import DemandStore from './DemandStore';
//UPDATE_TAG:importStore

export default {
  app: new AppStore(),
demand: new DemandStore(),
//UPDATE_TAG:registerStore
}
