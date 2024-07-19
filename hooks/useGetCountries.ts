import { useQuery } from "@tanstack/react-query";

export function useGetCountries() {
  return useQuery({
    queryKey: ["getContries"],
    queryFn: async () => {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const countries: country[] = await res.json();
      return countries;
    },
  });
}
