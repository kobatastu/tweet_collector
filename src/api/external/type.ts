type queryType = {
  year: number;
  month: number;
  date: number;
};

export const isRequestQuery = (obj: unknown): obj is queryType => {
  try {
    const t = obj as queryType;
    const { year, month, date } = t;
    if (typeof year === 'number' && typeof month === 'number' && typeof date === 'number') {
      return true;
    }
    return false;
  } catch {
    return false;
  }
};
