
const services = {

  async getRoute(origin, destination) {
    const mode = 'driving'; // 'walking';
    const APIKEY = 'AIzaSyDJTv_F4W9RS2hquqfKskuQWRivKhsnwes';
    const response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}}`);
    return await response.json();
  },

  async getDistanceAndDuration(origin, destination) {
    const mode = 'driving'; // 'walking';
    const APIKEY = 'AIzaSyDJTv_F4W9RS2hquqfKskuQWRivKhsnwes';
    const response = await fetch(`  https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=${APIKEY}&mode=${mode}`);
    return await response.json();
   },

  decode: function(t,e){for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})}

}

export default services;
