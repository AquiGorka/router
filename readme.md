#Router
Singleton to show/hide `modules` (https://github.com/aquigorka/module)

*Parameters:*
This router gets/sets parameters from/to document.location.hash
This router does not handle document.location.hash event changes, you should do so in your own app and then take appropriate action (probably route to some module)


##Usage
 - set some modules:

        router.init([
            new Module('module-id-1'),
            new Module('module-id-1')
        ]);

 - or
	    router.add(new Module('module-id-1'));
	    router.add(new Module('module-id-2'));

 - then route to some module via id
	    router.routeToModuleId('module-id-1');

###api

**router.init(modules: Array)**

    init router and set modules


**router.getCurrentModule()**

    return current module || null (if there is no module or you have not routed to any)
	
**router.getParameter(index: int)**

    return parameter in given index if (exists) or empty string ('')

**router.getParameters()**

    return parameters array

**router.goBack()**

    if there has been routing between modules this router keeps the last module (and the parameters it received when routed to) and will route to such last module

**router.routeToModuleId(id: String, params: Array)**

    this will whitelist the module id and if it exists will route to such module
before routing completes and if there is an active current module the router will call currentModule.onExit (should default to continue)

**router.setParameters(params: Array)**

    sets the parameters (this will trigger a document.location.hash change - be wary of infinite loops)
if this method is called then the routerRequest flag will be set to true and set back to false within the next tick (in the next 10 milliseconds)

**router.whitelistModuleId(id: String)**

    return true if the moudle id belongs to an existing module


###build

    browserify src/router.js --standalone router > dist/router.js
