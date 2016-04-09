Template.menu.helpers({
	activeRoute : function(route, gender){
		FlowRouter.watchPathChange();
		let isCurrentRoute = FlowRouter.current().route.name === route;
		if (!gender) {
			return isCurrentRoute ? 'active' : '';
		} else {
			let genderVal = FlowRouter.getParam('gender');
			return (isCurrentRoute && (gender === genderVal)) ? 'active' : ''
		}
	},
	joinLink : function(){
		return 'http://chaturbate.com/affiliates/in/3Mc9/eqdcq/?track=default&redirect_to_room=-welcomepage-';
	}
})