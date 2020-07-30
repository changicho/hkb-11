import { Observable } from '.'
import { Invoice } from '../../types'
import { EVENTS } from '../utils/constants'

export class InvoiceModel extends Observable {
  invoices: Array<Invoice> = []
  sumEarning: number = 0
  sumSpending: number = 0

  addInvoice(invoice: Invoice) {
    this.invoices = [...this.invoices, invoice]
    this.emit(EVENTS.ADD_INVOICE, invoice)
  }
  setInvoices(invoices: Array<Invoice>) {
    this.clear()
    this.invoices = invoices
    this.invoices.forEach((invoice) => {
      this.addInvoice(invoice)
    })
  }
  clear() {
    this.invoices = new Array<Invoice>()
    this.emit(EVENTS.CLEAR_INVOICES)
  }
}
