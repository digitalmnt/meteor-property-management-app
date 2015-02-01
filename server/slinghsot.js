Slingshot.createDirective("imageUpload", Slingshot.S3Storage, {
	
	//!!!!!!!!!!!!!!!!!!!!!!!!!!!Will need to modify secret key and access id 
	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!They are root keys and should not be included in aaaappppppppp
	bucket: "coapp",
	/*AWSAccessKeyId: "AKIAIHD374WTPVXPAZOA",
	AWSSecretAccessKey: "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",*/
	allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
	maxSize: 0,
	acl: "public-read",
	authorize: function() {
		if (!this.userId) {
			throwError("Please login");
		}
		return true;
	},
	key: function(file) {
		var user = Meteor.users.findOne(this.userId);
		return user.username + "/" + file.name;
		console.log(file);
	}
	
});