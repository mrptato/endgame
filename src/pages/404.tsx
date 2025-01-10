import { Box, Heading, Text, Button, VStack, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function NotFound() {
  const router = useRouter();

  return (
    <Box 
      minH="100vh" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      bg="gray.50"
    >
      <VStack spacing={6} p={8} bg="white" borderRadius="xl" boxShadow="lg">
        <Heading size="2xl">404</Heading>
        <Text fontSize="xl" color="gray.600" textAlign="center">
          Oops! We couldn't find the page you're looking for
        </Text>
        <Text color="gray.500" fontSize="md">
          The URL {router.asPath} doesn't exist
        </Text>
        <Button 
          colorScheme="blue" 
          size="lg"
          onClick={() => router.push("/")}
        >
          Back to Store
        </Button>
      </VStack>
    </Box>
  );
} 