"use strict";

module.exports = {
	init: function (modules) {
		this._currentModule = null;
		this._modules = modules;
		this._params = document.location.hash.substr(1).split("/");
		this.routerRequest = false;
		//
		this._lastModule = null;
		this._lastParameters = [];
		//
		return this;
	},
	// methods
	addModule: function (module) {
		this._modules.push(module);
	},
	getCurrentModule: function () {
		return this._currentModule;
	},
	getParameter: function (index) {
		if (this._params[index]) {
			return this._params[index];
		}
		return '';
	},
	getParameters: function () {
		return this._params;
	},
	goBack: function () {
		if (this._currentModule && this._currentModule.onBack) {
			this._currentModule.onBack(function () {
				this._routeToModule(this._lastModule, this._lastParameters);
			});
		} else {
			this._routeToModule(this._lastModule, this._lastParameters);
		}
		return this;
	},
	_routeToModule: function (module, params) {
		var that = this;
		if (this._currentModule && this._currentModule.onExit) {
			this._currentModule.onExit(function() {
				that._routeToModuleDo(module, params);
			});
		} else {
			this._routeToModuleDo(module, params);
		}
		return this;
	},
	_routeToModuleDo: function (module, params) {
		if (this._currentModule && this._currentModule.getId() !== module.id) {
			this._currentModule.hide();
			this._lastModule = this._currentModule;
			this._lastParameters = this._params;
		}
		if (module && (!this._currentModule || (this._currentModule && (this._currentModule.getId() !== module.getId())))) {
			var that = this;
			this._currentModule = module;
			this._currentModule.show(params);
		}
		return this;
	},
	routeToModuleId: function (id, params) {
		var potentialModule = this._modules.filter(function (moduleItem) {
			return moduleItem.getId() === id;
		});
		if (potentialModule.length > 0) {
			this._routeToModule(potentialModule[0], params);
		}
		return this;
	},
	setParameters: function (params) {
		this.routerRequest = true;
		document.location.hash = params.join('/');
		this._lastParameters = this._params;
		this._params = params;
		var that = this;
		setTimeout(function () {
			that.routerRequest = false;
		}, 10);
		return this;
	},
	whitelistModuleId: function (id) {
		return this._modules.some(function(aModule) {
			return aModule.getId() == id;
		});
	}
};