	var resource = NAMESPACE.resource('Eduardo');  // working
	var resource2 = NAMESPACE.resource('Eduardo');  // working

	


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

	
	QUnit.test( "check reallocating resource", function( assert ) {
	 assert.ok( resource.getExpensiveResource() === resource2.getExpensiveResource(), "unnecessarily reallocating resource(Eduardo)" );
	});

	
	QUnit.test( "check reallocating resource - check object as string", function( assert ) {
	 assert.ok( JSON.stringify( resource.getExpensiveResource() ) === JSON.stringify( resource2.getExpensiveResource() ), "unnecessarily reallocating resource(Eduardo)" );
	});

	
	//QUnit.test( "ensure only one expensive resource", function( assert ) {
	 //assert.ok( NAMESPACE._resources_created == 1, "unnecessarily reallocating resource(Eduardo)" );
	//});
	
	
	
	QUnit.test( "compare expensiveResources with same id", function( assert ) {
	  assert.ok( resource.getExpensiveResource().start === resource2.getExpensiveResource().start, "unnecessarily reallocating resource(Eduardo) - checking start's property value" );
	  assert.ok( resource.getExpensiveResource().end === resource2.getExpensiveResource().end, "unnecessarily reallocating resource(Eduardo) - checking end's property value" );
	  assert.ok( resource.getExpensiveResource().value === resource2.getExpensiveResource().value, "unnecessarily reallocating resource(Eduardo) - checking value's property value" );
	});
	
	
	QUnit.test( "getTotalExpensiveResourcesCreated inacessible", function( assert ) {
	  assert.ok( typeof NAMESPACE.getTotalExpensiveResourcesCreated === 'undefined', "undefined" );
	});
	
	//console.log( typeof NAMESPACE.getTotalExpensiveResourcesCreated )
	
	resource.close();
	resource2.close();
	
	
	QUnit.test( "resource is closed", function( assert ) {
	  assert.ok( resource._closed === true, "Passed!" );
	});
	
	
	QUnit.test( "resource2 is closed", function( assert ) {
	  assert.ok( resource2._closed === true, "Passed!" );
	});
	
	
	QUnit.test( "resource is closed at the appropriate time", function( assert ) {
		var rsrc1 = NAMESPACE.resource(42);
		var rsrc2 = NAMESPACE.resource(42);
		rsrc1.close();
		
		
		var rsrc3 = NAMESPACE.resource(42);
		assert.ok( rsrc2.getExpensiveResource() === rsrc3.getExpensiveResource(), "unnecessarily reallocating resource(42)" );
		rsrc2.close();
		rsrc3.close();
		
		var rsrc4 = NAMESPACE.resource(42);
		assert.ok( rsrc4.getExpensiveResource() !== rsrc1.getExpensiveResource(), "unnecessarily keeping resource(42) alive" );
	});
