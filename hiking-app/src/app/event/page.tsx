"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Input, VStack, Heading, Field } from "@chakra-ui/react";
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

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("User not found:", userError);
      return;
    }

    const host = user.id;
    const time = new Date().toISOString(); // Or use a datetime picker if needed

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
      // Optionally reset form or redirect
    }
  };

  return (
    <Box
      maxW="sm"
      mx="auto"
      mb={20}
      mt={10}
      p={6}
      borderWidth={1}
      borderRadius="lg"
    >
      <Heading mb={4} textAlign="center" size="md">
        Submit Your Event Info
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack gap={4}>
          <Field.Root>
            <Field.Label>Event Title</Field.Label>
            <Input size="sm" name="title" />
          </Field.Root>
          <Field.Root>
            <Field.Label>Location Longitude</Field.Label>
            <Input size="sm" name="longitude" />
          </Field.Root>
          <Field.Root>
            <Field.Label>Location Latitude</Field.Label>
            <Input size="sm" name="latitude" />
          </Field.Root>
          <Field.Root>
            <Field.Label>Description</Field.Label>
            <Input size="sm" name="description" />
          </Field.Root>
          <Field.Root>
            <Field.Label>Event Sponsor</Field.Label>
            <Input size="sm" name="sponsor" />
          </Field.Root>
          <Field.Root>
            <Field.Label>Picture! (URL)</Field.Label>
            <Input size="sm" name="picture" />
          </Field.Root>

          <Field.Root>
            <Field.Label>Category</Field.Label>
            <select name="category">
              <option value="">-- Select a category --</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </Field.Root>

          <Button size="sm" type="submit" colorScheme="blue" width="full">
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
