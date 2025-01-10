import { SimpleGrid, VStack, Heading, Text, Center, Container, Box } from "@chakra-ui/react";
import { Product } from "../types";
import { ProductCard } from "./ProductCard";
import { SortToolbar } from "./SortToolbar";
import { useProductFilters } from "../hooks/useProductFilters";

interface ProductListProps {
  products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
  const {
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    filteredAndSortedProducts,
  } = useProductFilters(products);

  return (
    <VStack spacing={8} w="full">
      <Heading as="h1" size="2xl" textAlign="center" mb={6}>
        Grocery Store Inventory
      </Heading>
      
      <SortToolbar 
        onSortChange={setSortBy} 
        currentSort={sortBy}
        onSearchChange={setSearchQuery}
        searchValue={searchQuery}
      />
      
      <Container maxW="container.xl" centerContent>
        {filteredAndSortedProducts.length > 0 ? (
          <SimpleGrid 
            columns={{ base: 1, md: 2, lg: 3 }} 
            spacing={8} 
            justifyItems="center"
            w="full"
          >
            {filteredAndSortedProducts.map((product) => (
              <Box key={product.id} w="full" maxW="320px">
                <ProductCard product={product} />
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <Center py={8}>
            <VStack spacing={3}>
              <Text fontSize="xl" color="gray.500">
                No products found
              </Text>
              {searchQuery && (
                <Text color="gray.400">
                  No results for "{searchQuery}"
                </Text>
              )}
            </VStack>
          </Center>
        )}
      </Container>
    </VStack>
  );
}; 