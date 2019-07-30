import api from '../global/api';
import request from '../utils/request';

export default {
  random(data?:object) {
    return request.get(api.word.random, data);
  }
}