'use strict';

import Base from './base.js';

export default class extends Base {
    /**
    http://10.12.59.162:8360/home/stat?id=59f2e301c65f4a846868e8e7
   */
    async indexAction() {
      let get = await this.get();
      let id = get.id;

      let model = this.model('vote')
      let vote = await model.where({_id: id}).find()

      let choiceList = vote.VoteInfo.choiceList;
      let voteResult = vote.VoteResult;

      console.log("**choiceList**", choiceList);
      console.log("**voteResult**", voteResult);

      let res = choiceList.map(el => {
        return {
          name: el,
          num: 0
        }
      })
      console.log('**res**', res);

      res.forEach(el => {
        let {name, num} = el;
        console.log(name, num);

        voteResult.forEach(vote => {
          if (name == vote.vote) {
            num++
          }
        })
        el.num = num
      })

      return this.success({
        title: vote.VoteInfo.voteTitle,
        list: res,
        total: voteResult.length
      });
    }

    /**
      http://10.12.59.162:8360/home/stat/voted?id=59f2e301c65f4a846868e8e7&userKey=aaa123
    **/
    async votedAction() {
        let get = await this.get();
        console.log("get:", get);

        let model = this.model('vote')
        let vote = await model.where({_id: get.id}).find()
        console.log('vote:', vote);

        let VoteResult = vote.VoteResult;
        console.log('VoteResult:', VoteResult);

        let voted = false;
        if (!VoteResult || !VoteResult.length) {
          return this.success({voted: voted});
        }

        VoteResult.forEach(el => {
            if (el.userKey == get.userKey) {
              voted = true
            }
        })

        return this.success({voted: voted});
    }
}
