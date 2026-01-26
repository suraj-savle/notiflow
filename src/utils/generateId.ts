let counter = 0;

export function generateId(prefix = "toast") {
  counter += 1;
  return `${prefix}-${Date.now()}-${counter}`;
}
