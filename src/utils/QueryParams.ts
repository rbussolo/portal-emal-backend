function queryParamToInt(queryParam: any): number {
  const result = parseInt(queryParam as string);

  if (isNaN(result)) {
    return 0;
  }

  return result;
}

// Format convert (yyyy-mm-dd)
function queryParamToDate(queryParam: any): Date | undefined {
  const result = Date.parse(queryParam as string);

  if (isNaN(result)) {
    return undefined;
  }

  return new Date(result);
}

function queryParamToBoolean(queryParam: any): boolean {
  return queryParam == 'true';
}

export { queryParamToInt, queryParamToDate, queryParamToBoolean };