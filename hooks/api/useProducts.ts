import { useState, useEffect } from "react";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://api.homiesandfamily.com/api/product");
        const data = await response.json();

        // Agregar cantidad inicial a cada producto
        const productsWithQuantity = data.map((product: any) => ({
          ...product,
          quantity: 1,
        }));

        setProducts(productsWithQuantity);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || "Error al obtener productos.");
        } else {
          setError("Error al obtener productos.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}
