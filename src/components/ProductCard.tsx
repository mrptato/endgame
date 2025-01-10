import {
  Box,
  VStack,
  Image,
  Text,
  Heading,
  Flex,
  Badge,
  Button,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Product } from "../types";
import useCartStore from "../store/useCartStore";
import { TOAST_DURATION } from '../constants';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  const toast = useToast();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const stockColor = product.inStock > 0 ? "green" : "red";

  const cartItem = items.find(item => item.id === product.id);
  const quantityInCart = cartItem?.quantity || 0;
  const remainingStock = product.inStock - quantityInCart;
  const isOutOfStock = remainingStock <= 0;

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
      status: "success",
      duration: TOAST_DURATION,
      isClosable: true,
      position: "bottom-right",
    });
  };

  return (
    <Box
      role="article"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' && !isOutOfStock) {
          handleAddToCart();
        }
      }}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={bgColor}
      borderColor={borderColor}
      boxShadow="md"
      transition="all 0.3s"
      opacity={isOutOfStock ? 0.6 : 1}
      w="full"
      h="full"
      _hover={{
        transform: isOutOfStock ? "none" : "scale(1.02)",
        boxShadow: isOutOfStock ? "md" : "lg",
      }}
    >
      <Box position="relative" h="220px">
        <Image
          src={product.image}
          alt={product.name}
          objectFit="cover"
          w="full"
          h="full"
          filter={isOutOfStock ? "grayscale(100%)" : "none"}
        />
        {isOutOfStock && (
          <Flex
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            bg="blackAlpha.700"
            color="white"
            px={4}
            py={2}
            borderRadius="md"
            fontWeight="bold"
          >
            Out of Stock
          </Flex>
        )}
      </Box>
      <VStack spacing={3} p={4} align="stretch">
        <Heading size="md">{product.name}</Heading>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontWeight="bold" fontSize="lg">
            ${product.price.toFixed(2)}
          </Text>
          <Badge colorScheme={stockColor} variant="solid">
            {remainingStock > 0
              ? `${remainingStock} available`
              : "Out of Stock"}
          </Badge>
        </Flex>
        <Button
          size="md"
          colorScheme="blue"
          onClick={handleAddToCart}
          isDisabled={isOutOfStock}
          opacity={isOutOfStock ? 0.5 : 1}
        >
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      </VStack>
    </Box>
  );
};
