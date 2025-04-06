"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  Heading,
  Text,
  Center,
} from "@chakra-ui/react";
import { createClient } from "../utils/supabase/client";

type Category = { id: string; name: string };

export default function EventPage() {
  const supabase = createClient();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name");
      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        setCategories(data || []);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const title = formData.get("title") as string;
    const longitude = Number(formData.get("longitude"));
    const latitude = Number(formData.get("latitude"));
    const description = formData.get("description") as string;
    const sponsor = formData.get("sponsor") as string;
    const picture = formData.get("picture") as string;
    const categoryId = (formData.get("category") as string) || null;

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("User not found:", userError);
      return;
    }

    const host = user.id;
    const time = new Date().toISOString();

    const { error: insertError } = await supabase.from("events").insert([
      {
        title,
        longitude,
        latitude,
        description: description || "No description available",
        sponsor,
        picture,
        category_id: categoryId,
        host,
        time,
      },
    ]);

    if (insertError) {
      console.error("Error inserting event:", insertError);
    } else {
      console.log("Event created successfully!");
    }
  };

  return (
    <Center minH="100vh" bg="blue.50" px={4}>
      <Box
        bg="white"
        p="32px"
        borderRadius="xl"
        boxShadow="xl"
        width="100%"
        maxW="400px"
      >
        <Heading fontSize="2xl" color="blue.700" mb={2} textAlign="center">
          Submit Your Event Info
        </Heading>
        <Text fontSize="sm" color="gray.600" mb={6} textAlign="center">
          Enter your event details and location.
        </Text>

        <form onSubmit={handleSubmit}>
          <Box mb="16px">
            <Text fontSize="sm" color="gray.600" mb="6px" fontWeight="medium">
              Event Title:
            </Text>
            <Input
              name="title"
              type="text"
              required
              borderColor="blue.200"
              _focus={{ borderColor: "blue.500", boxShadow: "none" }}
            />
          </Box>

          <Box mb="16px">
            <Text fontSize="sm" color="gray.600" mb="6px" fontWeight="medium">
              Location Longitude:
            </Text>
            <Input
              name="longitude"
              type="text"
              required
              borderColor="blue.200"
              _focus={{ borderColor: "blue.500", boxShadow: "none" }}
            />
          </Box>

          <Box mb="16px">
            <Text fontSize="sm" color="gray.600" mb="6px" fontWeight="medium">
              Location Latitude:
            </Text>
            <Input
              name="latitude"
              type="text"
              required
              borderColor="blue.200"
              _focus={{ borderColor: "blue.500", boxShadow: "none" }}
            />
          </Box>

          <Box mb="16px">
            <Text fontSize="sm" color="gray.600" mb="6px" fontWeight="medium">
              Description:
            </Text>
            <Input
              name="description"
              type="text"
              borderColor="blue.200"
              _focus={{ borderColor: "blue.500", boxShadow: "none" }}
            />
          </Box>

          <Box mb="16px">
            <Text fontSize="sm" color="gray.600" mb="6px" fontWeight="medium">
              Event Sponsor:
            </Text>
            <Input
              name="sponsor"
              type="text"
              borderColor="blue.200"
              _focus={{ borderColor: "blue.500", boxShadow: "none" }}
            />
          </Box>

          <Box mb="16px">
            <Text fontSize="sm" color="gray.600" mb="6px" fontWeight="medium">
              Picture (URL):
            </Text>
            <Input
              name="picture"
              type="text"
              borderColor="blue.200"
              _focus={{ borderColor: "blue.500", boxShadow: "none" }}
            />
          </Box>

          <Box mb="24px">
            <Text fontSize="sm" color="gray.600" mb="6px" fontWeight="medium">
              Category:
            </Text>
            <select
              name="category"
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                fontSize: "0.875rem",
                borderRadius: "6px",
                border: "1px solid #bee3f8", // blue.200
                outline: "none",
              }}
              onFocus={(e) =>
                (e.currentTarget.style.border = "1px solid #3182ce")
              }
              onBlur={(e) =>
                (e.currentTarget.style.border = "1px solid #bee3f8")
              }
            >
              <option value="">-- Select a category --</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </Box>

          <Button
            type="submit"
            bg="blue.500"
            color="white"
            px="20px"
            py="8px"
            _hover={{ bg: "blue.600" }}
            borderRadius="md"
            fontWeight="medium"
            width="100%"
          >
            Submit
          </Button>
        </form>
      </Box>
    </Center>
  );
}
