<div class="jumbotron" ng-controller="IssuesListController">
	<ul ng-repeat="issue in issues">
		<li>{{issue.author}}</li>
		<li>{{issue.specifications}}</li>
		<li>{{issue.urgency}}</li>
		<li>{{issue.time}}</li>
	</ul>
</div>