Issue = new Meteor.Collection('issues');
Issue.allow({
	update: docOwner,
	remove: docOwner
});
Issue.deny({
	update: function(specifications) {
		return (_.without(fieldNames, 'specifications').length > 0);
	}
});
validateFields = function(issue) {
	var errors = { };
	if(!issue.specifications)
		errors.specifications = "Please give us a little more about the problem";
	if(!issue.urgency)
		errors.urgency = "Please let us know how urgent of an issue this is";
	return errors;
}
Meteor.methods({
	issue: function(issue) {
		//If more fields are needed code will need to be altered to pass in an object
		console.log(issue["specifications"]);
		check(issue["specifications"], String);
		check(issue["urgency"], String);
		
		
		var errors = validateFields(issue);
		if (errors.specifications || errors.urgency)
			throw new Meteor.Error("Sorry it looks like we need a little more information from you");
		
		var user = Meteor.user();
		var issue = _.extend(_.pick(issue, 'specifications', 'urgency'), {
			userId: user._id,
			submitted: new Date().getTime(),
			author: user.username
		});
		var issueId = Issue.insert(issue);
		return issueId;
	}
});