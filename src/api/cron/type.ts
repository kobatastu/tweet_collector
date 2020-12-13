type BodyType = {
  year: number;
  month: number;
  date: number;
};

export const isRequestBody = (obj: unknown): obj is BodyType => {
  try {
    const t = obj as BodyType;
    const { year, month, date } = t;
    if (typeof year === 'number' && typeof month === 'number' && typeof date === 'number') {
      return true;
    }
    return false;
  } catch {
    return false;
  }
};
