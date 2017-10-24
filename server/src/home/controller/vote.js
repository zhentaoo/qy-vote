'use strict';

// POST:
// fetch("http://10.12.59.81:8360/home/vote", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded"
//   },
//   body: "firstName=Nikhil&favColor=blue&password=easytoguess"
// })

// GET:
// fetch("http://10.12.59.81:8360/home/vote")

/**
 * rest controller
 * @type {Class}
 */
export default class extends think.controller.rest {
  /**
   * init
   * @param  {Object} http []
   * @return {}      []
   */
  init(http){
    super.init(http);
  }

  /**
   * before magic method
   * @return {Promise} []
   */
  __before() {
    this.header('Access-Control-Allow-Origin', '*');
    this.header('Access-Control-Allow-Headers', 'x-requested-with');
    this.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
    this.header('Access-Control-Allow-Credentials', 'true');
  }

  async postAction() {
    console.log('data:', this.post());

    return this.success({id: this.data});
  }

  async putAction() {
    console.log("id:", this.id);
    console.log('data:', this.post());

    let rows = await this.modelInstance.where({_id: this.id}).update(this.post());
    return this.success({id: this.id});
  }

  async deleteAction() {
    console.log('delete:', this.id);
    return this.fail('can not delete');
  }
}
