	var resource = new NAMESPACE.resource('Eduardo');  // working
	
	
	
	


	var resource2 = new NAMESPACE.resource('Eduardo');  // working

	


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


	QUnit.test( "check resource2 id", function( assert ) {
	  assert.ok( resource2.getId() === 'Eduardo', "Passed!" );
	});


	QUnit.test( "check resource2's ExpensiveResource", function( assert ) {
	  assert.ok( resource2.getExpensiveResource().value === "I'm a very expensive resource associated with ID Eduardo", "Passed!" );
	});
	

	// this test always will pass when comparing objects
	QUnit.test( "resource and resource2 are different - check objects comparison", function( assert ) {
	  assert.ok( resource !== resource2, "Passed!" );
	});
	
	
	console.log( JSON.stringify( resource ),  JSON.stringify( resource2 ) )
	
	// this test may pass or not, it will depend of structure of both objects
	QUnit.test( "resource and resource2 are different - check object as string", function( assert ) {
	  assert.ok( JSON.stringify( resource ) !== JSON.stringify( resource2 ), "Passed!" );
	});


	// this test never will pass when comparing objects
	QUnit.test( "check reallocating resource", function( assert ) {
	 assert.ok( resource.getExpensiveResource() === resource2.getExpensiveResource(), "unnecessarily reallocating resource(Eduardo)" );
	});

	// this test may pass or not, it will depend of structure of both objects
	QUnit.test( "check reallocating resource - check object as string", function( assert ) {
	 assert.ok( JSON.stringify( resource.getExpensiveResource() ) === JSON.stringify( resource2.getExpensiveResource() ), "unnecessarily reallocating resource(Eduardo)" );
	});

	
	// this test will never pass until both object properties are equal
	QUnit.test( "compare expensiveResources with same id", function( assert ) {
	  assert.ok( resource.getExpensiveResource().start === resource2.getExpensiveResource().start, "unnecessarily reallocating resource(Eduardo) - checking start's property value" );
	  assert.ok( resource.getExpensiveResource().end === resource2.getExpensiveResource().end, "unnecessarily reallocating resource(Eduardo) - checking end's property value" );
	  assert.ok( resource.getExpensiveResource().value === resource2.getExpensiveResource().value, "unnecessarily reallocating resource(Eduardo) - checking value's property value" );
	});
	
	
	resource.close();
	resource2.close();
	
	QUnit.test( "resource is closed", function( assert ) {
	  assert.ok( resource._closed === true, "Passed!" );
	});
	
	
	QUnit.test( "resource2 is closed", function( assert ) {
	  assert.ok( resource._closed === true, "Passed!" );
	});
