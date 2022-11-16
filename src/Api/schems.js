export const Schems = {
  PRODUCT_SCHEMA: `
    {
      category{
        products{id,name,inStock,gallery,prices{amount,currency{label,symbol}},category},
      }
      }
   `,

  CATEGORIES: `{
    categories{
     name
   }
   }`,

  CURRENCIES: `
   {
    currencies{
      symbol,label
    }
   }`,

  PRODUCT: (id) => {
    return `{
       product(id:"${id}"){
        id,name,gallery,description,brand,inStock,attributes{id,name,type,items{displayValue,id,value}},prices{
          currency{label,symbol},amount
        }
    }
  }`;
  },
};
