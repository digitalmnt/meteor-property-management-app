Router.configure({
	layoutTemplate: 'layout',
	loadingTempalte: 'loading'
});
Router.map(function() {
	this.route('login', {
		path: '/login'
	});
	this.route('register', {
		path: '/register'
	});
	this.route('issue', {
		path: '/'
	});
	this.route('res', {
		path: '/thanks'
	});
	this.route('pm', {
		path: '/manager',
		waitOn: function() {
			return Meteor.subscribe('tenentIssues');
		},
		data: function() {
			return {issue: Issue.find()};
		}
	});
});
var requireLogin = function() {
	if (! Meteor.user() || Meteor.loggingIn()) {
		Router.go('login');
	} else {
		this.next();
	}
}
if (Meteor.isClient) {
	Router.onBeforeAction('loading');
	Router.onBeforeAction(requireLogin, {only: 'issue'});
}