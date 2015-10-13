/*======================================================================*\
  ICBIaW50OiBtYWtlIHRoaXMgYXMgY2xvc2UgdG8gcHJvZHVjdGlvbi1yZWFkeSBzb3VyY2
  UgY29kZSBhcyB5b3UgY2FuIQoKICBCb251cyBwb2ludHMgZm9yIHRlbGxpbmcgdXMgd2hh
  dCB0aGlzIGRvZXMgaW4gcGxhaW4gdGVybXM6CgogICAgJycuam9pbihpdGVydG9vbHMuY2
  hhaW4oKnppcChzWy0yOjotMl0sIHNbOjotMl0pKSk=
\*======================================================================*/

// lets replace the multiple comparison (to check if NAMESPACE is defined or null) by simple using the || operator
var NAMESPACE = NAMESPACE || (function(){
	'strict';
	var createExpensiveResource = function (params) {
		// Just pretend for now (hint: you do not want this code to run
		// more than is absolutely necessary)
		var millis = 300, start, end, _expensive_resource;
		//console.log('busy waiting for ' + millis + ' ms...');
		start = +(new Date());
		while (new Date() - start < millis);
		end = +(new Date());
		//console.log('done!');

		_expensive_resource = {
			start: start,
			end: end,
			value: "I'm a very expensive resource associated with ID " + params.id
		};

		++NAMESPACE._resources_created;

		return _expensive_resource;
	},

	getTotalExpensiveResourcesCreated = function () {
		return NAMESPACE._resources_created;
	},

	// provide support for avoiding to keep active expensiveResources
	// lets group active resources by _id and then count it
	active_resources = [],

	resource = function (id) {
		'strict';
		var _id = id
			, _expensive_resource = null
			, persona = null
			, getExpensiveResource
			, getId;
			
		if(  typeof id == 'undefined' )
		{
			throw('You can not create a resource with a undefined ID');
		}

		getExpensiveResource = function () {
				return persona.expensiveResource;
		}

		getId = function () {
			return _id;
		}

		// Private methods
		function _lookupOrCreateExpensiveResourceById(id) {

			_expensive_resource = NAMESPACE._all_ids[id];

			if (_expensive_resource == null) {
				_expensive_resource = createExpensiveResource({ id: id });

				NAMESPACE._all_ids[id] = _expensive_resource;
			}

			return _expensive_resource;
		}

		// Initialization
		_expensive_resource = _lookupOrCreateExpensiveResourceById(id);


		persona = new function ( ){
			var close = function () {
				
				// lets clear the internal references
				this.getExpensiveResource = function(){
					return {};
				};
				
				/*
				* Lets overwrite the close() method
				* and throw a error if it is called more than one time
				* this._closed is deprecated now
				*/
				this.close = function(){
					throw('resource is already closed');	
				};
				
				/*
				* not being used
				*/
				//this._closed = true;
				
				this.getId = function(){};
	
				--active_resources[ _id ];				

				// if there is no active resource, lets destroy the shared object
				if( active_resources[ _id ] == 0)
				{
					delete NAMESPACE._all_ids[_id];
					--NAMESPACE._resources_created;
				}
			}
			this.getExpensiveResource = getExpensiveResource;
			this.expensiveResource = _expensive_resource;
			this.close = close;
			
			/*
			* not being used
			*/
			//this._closed = false;
			
			this.getId = getId;
		}

		if( typeof active_resources[ _id ] == 'undefined' )
			active_resources[ _id ] = 0;

		++active_resources[ _id ];

		return persona;
	},

	API = {
		_all_ids : []
		, resource : resource
		, _resources_created : 0
		, createExpensiveResource : createExpensiveResource
		, resource : resource
		// , getTotalExpensiveResourcesCreated : getTotalExpensiveResourcesCreated // shall to make it public?

	};

	return API
})();
