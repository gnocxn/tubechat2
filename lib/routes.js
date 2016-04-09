if(Meteor.isClient){
	BlazeLayout.setRoot('body');
}

FlowRouter.route('/', {
	name : 'models.list',
	action: function() {
		BlazeLayout.render('defaultLayout', {main: 'modelList'});
	}
});

FlowRouter.route('/:gender', {
	name : 'models.list.byGender',
	action: function() {
		BlazeLayout.render('defaultLayout', {main: 'modelList'});
	}
});

FlowRouter.route('/tags/:tag', {
	name: 'models.list.byTag',
	action() {
		BlazeLayout.render('defaultLayout', {main: 'modelList'});
	}
});

FlowRouter.route('/:gender/:username', {
	name: 'models.single',
	action({username}) {
		BlazeLayout.render('defaultLayout', {main: 'modelSingle'});
	}
});

