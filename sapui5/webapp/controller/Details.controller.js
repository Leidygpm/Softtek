// @ts-nocheck
sap.ui.define([
  //  "sap/ui/core/mvc/Controller",
    "lgpm/accounts/controller/Base.controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
],
    //Detalle
    /**
       
         * @param {typeof sap.ui.core.routing.History} History
         * @param {typeof sap.ui.model.json.JSONModel} JSONModel
         * @param {typeof sap.ui.core.Fragment} Fragment
         */
    function (Base, History, JSONModel, Fragment ) {

        function _onMatched(oEvent) {
            const employeeID = oEvent.getParameter("arguments").employeeID;
            this.getView().bindElement({
                path: "/Employees(" + employeeID + ")",
                model: "northwind"
            })
        };
        return Base.extend("lgpm.accounts.controller.Details", {
            onInit: function () {
                const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("RouteDetails").attachPatternMatched(_onMatched, this);

                let jsonSolicitudesModel = new JSONModel();
                //cargar json desde un archivo en el local service
                jsonSolicitudesModel.loadData("./localService/solicitudes.json", false);
                //asociar modelo con la vista
                this.getView().setModel(jsonSolicitudesModel, "jsonSolicitudesModel");
            },
            onBack: function (oEvent) {
                const oHistory = History.getInstance();
                const sPrevious = oHistory.getPreviousHash();
                if (sPrevious !== undefined) {
                    window.history.go(-1);

                }
                else {
                    const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("Routesapui5");
                }
            },
            onCreateRequest: function(){
                 const oView = this.getView();
                 if (!this.byId("newRequestDialog")){
                     Fragment.load( {
                         id: oView.getId(),
                         name: "lgpm.accounts.fragment.NewRequestDialog",
                         controller: this
                     }).then(function(oDialog){
                         oView.addDepedent(oDialog);
                         oDialog.open();
                     })
                 }  
                 else{
                     this.byId("newRequestDialog").open();

                 }
            },
            onCloseDialogNewReq : function (){
                this.byId("newRequestDialog").close();
            }
        })

    }) 