'use strict';

export default class extends think.controller.base {
  /**
   * some base method in here
   */
   __call(){
     console.log('base,cors');
     let method = this.http.method.toLowerCase();
     if(method === 'options'){
       this.setCorsHeader();
       this.end();
       return;
     }
     this.setCorsHeader();
     return super.__call();
   }

   __before() {
       this.header('Access-Control-Allow-Origin', '*');
       this.header('Access-Control-Allow-Headers', 'x-requested-with');
       this.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
       this.header('Access-Control-Allow-Credentials', 'true');
   }

   setCorsHeader(){
     this.header('Access-Control-Allow-Origin', '*');
     this.header('Access-Control-Allow-Headers', 'x-requested-with');
     this.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
     this.header('Access-Control-Allow-Credentials', 'true');
   }
}
