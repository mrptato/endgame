import { Container, Box } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { ProductList } from "../components/ProductList";
import { CartDisplay } from "../components/CartDisplay";
import { Product } from "../types";
import inventoryData from "../data/inventory.json";

interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  return (
    <Box display="flex">
      <Box flex="3" pr="25%">
        <Container maxW="container.xl" py={8}>
          <ProductList products={products} />
        </Container>
      </Box>
      <CartDisplay />
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      products: inventoryData.products,
    },
  };
};
