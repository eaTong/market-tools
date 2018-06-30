/**
 * Created by eaTong on 2018/6/30 .
 * Description:
 */


export function getUrlList(images) {
  if (!images) {
    return [];
  }

  if (typeof images === 'string') {
    try {
      return JSON.parse(images).map(img => `/upload/img/${img}`);
    } catch (e) {
      return [];
    }
  } else {
    return images;
  }

}
