import { countries } from "../const";

export default function getCountryLabel(countryValue: string) {
  const country = countries.find((c) => c.value === countryValue);
  return country ? country.label : "Country not found";
}
