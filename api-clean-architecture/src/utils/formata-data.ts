import { format, parseISO, isValid } from 'date-fns';

export function formataISOParaBR(iso: string): string | null {
  const data = parseISO(iso);

  if (!isValid(data)) return null;

  return format(data, "dd/MM/yyyy");
}
