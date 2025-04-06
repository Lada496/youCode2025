import { Box, Button, Text, Flex, Image } from "@chakra-ui/react";

interface EventProps {
  title: string;
  description: string;
  picture: string;
}

const EventCard = ({ title, description, picture }: EventProps) => {
  const fallbackInitial = title.charAt(0).toUpperCase();

  return (
    <Box
      style={{
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        border: "1px solid #3182ce",
        width: "100%",
        maxWidth: "400px",
        padding: "16px",
        marginBottom: "16px",
      }}
    >
      <Flex gap="16px" align="flex-start">
        {/* Image or Fallback */}
        {picture ? (
          <Image
            src={picture}
            alt={title}
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        ) : (
          <Box
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "#E2E8F0",
              color: "#4A5568",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {fallbackInitial}
          </Box>
        )}

        {/* Event Info */}
        <Box flex="1">
          <Text
            style={{
              fontWeight: "bold",
              fontSize: "16px",
              color: "#2B6CB0", // blue.700
              marginBottom: "4px",
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontSize: "14px",
              color: "#718096", // gray.500
            }}
          >
            {description || "No description available"}
          </Text>
        </Box>
      </Flex>

      {/* Buttons */}
      <Flex justify="flex-end" gap="8px" marginTop="16px">
        <Button
          style={{
            border: "1px solid #90CDF4", // blue.300
            color: "#3182ce", // blue.500
            background: "white",
            padding: "6px 16px",
            fontSize: "14px",
            fontWeight: "500",
            borderRadius: "6px",
          }}
          _hover={{
            backgroundColor: "#ebf8ff",
            borderColor: "#3182ce",
          }}
        >
          View
        </Button>
        <Button
          style={{
            backgroundColor: "#3182ce",
            color: "white",
            padding: "8px 20px",
            fontSize: "14px",
            fontWeight: "500",
            borderRadius: "6px",
          }}
          _hover={{
            backgroundColor: "#2b6cb0",
          }}
        >
          RSVP
        </Button>
      </Flex>
    </Box>
  );
};

export default EventCard;
