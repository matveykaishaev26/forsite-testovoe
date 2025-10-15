export const filterKey = (event: KeyboardEvent, maxLength: number) => {
  const key = event.key;

  if (
    ["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight", "Enter"].includes(key) ||
    ((event.ctrlKey || event.metaKey) && ["a", "c", "v", "x"].includes(key))
  ) {
    return;
  }

  if (!/^\d$/.test(key)) {
    event.preventDefault();
  }

  if (maxLength && (event.target as HTMLInputElement).value.length >= maxLength) {
    event.preventDefault();
  }
};

export const normalizePhone = (value: string): string => {
  return value.replace(/\D/g, "").slice(0, 11); // только цифры, максимум 11
};

export const formatPhone = (value: string): string => {
  if (!value) return "";

  let formatted = "+7";
  if (value.length > 1) formatted += " (" + value.slice(1, 4);
  if (value.length >= 4) formatted += ") " + value.slice(4, 7);
  if (value.length >= 7) formatted += "-" + value.slice(7, 9);
  if (value.length >= 9) formatted += "-" + value.slice(9, 11);

  return formatted;
};
