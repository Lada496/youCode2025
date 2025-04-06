import Image from "next/image";
import styles from "./page.module.css";
import {Heading, Highlight, Stack, Center, Box, Image as ChakraImage, Text} from "@chakra-ui/react"


export default function Home() {
  return (
    <Box  bg="#4299E1" h="100vh" overflow = "hidden" p={8}>
        <Center>
        <Box p = {40}>
        <Stack gap = "10">
        <Stack direction="row" h="20" align = "center" gap = "4">
      <Heading size="6xl" color = "white" letterSpacing="tight">
          Summit Circle
      </Heading>
    <ChakraImage
            src="/mountain.svg"
            alt="mountain logo"
            w = "36"
            h= "36"
            />
    </Stack>
    <Text fontSize="2xl" color="white">
        Turning activities into communities
      </Text>
    </Stack>
    </Box>
    
        </Center>
        </Box>
    
  );
}

