import { CALENDAR_CLASS, CLASS } from '../../../../utils/constants'
import { templateToElement } from '../../../../utils/ElementGenerator'
import { View } from '../../../index'
import './style.scss'
import { dateCellTemplate, headerCellTemplate, template } from './template'

const days: string[] = ['일', '월', '화', '수', '목', '금', '토']

function getDateList(year: number, month: number) {
  const dateList: Date[] = []
  const firstDate: Date = new Date(`${year}-${month}-1`)
  const startDate: Date = new Date(firstDate)
  startDate.setDate(firstDate.getDate() - firstDate.getDay())

  for (let i = 0; i < 42; i++) {
    const date: Date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    dateList.push(date)
  }

  return dateList
}
export default class CalendarView extends View {
  $dateCells: HTMLDivElement[]

  constructor() {
    super(template)
  }
  mount(): void {
    this.appendCells()
    this.$dateCells = <HTMLDivElement[]>(
      Array.from(this.queryAll(`.${CALENDAR_CLASS.DATE_CELL}`))
    )
  }

  appendCells() {
    days.forEach((day: string) => {
      const $headerCell = templateToElement(headerCellTemplate)
      const $day = <HTMLDivElement>(
        $headerCell.querySelector(`.${CALENDAR_CLASS.DAY}`)
      )
      $day.innerText = day
      this.$element.appendChild($headerCell)
    })

    for (let i = 0; i < 42; i++) {
      const $dateCell = templateToElement(dateCellTemplate)
      this.$element.appendChild($dateCell)
    }
  }

  setDateCells(year: number = 2020, month: number = 8) {
    const today = new Date()
    getDateList(year, month).forEach((date: Date, index: number) => {
      const $dateCell = this.$dateCells[index]
      $dateCell.classList.remove(CALENDAR_CLASS.OTHER_MONTH)
      $dateCell.classList.remove(CALENDAR_CLASS.TODAY)

      const $date = <HTMLDivElement>(
        $dateCell.querySelector(`.${CALENDAR_CLASS.DATE}`)
      )
      const dateValue = date.getDate().toString()
      $date.innerText = dateValue
      $dateCell.dataset.date = dateValue

      if (date.getMonth() + 1 !== month) {
        $dateCell.classList.add(CALENDAR_CLASS.OTHER_MONTH)
      } else if (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      ) {
        $dateCell.classList.add(CALENDAR_CLASS.TODAY)
      }
    })
  }

  setDateEarning(dateEarningObj) {
    console.log(dateEarningObj)
    for (let key in dateEarningObj) {
      const $dateCell = this.query(
        `.${CALENDAR_CLASS.DATE_CELL}:not(.${CALENDAR_CLASS.OTHER_MONTH})[data-date='${key}']`
      )
      console.log($dateCell)
      const $earningSum = <HTMLDivElement>(
        $dateCell.querySelector(`.${CALENDAR_CLASS.EARNING_SUM}`)
      )
      $earningSum.innerText = `+${dateEarningObj[key]}`
      $earningSum.classList.remove(CLASS.HIDDEN)
    }
  }

  setDateSpending(dateSpendingObj) {
    for (let key in dateSpendingObj) {
      const $dateCell = this.query(
        `.${CALENDAR_CLASS.DATE_CELL}:not(.${CALENDAR_CLASS.OTHER_MONTH})[data-date='${key}']`
      )
      const $spendingSum = <HTMLDivElement>(
        $dateCell.querySelector(`.${CALENDAR_CLASS.SPENDING_SUM}`)
      )
      $spendingSum.innerText = `-${dateSpendingObj[key]}`
      $spendingSum.classList.remove(CLASS.HIDDEN)
    }
  }

  setEarningVisible(isClicked: boolean) {
    const $earningSums = Array.from(
      this.queryAll(`.${CALENDAR_CLASS.EARNING_SUM}`)
    )

    if (isClicked) {
      $earningSums.forEach(($earningSum) =>
        $earningSum.classList.remove(CLASS.HIDDEN)
      )
      return
    }
    $earningSums.forEach(($earningSum) =>
      $earningSum.classList.add(CLASS.HIDDEN)
    )
  }

  setSpendingVisible(isClicked: boolean) {
    const $spendingSums = Array.from(
      this.queryAll(`.${CALENDAR_CLASS.SPENDING_SUM}`)
    )

    if (isClicked) {
      $spendingSums.forEach(($spendingSum) =>
        $spendingSum.classList.remove(CLASS.HIDDEN)
      )
      return
    }
    $spendingSums.forEach(($spendingSum) =>
      $spendingSum.classList.add(CLASS.HIDDEN)
    )
  }

  clear() {
    const $earnings = <HTMLDivElement[]>(
      Array.from(this.queryAll(`.${CALENDAR_CLASS.EARNING_SUM}`))
    )
    $earnings.forEach(($earning) => {
      $earning.innerText = ''
    })

    const $spendings = <HTMLDivElement[]>(
      Array.from(this.queryAll(`.${CALENDAR_CLASS.SPENDING_SUM}`))
    )
    $spendings.forEach(($spending) => {
      $spending.innerText = ''
    })
  }
}
