sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
],

    /**
         * @param {typeof sap.ui.core.mvc.Controller} Controller
         * @param {typeof sap.ui.core.routing.History} History
         */
    function (Controller, History) {
        return Controller.extend("lgpm.accounts.controller.Details", {
            onInit: function () { 

            },
            onBack: function(oEvent){
                const oHistory = History.getInstance();
                const sPrevious = oHistory.getPreviousHash();
                if (sPrevious !== undefined){
                    window.history.go(-1);
                    
                }
                else{
                    const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("Routesapui5");
                                }
            }
        })

    }) 