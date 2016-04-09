if (Meteor.isClient) {
    BlazeLayout.setRoot('body');
}

FlowRouter.route('/', {
    name: 'models.list',
    action: function () {
        BlazeLayout.render('defaultLayout', {main: 'models.featured'});
    }
});

FlowRouter.route('/:gender', {
    name: 'models.list.byGender',
    action: function () {
        BlazeLayout.render('defaultLayout', {main: 'models.byGender'});
    }
});

FlowRouter.route('/tags/:tag', {
    name: 'models.list.byTag',
    action() {
        BlazeLayout.render('defaultLayout', {main: 'models.byTag'});
    }
});

FlowRouter.route('/:gender/:username', {
    name: 'models.single',
    action() {
        BlazeLayout.render('defaultLayout', {main: 'modelSingle'});
    },
    subscriptions: function (params) {
        this.register('modelSingle', Meteor.subscribe('models.single', params.username));
    }
});

let trackPage = (context) => {
    analytics.page(context.path);
}

FlowRouter.triggers.enter([trackPage]);
