(function (w, n) {
    if (typeof(w._metrilum) === 'undefined') {
        w._metrilum = [];
    }
    var data = w._metrilum.slice();
    var uuid4 = function () {
        var uuid = '', ii;
        for (ii = 0; ii < 32; ii += 1) {
            switch (ii) {
                case 8:
                case 20:
                    uuid += '-';
                    uuid += (Math.random() * 16 | 0).toString(16);
                    break;
                case 12:
                    uuid += '-';
                    uuid += '4';
                    break;
                case 16:
                    uuid += '-';
                    uuid += (Math.random() * 4 | 8).toString(16);
                    break;
                default:
                    uuid += (Math.random() * 16 | 0).toString(16);
            }
        }
        return uuid;
    };
    w._metrilum = {
        events: [],

        account: '{{account_id}}',
        sessionId: uuid4(),
        realUserId: '',

        push: function (action) {
            console.log('debug', action);
            //todo: провалидировать эвент
            switch (this.getActionName(action)) {
                case 'setAccount':
                    this.account = action[1];
                    break;

                case 'setRealUserID':
                    this.realUserId = action[1];
                    break;

                case 'trackPageview':
                    this.processEvent({
                        'account': this.account,
                        'name': 'pageview',
                        'user-agent': n.userAgent,
                        'session-id': this.sessionId,
                        'user-id': this.getUserID(),
                        'real-user-id': this.realUserId,
                    });
                    break;

                case 'event':
                    this.processEvent({
                        'account': this.account,
                        'name': action[1],
                        'user-agent': n.userAgent,
                        'session-id': this.sessionId,
                        'user-id': this.getUserID(),
                        'real-user-id': this.realUserId,
                    });
                    break;
            }
        },

        getActionName: function (action) {
            return action[0];
        },

        processEvent(event) {
            console.log(event);
            this.events.push(event);
        },

        makeSessionID() {
            this.sessionId = uuid4();
        },

        getUserID() {
            var userId = w.localStorage.getItem('_mtrlmid');
            if (!userId) {
                userId = uuid4();
                w.localStorage.setItem('_mtrlmid', userId);
            }
            return userId;
        }
    };

    data.forEach(function (value) {
        w._metrilum.push(value);
    })
})(window, navigator);
