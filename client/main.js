import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

let ModelSubs = new SubsManager();

Template.modelList.onCreated(function () {
	let self = this;
	self.loaded = new ReactiveVar(0);
	self.limit = new ReactiveVar(100);
	self.filter = new ReactiveVar({
		is_online: true,
		current_show: {$ne: 'private'}
	});
	self.ready = new ReactiveVar(false);


	let options = {
		sort: {
			num_users: -1,
			is_hd: 1,
			is_new: 1
		}
	}

	self.autorun(function (c) {
		self.filter.set({
			is_online: true,
			current_show: {$ne: 'private'}
		});
		//self.ready.set(false);
		FlowRouter.watchPathChange();
		let currentContext = FlowRouter.current();
		let gender = (currentContext && currentContext.params.gender) ? currentContext.params.gender : null;
		let tag = (currentContext && currentContext.params.tag) ? currentContext.params.tag : null;
		let _filter = self.filter.get();

		if (gender) {
			_filter = _.extend(_filter, {gender: gender});
		}

		if(tag){
			_filter = _.extend(_filter, {tags: tag});
		}

		let limit = self.limit.get();

		options = _.extend(options, {limit: limit});
		let subscription = ModelSubs.subscribe('models.list', _filter, options);
		if(subscription.ready()){
			self.ready.set(true);
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
	isReady : function(){
		return Template.instance().ready.get();
	},
	hasLoadMore: function () {
		return Template.instance().models().count() >= Template.instance().limit.get();
	}
});

Template.modelList.events({
	'click .load-more': function (event, instance) {
		event.preventDefault();
		let limit = instance.limit.get();
		limit += 5;
		instance.limit.set(limit);
	}
});

Template.modelList_Item.helpers({
	model: function () {
		return Template.instance().data;
	}
});

Template.modelSingle.onCreated(function(){
	let self = this;
	let username = FlowRouter.getParam('username');

	self.autorun(function(){
		self.subscribe('models.single',username);
	});

	self.model = () => {
		return Models.findOne({username : username});
	}
});

Template.modelSingle.helper({
	model : function(){
		return Template.instance().model();
	}
})



