	var resource = new NAMESPACE.resource('Eduardo');  // working
	resource.close(); // working
			
			
	var resource2 = new NAMESPACE.resource('Eduardo');  // working
	
	resource2.close(); // working
  
  
  	QUnit.test( "check resource variable type", function( assert ) {
	  assert.ok( ((typeof resource == "object") && (resource !== null) && (Object.prototype.toString.call(resource) !== '[object Array]')), "Passed!" );
	});
	
	QUnit.test( "check resource2 variable type", function( assert ) {
	  assert.ok( ((typeof resource2 == "object") && (resource2 !== null) && (Object.prototype.toString.call(resource2) !== '[object Array]')), "Passed!" );
	});
	
	
	QUnit.test( "check resource id", function( assert ) {
	  assert.ok( resource.getId() === 'Eduardo', "Passed!" );
	});
	
	
	QUnit.test( "check resource's ExpensiveResource", function( assert ) {
	  assert.ok( resource.getExpensiveResource().value === "I'm a very expensive resource associated with ID Eduardo", "Passed!" );
	});
	
	QUnit.test( "resource is closed", function( assert ) {
	  assert.ok( resource._closed === true, "Passed!" );
	});
	
	
	QUnit.test( "check resource2 id", function( assert ) {
	  assert.ok( resource2.getId() === 'Eduardo', "Passed!" );
	});
	
	
	QUnit.test( "check resource2's ExpensiveResource", function( assert ) {
	  assert.ok( resource2.getExpensiveResource().value === "I'm a very expensive resource associated with ID Eduardo", "Passed!" );
	});
	
	QUnit.test( "resource2 is closed", function( assert ) {
	  assert.ok( resource._closed === true, "Passed!" );
	});
	
	
	QUnit.test( "resource and resource2 are different instances", function( assert ) {
	  assert.ok( resource !== resource2, "Passed!" );
	});