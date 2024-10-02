import { Component } from "@angular/core";
import { AlertService, CoreService } from "wacom";
import { CSERVICEService, CSERVICE } from "../../services/SERVICE.service";
import { FormService } from "src/app/core/modules/form/form.service";
import { TranslateService } from "src/app/core/modules/translate/translate.service";
import { FormInterface } from "src/app/core/modules/form/interfaces/form.interface";

@Component({
  templateUrl: "./NAME.component.html",
  styleUrls: ["./NAME.component.scss"],
})
export class CNAMEComponent {
  columns = ["name", "description"];

  form: FormInterface = this._form.getForm("NAME", {
    formId: "NAME",
    title: "CNAME",
    components: [
      {
        name: "Text",
        key: "name",
        focused: true,
        fields: [
          {
            name: "Placeholder",
            value: "fill NAME title",
          },
          {
            name: "Label",
            value: "Title",
          },
        ],
      },
      {
        name: "Text",
        key: "description",
        fields: [
          {
            name: "Placeholder",
            value: "fill NAME description",
          },
          {
            name: "Label",
            value: "Description",
          },
        ],
      },
    ],
  });

  config = {
    create: () => {
      this._form.modal<CSERVICE>(this.form, {
        label: "Create",
        click: (created: unknown, close: () => void) => {
          this._SERVICENAME.create(created as CSERVICE);
          close();
        },
      });
    },
    update: (doc: CSERVICE) => {
      this._form
        .modal<CSERVICE>(this.form, [], doc)
        .then((updated: CSERVICE) => {
          this._core.copy(updated, doc);
          this._SERVICENAME.update(doc);
        });
    },
    delete: (doc: CSERVICE) => {
      this._alert.question({
        text: this._translate.translate(
          "Common.Are you sure you want to delete this CSERVICE?"
        ),
        buttons: [
          {
            text: this._translate.translate("Common.No"),
          },
          {
            text: this._translate.translate("Common.Yes"),
            callback: () => {
              this._SERVICENAME.delete(doc);
            },
          },
        ],
      });
    },
    buttons: [
      {
        icon: "cloud_download",
        click: (doc: CSERVICE) => {
          this._form.modalUnique<CSERVICE>("NAME", "url", doc);
        },
      },
    ],
  };

  get rows(): CSERVICE[] {
    return this._SERVICENAME.SERVICEs;
  }

  constructor(
    private _translate: TranslateService,
    private _alert: AlertService,
    private _SERVICENAME: CSERVICEService,
    private _form: FormService,
    private _core: CoreService
  ) {}
}
