sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"

],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.ui.model.Filter} Filter
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator
	 */
    function (Controller, JSONModel, Filter, FilterOperator) {
        "use strict";

        function onInit() {
            //vista
            let oView = this.getView();
            //cargar modelo de paises
            let jsonPaisesModel = new JSONModel();
            //cargar json desde un archivo en el local service
            jsonPaisesModel.loadData("./localService/paises.json", false);
            //asociar modelo con la vista
            oView.setModel(jsonPaisesModel, "paisesModel");

             //cargar modelo de solicitudes
            let jsonSolicitudesModel = new JSONModel();
            //cargar json desde un archivo en el local service
            jsonSolicitudesModel.loadData("./localService/solicitudes.json", false);
            //asociar modelo con la vista
            oView.setModel(jsonSolicitudesModel, "jsonSolicitudesModel");
        };

        function onFilter(){
            let paises = this.getView().getModel("paisesModel").getData();
            let aFilters =[];
            if (paises.paisSeleccionado !== "" && paises.paisSeleccionado !== undefined ){
                aFilters.push(new Filter("Country", FilterOperator.EQ, paises.paisSeleccionado));
            }

            let $tableEmp = this.getView().byId("idTable");
            let oBinding = $tableEmp.getBinding("items");
            oBinding.filter(aFilters);
        };

        function onShowRequest(oEvent){
        const $tableRequests = this.getView().byId("tableRequests");
        $tableRequests.destroyItems();
        const pressedItem = oEvent.getSource();
        const oContext = pressedItem.getBindingContext("northwind");
        //const sPath= oContext.getPath();
        const objectContext = oContext.getObject();
        const employeeID = objectContext.EmployeeID;

        //armar lista de solicitudes para el empleado seleccionado

        let requestItems = [];
        let reqData = this.getView().getModel("jsonSolicitudesModel").getData().solicitudes;

        //FilterOperator
            let reqFiltered = [];
            reqFiltered = reqData.filter((elem)=>{
                return elem.empleadoId === employeeID;
            });

            let aCuentas = reqFiltered[0].cuentas;

            //armar tabla
            for (let i in aCuentas){
            requestItems.push(new sap.m.ColumnListItem({
                cells: [
                    new sap.m.Label({text: aCuentas[i].numero}),
                    new sap.m.Label({text: aCuentas[i].nombre})
                ]
            }));

            };
            let newTable = new sap.m.Table({
                width: "auto",
                columns: [
                    new sap.m.Column({header: new sap.m.Label({text: "i18n>requestNumber"})}),
                    new sap.m.Column({header: new sap.m.Label({text: "i18n>requestName"})})
                ],

                items: requestItems
            });

            $tableRequests.addItem(newTable);
        };

        function toDetails(oEvent){
            const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo ("RouteDetails", {
                
            });
        }


        var Main = Controller.extend("lgpm.accounts.controller.sapui5", {});
        Main.prototype.onInit = onInit;
        Main.prototype.onFilter = onFilter;
        Main.prototype.onShowRequest = onShowRequest;
        Main.prototype.toDetails = toDetails;

        return Main;
    });
