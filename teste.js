function main(invoiceToRefund) {
  const INVOICE_STATUSES = () => {
    return JSON.parse(context.userData.constants).INVOICE_STATUSES;
  }

  const SCENARIOS = () => {
    return JSON.parse(context.userData.constants).REFUND_SCENARIOS;
  }

  const INVOICE_NON_PAYMENT_STATUSES = () => {
    return JSON.parse(context.userData.constants).NON_PAYMENT_STATUSES;
  }

  const getScenario = (invoice) => {
    class UnmappedScenarioToInvoice extends Error {
      constructor(message) {
        super(message);
        this.name = 'UnmappedScenarioToInvoice';
      }
    }

    if (_checkIfItsAnNonPaymentStatus(invoice.status.id)) {
      return SCENARIOS().INVOICES_UNPAID;
    }

    if (_checkIfItsAnFreeStatus(invoice.invoice.value, invoice.status.id)) {
      return SCENARIOS().INVOICES_FREE;
    }

    switch (invoice.status.id) {
      case INVOICE_STATUSES().INVOICES_REFUNDED:
        return SCENARIOS().INVOICES_REFUNDED;
      case INVOICE_STATUSES().INVOICE_WAITING_REFUND:
        return SCENARIOS().INVOICES_WAITING_REFUND;
      default:
        break;
    }

    const checkPslScenario = _checkInvoicePsl(invoice);
    if (checkPslScenario) {
      return checkPslScenario;
    }

    const checkContractScenario = _checkInvoiceIsInsideContract(invoice);
    if (checkContractScenario) {
      return checkContractScenario;
    }

    const checkPaidScenario = _checkInvoiceIsPaid(invoice);
    if (checkPaidScenario) {
      return checkPaidScenario;
    }

    throw new UnmappedScenarioToInvoice(
      'Fatura não se encaixa nos cenários existentes'
    );
  }

  const _checkIfItsAnNonPaymentStatus = (invoiceStatusId) => {
    if (INVOICE_NON_PAYMENT_STATUSES().includes(invoiceStatusId)) {
      return true;
    }

    return false;
  }

  const _checkIfItsAnFreeStatus = (invoiceValue, invoiceStatusId) => {
    if (invoiceValue === 0 || invoiceStatusId === INVOICE_STATUSES().TRIAL) {
      return true;
    }

    return false;
  }

  const _checkInvoicePsl = (invoiceObj) => {
    if (invoiceObj.psl.installments) {
      if (_checkDeadlineWithNow(invoiceObj.products[0].refund_deadline)) {
        return SCENARIOS().INVOICES_PSL_IN_DEADLINE;
      }
      return SCENARIOS().INVOICES_PSL_OUT_DEADLINE;
    }
    return false;
  }

  const _checkInvoiceIsInsideContract = (invoiceObj) => {
    if (invoiceObj.contract.id && !invoiceObj.psl.installments) {
      if (_checkDeadlineWithNow(invoiceObj.products[0].refund_deadline)) {
        return SCENARIOS().INVOICES_WITH_CONTRACT_AND_IN_DEADLINE;
      }
      return SCENARIOS().INVOICES_WITH_CONTRACT_AND_OUT_DEADLINE;
    }
    return false;
  }

  const _checkInvoiceIsPaid = (invoiceObj) => {
    if (invoiceObj.status.id === INVOICE_STATUSES().PAID) {
      if (_checkDeadlineWithNow(invoiceObj.products[0].refund_deadline)) {
        return SCENARIOS().INVOICES_PAID_IN_DEADLINE;
      }
      return SCENARIOS().INVOICES_PAID_OUT_DEADLINE;
    }
    return false;
  }

  const _checkDeadlineWithNow = (invoiceRefundDeadline) => {
    const moment = require('moment');
    class InvalidDate extends Error {
      constructor(message) {
        super(message);
        this.name = 'InvalidDate';
      }
    }

    if (!moment(invoiceRefundDeadline).isValid()) {
      throw new InvalidDate('refund_deadline não é uma data válida');
    }

    const dateNow = moment().format();

    if (moment(dateNow, 'YYYY-MM-DD').isBefore(invoiceRefundDeadline, 'YYYY-MM-DD')) {
      return true;
    }

    return false;
  }

  return getScenario(invoiceToRefund);
}