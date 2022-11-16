export const fetchData = async (schema, endpoint) => {
  const respoce = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: schema }),
  });

  if (!respoce.ok) {
    return;
  }
  const data = await respoce.json();
  return data;
};
