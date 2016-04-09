import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

//let ModelSubs = new SubsManager();

Template.modelList.onCreated(function () {
	let self = this;

	self.loaded = new ReactiveVar(0);
	self.limit = new ReactiveVar(40);
	self.filter = new ReactiveVar({
		is_online: true,
		current_show: {$ne: 'private'}
	});
	self.ready = new ReactiveVar(false);


	let options = {
		sort: {
			num_users: -1
		}
	}

	self.autorun(function (c) {
		let gender = FlowRouter.getParam('gender');
		let tag = FlowRouter.getParam('tag');

		let _filter = self.filter.get();

		if (gender) {
			_filter = _.extend(_filter, {gender: gender});
		}

		if(tag){
			_filter = _.extend(_filter, {tags: tag});
		}

		let limit = self.limit.get();

		options = _.extend(options, {limit: limit});
		let subscription = self.subscribe('models.list', _filter, options);
		if(subscription.ready()){
			//self.ready.set(true);
			self.loaded.set(limit);
		}

		//console.log(_filter);

		/*		let gender = _gender.get();
		 let tag = _tag.get();

		 if (gender) {
		 let _filter = self.filter.get();
		 _filter = _.extend(_filter, {gender: gender});
		 self.filter.set(_filter);
		 }

		 if (tag) {
		 let _filter = self.filter.get();
		 _filter = _.extend(_filter, {tags: tag});
		 self.filter.set(_filter);
		 }
		 let limit = self.limit.get();
		 let _filter = self.filter.get();
		 options = _.extend(options, {limit: limit});
		 let subscription = self.subscribe('models.list', _filter, options);
		 if(subscription.ready()){
		 self.loaded.set(limit);
		 }*/
	});

	self.models = () => {
		let _filter = self.filter.get();
		//console.info(_filter);
		options = _.extend(options, {limit: self.loaded.get()});
		return Models.find(_filter, options);
	}
});

Template.modelList.helpers({
	models: function () {
		return Template.instance().models();
	},

	hasLoadMore: function () {
		return Template.instance().models().count() >= Template.instance().limit.get();
	}
});

Template.modelList.events({
	'click .load-more': function (event, instance) {
		event.preventDefault();
		let limit = instance.limit.get();
		limit += 20;
		instance.limit.set(limit);
	}
});

Template.modelList_Item.helpers({
	model: function () {
		return Template.instance().data;
	}
});

Template.modelList_Item.onRendered(function(){
	let model = Template.instance().data;
	let selector = 'img.img-model-' + model.username;
	let image_model = document.querySelector(selector);
	let image = new Image();

	image.onload = function(){
		image_model.src = this.src;
	}
	image.src = model.image_url_360x270;
})

/*Template.modelSingle.onCreated(function(){
	let self = this;
	let username = FlowRouter.getParam('username');

	self.autorun(function(){
		self.subscribe('models.single',username);
	});
});*/

Template.modelSingle.helpers({
	model : function(){
		let model = Tracker.nonreactive(function(){
			let username = FlowRouter.getParam('username');
			return Models.findOne({username : username});
		});
		return model;
	}
})



