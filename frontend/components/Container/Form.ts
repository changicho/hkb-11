import { Container } from '.'
import { Component } from '..'
import { Invoice } from '../../../types'
import { InvoiceModel } from '../../model/InvoiceModel'
import { EVENT, FORM_CLASS } from '../../utils/constants'
import FormView from '../../view/ContainerView/RouterView/FormView'

export class Form extends Component<FormView, Container> {
  invoiceModel: InvoiceModel

  constructor(parent, view: FormView) {
    super(parent, view)

    this.invoiceModel = this.parent.invoiceModel

    this.view.bindInvoiceAddHandler((invoice: Invoice) => {
      this.invoiceModel.addInvoice(invoice)

      this.view.changeFloatBtn(FORM_CLASS.CLEAR_BTN)
      this.view.clearForm()
    })

    this.view.bindInvoiceRemoveHandler((id: number) => {
      this.invoiceModel.removeInvoice(id)

      this.view.changeFloatBtn(FORM_CLASS.CLEAR_BTN)
      this.view.clearForm()
    })

    this.view.bindInvoiceUpdateHandler((invoice: Invoice) => {
      this.invoiceModel.updateInvoice(invoice)

      this.view.changeFloatBtn(FORM_CLASS.CLEAR_BTN)
      this.view.clearForm()
    })

    this.invoiceModel.on(EVENT.HIGHLIGHT_INVOICE, ({ id, flag }) => {
      if (flag === false) return

      const invoice: Invoice = this.invoiceModel.findInvoiceById(id)
      this.view.setInvoiceData(invoice)
    })
  }
}
