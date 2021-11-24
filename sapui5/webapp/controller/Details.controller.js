// @ts-nocheck
sap.ui.define([
  //  "sap/ui/core/mvc/Controller",
    "lgpm/accounts/controller/Base.controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
],
    //Detalle
    /**
       
         * @param {typeof sap.ui.core.routing.History} History
         * @param {typeof sap.ui.model.json.JSONModel} JSONModel
         */
    function (Base, History, JSONModel ) {

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
            // onShowRequest: function (oEvent) {
            //     const $tableRequests = this.getView().byId("tableRequests");
            //     $tableRequests.destroyItems();
            //     const pressedItem = oEvent.getSource();
            //     const oContext = pressedItem.getBindingContext("northwind");
            //     //const sPath= oContext.getPath();
            //     const objectContext = oContext.getObject();
            //     const employeeID = objectContext.EmployeeID;

            //     //armar lista de solicitudes para el empleado seleccionado

            //     let requestItems = [];
            //     let reqData = this.getView().getModel("jsonSolicitudesModel").getData().solicitudes;

            //     //FilterOperator
            //     let reqFiltered = [];
            //     reqFiltered = reqData.filter((elem) => {
            //         return elem.empleadoId === employeeID;
            //     });

            //     let aCuentas = reqFiltered[0].cuentas;

            //     //armar tabla
            //     for (let i in aCuentas) {
            //         requestItems.push(new sap.m.ColumnListItem({
            //             cells: [
            //                 new sap.m.Label({ text: aCuentas[i].numero }),
            //                 new sap.m.Label({ text: aCuentas[i].nombre })
            //             ]
            //         }));

            //     };
            //     let newTable = new sap.m.Table({
            //         width: "auto",
            //         columns: [
            //             new sap.m.Column({ header: new sap.m.Label({ text: "i18n>requestNumber" }) }),
            //             new sap.m.Column({ header: new sap.m.Label({ text: "i18n>requestName" }) })
            //         ],

            //         items: requestItems
            //     });

            //     $tableRequests.addItem(newTable);
            // }
        })

    }) 