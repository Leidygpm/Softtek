/*global QUnit*/

sap.ui.define([
	"lgpm/accounts/controller/sapui5.controller"
], function (Controller) {
	"use strict";

	QUnit.module("sapui5 Controller");

	QUnit.test("I should test the sapui5 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
