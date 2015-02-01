Meteor.publish('tenentIssues', function() {
	//you are able to add "groups" Which would be useful if the app is purchased by multiple HOAs
	if (Roles.userIsInRole(this.userId, 'admin')) {
		return Issue.find();
	}
});