export default function formatCurrency(num) {
  return 'BDT ' + Number(num.toFixed(1)).toLocaleString() + ' TK ';
}
