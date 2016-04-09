import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Template.modelList.onCreated(function () {
	let self = this;
	self.loaded = new ReactiveVar(0);
	self.limit = new ReactiveVar(100);
	self.filter = new ReactiveVar({
		is_online: true,
		current_show: {$ne: 'private'}
	});



	let options = {
		sort: {
			num_users: -1,
			is_hd: 1,
			is_new: 1
		}
	}

	self.autorun(function (c) {

		let gender = FlowRouter.getParam('gender');
		let tag = FlowRouter.getParam('tag');

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
		}
	});

	self.models = () => {
		let _filter = self.filter.get();
		console.info(_filter);
		options = _.extend(options, {limit: self.loaded.get()});
		return Models.find(_filter, options);
	}
});

Template.modelList.helpers({
	models: function () {
		return Template.instance().models();
	},
	hasLoadMore : function(){
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
	model : function(){
		return Template.instance().data;
	}
})

