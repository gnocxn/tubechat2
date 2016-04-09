import {Mongo} from 'meteor/mongo';

import {SimpleSchema} from 'meteor/aldeed:simple-schema';


Models = new Mongo.Collection('models');

let schema = new SimpleSchema({
	username: {
		type: String,
		unique: true,
		label: 'Username'
	},
	age: {
		type: Number,
		optional: true
	},
	display_name: {
		type: String,
		optional: true
	},
	gender: {
		type: String
	},
	birthday: {
		type: Date,
		optional: true
	},
	location: {
		type: String,
		optional: true
	},
	room_subject: {
		type: String,
		label: 'Room',
		optional: true
	},
	is_hd: {
		type: Boolean,
		defaultValue: false
	},
	is_new: {
		type: Boolean,
		defaultValue: false
	},
	recorded: {
		type: Boolean,
		defaultValue: false
	},
	current_show: {
		type: String,
		optional: true
	},
	tags: {
		type: [String],
		optional: true
	},
	chat_room_url: {
		type: String
	},
	image_url: {
		type: String
	},
	image_url_360x270: {
		type: String
	},
	block_from_states: {
		type: String,
		optional: true
	},
	block_from_countries: {
		type: String,
		optional: true
	},
	iframe_embed: {
		type: String,
		optional: true
	},
	iframe_embed_revshare: {
		type: String,
		optional: true
	},
	seconds_online: {
		type: Number,
		defaultValue: 0
	},
	num_users: {
		type: Number,
		defaultValue: 0
	},
	num_followers: {
		type: Number,
		defaultValue: 0
	},
	is_online: {
		type: Boolean
	},
	source: {
		type: String,
		optional: true
	}
});

Models.helpers({
	getRoomSubject: function () {
		return (this.room_subject) ? s.truncate(this.room_subject, 70) : null;
	},
	getMinutes: function () {
		return Math.round(this.seconds_online % 60);
	}
})

Models.attachSchema(schema);

//export default Models;