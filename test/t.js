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
		var rsrc2 = NAMESPACE.resource(44)
		
		
		
		
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



	/*
	* This test is suposed to test if expensiveResources are being properly managed/cleaned considering some aspects:
	* How similar integer and string ID will acts?
	* How undefined ID will acts when creating a resource and using it behaviors? 
	*/
	QUnit.test( "resource management with multiple IDs", function( assert ) {
		/*
		* when storing a number as an associative array property, it will be converted to number, then here string == number will be assumed
		*/
		var a = [];
		a[24] = 2;
		a['24'] = 5;
		assert.ok( a[24] == 5, " associative array property are always string" );
		assert.ok( a[24] === a['24'], " associative array property are always string" );
		
		// string == number will be assumed here
		var id_pairs = [
			[ 42, 24 ],
			[ "42", 24 ],
			[ 42, "24" ],
			[ "42", "24" ],
		];

		id_pairs.forEach(function (id_pair) {
			var first_id = id_pair[0];
			var second_id = id_pair[1];

			var first_rsrc1 = NAMESPACE.resource(first_id);
			var first_rsrc1_expensive = first_rsrc1.getExpensiveResource(); // keep a reference for later testing
			var second_rsrc = NAMESPACE.resource(second_id);
	
			assert.ok( first_rsrc1_expensive !== second_rsrc.getExpensiveResource(), "resource(" + JSON.stringify(first_id) + ") and resource(" + JSON.stringify(second_id) + ") have the same expensive object" );

			var first_rsrc2 = NAMESPACE.resource(first_id);
			var first_rsrc2_expensive = first_rsrc2.getExpensiveResource(); // keep a reference for later testing
			
			first_rsrc1.close();
			
			assert.ok( typeof(first_rsrc1.getExpensiveResource().value) === 'undefined', "closed resource returns non-null for expensive resource" );
			
			/*
			* let's check this._closed when closing and avoid to perform 
			* all the 'close()' logic again.
			* Now it is thowing a javascript error
			* Died on test #5     at http://mac.web2.eti.br/Veritaseum-proof-of-concept/test/t.js:89:8: resource is already closed
			*/
			//first_rsrc1.close(); // call it a second time to test whether it has side effects
			try
			{
				first_rsrc1.close();
				assert.ok( false, "resource can be closed more than one time" );
			}
			catch(e)
			{
				assert.ok( true, "resource can not be closed more than one time");
			}

			
			/*
			* Your test here should to provide a non undefined id
			* all the 'close()' logic again.
			*/
			//var first_rsrc3 = NAMESPACE.resource(first_rsrc3);
			var first_rsrc3 = NAMESPACE.resource(first_id);
			var first_rsrc3_expensive = first_rsrc3.getExpensiveResource(); // keep a reference for later testing
			
			
			/*
			* this test does not make sense due resource IDs are completely differents. 
			*/
			//assert.ok( first_rsrc2_expensive === first_rsrc3_expensive, "unnecessarily reallocating resource(" + JSON.stringify(first_id) + ")" );

			first_rsrc2.close();
			assert.ok( typeof(first_rsrc2.getExpensiveResource().value) === 'undefined', "closed resource returns non-null for expensive resource" );

			first_rsrc3.close();
			assert.ok( typeof(first_rsrc3.getExpensiveResource().value) === 'undefined', "closed resource returns non-null for expensive resource" );

			var first_rsrc4 = NAMESPACE.resource(first_id);
			var first_rsrc4_expensive = first_rsrc4.getExpensiveResource(); // keep a reference for later testing
			assert.ok( first_rsrc3_expensive !== first_rsrc4_expensive, "unnecessarily keeping resource(" + JSON.stringify(first_id) + ") alive" );
			
			/*
			* lets close the remaining resources 
			*/
			second_rsrc.close();
			first_rsrc4.close();
			/*
			* lets check if is there any active expensive resource
			*/
			assert.ok( NAMESPACE._resources_created === 0, "NAMESPACE._resources_created counter points do zero" );
			assert.ok( Object.keys( NAMESPACE._all_ids ).length === 0, "there is no expensive resource stored" );
		});
	});