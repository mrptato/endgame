import {
  VStack,
  Text,
  Heading,
  Box,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import useCartStore from "../store/useCartStore";
import { CartItem } from "./CartItem";

const MotionBox = motion(Box);

// show cart on the right side
export const CartDisplay = () => {
  const { items, total, removeItem, updateQuantity } = useCartStore();

  return (
    // fixed position on the right
    <Box
      position="fixed"
      right={0}
      top={0}
      bottom={0}
      w="25%"
      bg="white"
      boxShadow="-4px 0 6px rgba(0, 0, 0, 0.1)"
      p={4}
      overflowY="auto"
    >
      <VStack spacing={4} align="stretch">
        <Heading size="md">Shopping Cart</Heading>
        <Divider />
        
        // empty or show items + total
        <AnimatePresence>
          {items.length > 0 ? (
            <>
              {items.map((item) => (
                <CartItem 
                  key={item.id} 
                  item={item}
                  onRemove={removeItem}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
              <Divider />
              <Flex justify="space-between" fontWeight="bold">
                <Text>Total:</Text>
                <Text>${total.toFixed(2)}</Text>
              </Flex>
            </>
          ) : (
            // show empty message
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Text color="gray.500">Your cart is empty</Text>
            </MotionBox>
          )}
        </AnimatePresence>
      </VStack>
    </Box>
  );
}; 