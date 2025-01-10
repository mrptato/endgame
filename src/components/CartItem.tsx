import { Box, Flex, VStack, Text, Button, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { memo } from 'react';
import { Product } from "../types";

const MotionBox = motion(Box);

export const cartItemVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 }
};

interface CartItemProps {
  item: Product & { quantity: number };
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

export const CartItem = memo(({ item, onRemove, onUpdateQuantity }: CartItemProps) => {
  return (
    <MotionBox
      variants={cartItemVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2 }}
      p={2}
      borderWidth="1px"
      borderRadius="lg"
    >
      <Flex gap={3}>
        <Image
          src={item.image}
          alt={item.name}
          boxSize="50px"
          objectFit="cover"
          borderRadius="md"
        />
        <VStack align="stretch" flex={1}>
          <Flex justify="space-between">
            <Text fontWeight="bold">{item.name}</Text>
            <Text>${(item.price * item.quantity).toFixed(2)}</Text>
          </Flex>
          <Flex align="center" gap={2}>
            <Button
              size="xs"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              isDisabled={item.quantity <= 1}
            >
              -
            </Button>
            <Text>{item.quantity}</Text>
            <Button
              size="xs"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              isDisabled={item.quantity >= item.inStock}
            >
              +
            </Button>
            <Button
              size="xs"
              colorScheme="red"
              ml="auto"
              onClick={() => onRemove(item.id)}
            >
              Remove
            </Button>
          </Flex>
        </VStack>
      </Flex>
    </MotionBox>
  );
});

CartItem.displayName = 'CartItem'; 