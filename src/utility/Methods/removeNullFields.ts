export default function removeNullFields<T>(obj: T): T {
  const result: Record<string, unknown> = {};

  for (const key in obj) {
    if (obj[key] !== null) {
      result[key] = obj[key];
    }
  }

  return result as T;
}
