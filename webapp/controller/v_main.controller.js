sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, Fragment, Filter) {
	"use strict";
	return Controller.extend("Risikobericht.controller.v_main", {
		choosedeb: function(evt) {
			//Einblenden der Box, die Detailinformationen zum Debitor enthält
			//und Anpassen der Größe der Box, die die Suchleiste enthält
			var box1 = this.byId("__vbox0");
			var box2 = this.byId("__vbox1");
			box2.setVisible(true);
			box1.setWidth("30%");
			this.loaddebinfo(evt);
		},
		//Wird ausgeführt wenn der User einen Debitor in der Liste anklickt, überträgt die Informationen die am Debitor hängen um sie anzuzeigen
		loaddebinfo: function(evt) {
			var deb = evt.getSource();
			this.byId("__header0").setObjectTitle(deb.getBindingContext().getProperty("Name1"));
			this.byId("__attribute0").setText(deb.getBindingContext().getProperty("Kunnr"));
			this.byId("__attribute1").setText(deb.getBindingContext().getProperty("Mandt"));
			this.byId("__attribute3").setText(deb.getBindingContext().getProperty("Stras"));
			this.byId("__attribute4").setText(deb.getBindingContext().getProperty("Land1") + ", " + deb.getBindingContext().getProperty("Ort01"));
			this.byId("__attribute5").setText(deb.getBindingContext().getProperty("Telf1"));
			this.byId("__attribute1").setText(deb.getBindingContext().getProperty("credit_sgmnt"));
			this.byId("__input5").setValue(deb.getBindingContext().getProperty("Req_Limit"));
			this.textforriskclass(deb.getBindingContext().getProperty("Req_Ctlpc"));
			this.kreditsperretext(deb.getBindingContext().getProperty("Req_Crblb"));
			this.byId("__input8").setValue(deb.getBindingContext().getProperty("Appr_Src"));
			this.byId("__input9").setValue(deb.getBindingContext().getProperty("Req_Reason"));
			//Text zu Flag Systemvorschlag übersteuert generieren und binden
			if (deb.getBindingContext().getProperty("Xlimit_Modified") === "X") {
				this.byId("__input11").setValue("Ja");
			} else {
				this.byId("__input11").setValue("Nein");
			}
			this.byId("__input12").setValue(deb.getBindingContext().getProperty("Limit_Add"));
			this.byId("__input13").setValue(deb.getBindingContext().getProperty("Limit_Request"));
		},
		//Zeigt eine Nachricht an 
		//Parameter message enthält den Text der angezeigt wird, Parameter type enthält den Typ in dem die Message angezeigt werden soll
		showMessage: function(message, type) {
			var strip = this.byId("__strip0");
			strip.setText(message);
			strip.setType(type);
			strip.setVisible(true);
		},
		//Setzt die App in den Vollbildmodus und bei erneutem Klick auch wieder zurück
		// Debitor Liste wird ein- oder ausgeblendet
		fullscreen: function() {
			if (this.byId("__button2").getIcon() === "sap-icon://full-screen") {
				this.byId("__vbox0").setVisible(false);
				this.byId("__vbox1").setWidth("100%");
				this.byId("__button2").setIcon("sap-icon://exit-full-screen");
				//Benachrichtigung, dass Vollbild aktiviert wurde
				this.showMessage("Vollbildmodus wurde aktiviert", "Information");
			} else {
				this.byId("__vbox1").setWidth("70%");
				this.byId("__vbox0").setVisible(true);
				this.byId("__button2").setIcon("sap-icon://full-screen");
				//Benachrichtigung
				this.showMessage("Vollbildmodus wurde beendet", "Information");
			}
		},
		//Öffnet Dialog; soll später verschiedene Möglichkeiten enthalten wie PDF usw. 
		//Funktioniert noch nicht 
		showpopup: function() {
			var dialog = new sap.m.SelectDialog();
			dialog.open();
		},
		//Ermittelt den Text zum Flag ob eine Kreditsperre gesetzt ist oder nicht
		kreditsperretext: function(flag) {
			if (flag === "X") {
				this.byId("__input7").setValue("Kreditsperre setzen");
			} else {
				this.byId("__input7").setValue("Kreditsperre nicht setzen");
			}
		},
		//Ermittelt und bindet den Text für die jeweilige Risikoklasse 
		textforriskclass: function(riskclass) {
			switch (riskclass) {
				case "100":
					this.byId("__input6").setValue("100 Sehr geringes Risiko");
					this.byId("__item22").setHighlight("Success");
					break;
				case "200":
					this.byId("__input6").setValue("200 Geringes Risiko");
					this.byId("__item22").setHighlight("Success");
					break;
				case "300":
					this.byId("__input6").setValue("300 Mittleres Risiko");
					this.byId("__item22").setHighlight("Success");
					break;
				case "400":
					this.byId("__input6").setValue("400 Hohes Risiko");
					this.byId("__item22").setHighlight("Warning");
					break;
				case "500":
					this.byId("__input6").setValue("500 Sehr hohes Risiko");
					this.byId("__item22").setHighlight("Warning");
					break;
				case "600":
					this.byId("__input6").setValue("600 Insolvent");
					this.byId("__item22").setHighlight("Error");
					break;
				case "A":
					this.byId("__input6").setValue("A Sehr geringes Risiko");
					this.byId("__item22").setHighlight("Success");
					break;
				case "B":
					this.byId("__input6").setValue("B Geringes Risiko");
					this.byId("__item22").setHighlight("Success");
					break;
				case "C":
					this.byId("__input6").setValue("C Mittleres Risiko");
					this.byId("__item22").setHighlight("Success");
					break;
				case "D":
					this.byId("__input6").setValue("D Hohes Risiko");
					this.byId("__item22").setHighlight("Warning");
					break;
				case "E":
					this.byId("__input6").setValue("E Sehr hohes Risiko");
					this.byId("__item22").setHighlight("Warning");
					break;
				case "INA":
					this.byId("__input6").setValue("INA Inaktiver Kunde");
					this.byId("__item22").setHighlight("Information");
					break;
				case "NKD":
					this.byId("__input6").setValue("NKD Neukunde");
					this.byId("__item22").setHighlight("Information");
					break;
				case "VU":
					this.byId("__input6").setValue("VU Verbundenes Unternehmen");
					this.byId("__item22").setHighlight("Information");
			}
		},

		livesearch: function(oEvt) {
			var aFilters = [];
			var sQuery = oEvt.getSource().getValue();
			if (sQuery.length > 0) {
				if (sQuery.length < 10) {
					while (sQuery.length < 10) {
						sQuery = "0" + sQuery;
					}
				}
				var filter = new Filter("Kunnr", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}
			var list = this.getView().byId("__list0");
			var binding = list.getBinding("items");
			binding.filter(aFilters, "Application");
		}
	});
});