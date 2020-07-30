import { View } from './index'

export default class InvoiceFilterView extends View {
  constructor() {
    super('invoice-filter', 'section')
  }
  mount(): void {}
  init() {
    return `
    <div>
      <input type="checkbox" class="earning-checkbox" />
      <label>수입</label>
      <label class="earning-total">3,234,123원</label>
    </div>
    <div>
      <input type="checkbox" class="spending-checkbox" />
      <label>지출</label>
      <label class="spending-total">134,123원</label>
    </div>
    `
  }
}
