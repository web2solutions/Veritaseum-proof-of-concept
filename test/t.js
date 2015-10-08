	QUnit.test( "basic tests - @Eduardo", function( assert ) {
	  
		var resource = NAMESPACE.resource('Eduardo');  // working
		var resource2 = NAMESPACE.resource('Eduardo');  // working
	  
	  
	  	assert.ok( ((typeof resource == "object") && (resource !== null) && (Object.prototype.toString.call(resource) !== '[object Array]')), "resource is a object" );
		assert.ok( ((typeof resource2 == "object") && (resource2 !== null) && (Object.prototype.toString.call(resource2) !== '[object Array]')), "resource2 is a object" );
		assert.ok( resource.getId() === 'Eduardo', "resource.getId() == Eduardo" );
		assert.ok( resource.getExpensiveResource().value === "I'm a very expensive resource associated with ID Eduardo", "getExpensiveResource() mtaches with ID" );
		assert.ok( resource2.getId() === 'Eduardo', "resource2.getId() == Eduardo" );
		assert.ok( resource2.getExpensiveResource().value === "I'm a very expensive resource associated with ID Eduardo", "getExpensiveResource() mtaches with ID" );
		assert.ok( resource.getExpensiveResource() === resource2.getExpensiveResource(), "unnecessarily reallocating resource(Eduardo)" );
		assert.ok( JSON.stringify( resource.getExpensiveResource() ) === JSON.stringify( resource2.getExpensiveResource() ), "unnecessarily reallocating resource(Eduardo)" );	
		assert.ok( resource.getExpensiveResource().start === resource2.getExpensiveResource().start, "unnecessarily reallocating resource(Eduardo) - checking start's property value" );
		assert.ok( resource.getExpensiveResource().end === resource2.getExpensiveResource().end, "unnecessarily reallocating resource(Eduardo) - checking end's property value" );
		assert.ok( resource.getExpensiveResource().value === resource2.getExpensiveResource().value, "unnecessarily reallocating resource(Eduardo) - checking value's property value" );
	
		// clear memory
		resource.close();
		resource2.close();
	
	  	assert.ok( typeof NAMESPACE.getTotalExpensiveResourcesCreated === 'undefined', "NAMESPACE.getTotalExpensiveResourcesCreated is undefined - no public access" );
	});
	
	
	
	QUnit.test( "resource is closed at the appropriate time - @Matt", function( assert ) {
		var rsrc1 = NAMESPACE.resource(42);
		var rsrc2 = NAMESPACE.resource(42);
		rsrc1.close();
		
		var rsrc3 = NAMESPACE.resource(42);
		assert.ok( rsrc2.getExpensiveResource() === rsrc3.getExpensiveResource(), "unnecessarily reallocating resource(42)" );
		rsrc2.close();
		rsrc3.close();
		
		var rsrc4 = NAMESPACE.resource(42);
		assert.ok( rsrc4.getExpensiveResource() !== rsrc1.getExpensiveResource(), "unnecessarily keeping resource(42) alive" );
		
		// clear memory
		rsrc4.close();
	});
	
	
	
	QUnit.test( "resource is closed at the appropriate time - testing multiple ids - @Eduardo", function( assert ) {
		var rsrc1 = NAMESPACE.resource(44);
		var rsrc2 = NAMESPACE.resource(44);
		rsrc1.close();
		
		var rsrc3 = NAMESPACE.resource(44);
		assert.ok( rsrc2.getExpensiveResource() === rsrc3.getExpensiveResource(), "unnecessarily reallocating resource(42)" );
		rsrc2.close();
		rsrc3.close();
		
		var rsrc4 = NAMESPACE.resource(44);
		assert.ok( rsrc4.getExpensiveResource() !== rsrc1.getExpensiveResource(), "unnecessarily keeping resource(42) alive" );
		rsrc4.close();
		
		var rsrc1_ = NAMESPACE.resource(43);
		var rsrc2_ = NAMESPACE.resource(43);
		rsrc1_.close();
		
		var rsrc3_ = NAMESPACE.resource(43);
		assert.ok( rsrc2_.getExpensiveResource() === rsrc3_.getExpensiveResource(), "unnecessarily reallocating resource(42)" );
		rsrc2_.close();
		rsrc3_.close();
		
		var rsrc4_ = NAMESPACE.resource(43);
		assert.ok( rsrc4_.getExpensiveResource() !== rsrc1_.getExpensiveResource(), "unnecessarily keeping resource(42) alive" );
		rsrc4_.close();
	});
	
	
	
	// necessary to close all active resources to make this test to be passed
	QUnit.test( "check total active expensive resources - @Eduardo", function( assert ) {
		assert.ok( NAMESPACE._resources_created == 0, " NAMESPACE._resources_created == 0 -> no active expensive resources" );
		assert.ok( Object.keys( NAMESPACE._all_ids ).length == 0, "NAMESPACE._all_ids is empty" );
	});