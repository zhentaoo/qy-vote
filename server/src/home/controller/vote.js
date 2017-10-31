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
    init(http) {
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

    // 新建投票
    /**
    fetch('http://10.12.59.81:8360/home/vote', {
      method: 'POST',
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
      body: "VoteInfo="+JSON.stringify({voteTitle: '测试', createUserKey: '我的天xxx', choiceList: ['火影','柯南','海贼']})
    })
    **/
    async postAction() {
        let pk = await this.modelInstance.getPk();
        let data = this.post();
        console.log(data);

        delete data[pk];
        if (think.isEmpty(data)) {
            return this.fail('data is empty');
        }

        data = JSON.parse(data.VoteInfo)
        let insertId = await this.modelInstance.add({VoteInfo: data});
        return this.success({_id: insertId});
    }

    // 投票，id，userkey，vote
    /**
    fetch(`http://10.12.59.162:8360/home/vote/59f2e301c65f4a846868e8e7`, {
      method: 'PUT',
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
      body: "VoteResult="+JSON.stringify({
        userKey: 'aaa123',
        userName: 'aaa',
        vote: '日本'})
    })
    **/
    async putAction(){
      if (!this.id) {
        return this.fail('params error');
      }

      let pk = await this.modelInstance.getPk();
      console.log('**pk:**', pk);

      let data = await this.modelInstance.where({[pk]: this.id}).find()
      console.log('**data:**', data);

      let originData = data.VoteResult;
      if (!originData) {
        originData = [];
      }
      console.log('**originData:**', originData);

      console.log('**this.post:**', this.post());
      let newData = JSON.parse(this.post().VoteResult);
      let {userKey, vote, userName} = newData;
      console.log('**newData:**', newData);

      originData.push(newData)
      console.log('**originData**', originData);

      let rows = await this.modelInstance.where({[pk]: this.id}).update({VoteResult: originData});
      return this.success({affectedRows: rows});
    }

    // 禁止删除
    async deleteAction() {
        console.log('delete:', this.id);
        return this.fail('can not delete');
    }
}
