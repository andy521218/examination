export function lastTime(e) {
    if(!e) return '从未登入'
    let time = new Date(e * 1);
    let year = time.getFullYear();
    let month = time.getMonth();
    let day = time.getDate();
    let hours = time.getHours();
    let min = time.getMinutes();
    return `${year}-${month + 1}-${day} ${hours}:${min}`;
  }

  export default {
    install(Vue) {
      Vue.filter('lastTime', lastTime);
    }
  };