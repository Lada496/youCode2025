
"use client"
import { Box, Button, Input, Textarea, VStack, Heading, Card, Stack, Field } from '@chakra-ui/react'

export default function Home() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const title = formData.get('title') as string
        const longitude = Number(formData.get('longitude'))
        const latitude = Number(formData.get('latitude'))
        const host = formData.get('host') as string
        const sponsor = formData.get('sponsor') as string
        const picture = new URL(formData.get('picture') as string)

        console.log({ title, longitude, latitude, host, sponsor, picture })
    }

    return (
        <Box maxW="sm" mx="auto" mb={20} mt={10} p={6} borderWidth={1} borderRadius="lg">
            <Heading mb={4} textAlign="center" size="md">Submit Your Event Info</Heading>
            <form onSubmit={handleSubmit}>
                <VStack gap={4}>
                    <Field.Root gap={1}>
                        <Field.Label>Event Title</Field.Label>
                        <Input size="sm" name="title" />
                    </Field.Root>
                    <Field.Root gap={1}>
                        <Field.Label>Location Longitude</Field.Label>
                        <Input size="sm" name="longitude" />
                    </Field.Root>
                    <Field.Root gap={1}>
                        <Field.Label>Location Latitude</Field.Label>
                        <Input size="sm" name="latitude" />
                    </Field.Root>
                    <Field.Root gap={1}>
                        <Field.Label>Event Host</Field.Label>
                        <Input size="sm" name="host" />
                    </Field.Root>
                    <Field.Root gap={1}>
                        <Field.Label>Event Sponsor</Field.Label>
                        <Input size="sm" name="sponsor" />
                    </Field.Root>
                    <Field.Root gap={1}>
                        <Field.Label >Picture! (URL)</Field.Label>
                        <Input size="sm" name="picture" />
                    </Field.Root>
                    <Button size="sm" type="submit" colorScheme="blue" width="full">
                        Submit
                    </Button>
                </VStack>
            </form>
        </Box>
    )
}