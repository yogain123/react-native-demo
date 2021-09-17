const baseUrl = "https://bakesaleforgood.com/api";

export const getAllDeals = async () => {
  const response = await fetch(`${baseUrl}/deals`);
  const allDeals = response.json();
  return allDeals;
};

export const getSearchDeals = async (searchTerm) => {
  const response = await fetch(`${baseUrl}/deals?searchTerm=${searchTerm}`);
  const allDeals = response.json();
  return allDeals;
};

export const getSingleDeals = async (key) => {
  const response = await fetch(`${baseUrl}/deals/${key}`);
  const singleDeals = response.json();
  return singleDeals;
};
