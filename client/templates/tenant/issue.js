Template.issue.events({
	'submit form': function(e) {
		e.preventDefault();
		
		var upload = new Slingshot.Upload("imageUpload");
		var issue = {
			specifications: $(e.target).find('[name=specifications]').val(),
			urgency: $(e.target).find('[name=urgency]').val()
		}
		
		upload.send(document.getElementById('image').files[0], function(error, downloadUrl) {
			
			if (error) {
				throwError(error.reason);
				console.log(error.errorType);
			} else {
				Meteor.users.update(Meteor.userId(), {$push: {"profile.files": downloadUrl}});
				
			}
		});
		var errors = validateFields(issue);
		if (errors.specifications || errors.urgency)
			return Session.set('issueErrors', errors);
		Meteor.call('issue', issue, function(error) {
			if (error) {
				throwError(error.reason);
			} else {
				Router.go('res');
			}
				
		})
		
	}
});
Template.issue.created = function() {
	Session.set('issueErrors', {});
};
Template.issue.helpers({
	errorMessage: function(field) {
		return Session.get('issueErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('issueErrors')[field] ? 'has-error' : ' ';
	},
});
Template.issue.events({
	'click #logout': function() {
		Meteor.logout(function(error) {
			if (error)
				throwError(error.reason)
		});
	}
});

