'use client'

import { Flex, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function FormLoginComponent(){
    const { register, handleSubmit } = useForm();
    const [ data, setData ] = useState("");

    return(
        <Flex className="flex flex-col gap-8">
            <h1 className="text-md">{formTitle}</h1>
            <form>          
                <FormControl isRequired>
                    <FormLabel>E-mail</FormLabel>
                    <Input placeholder="ex: user@domain.com" variant="filled" _placeholder={{ opacity: 1, color: 'gray.600' }} type="email" name="userEmail"/>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Senha</FormLabel>
                    <Input placeholder="Sua senha" variant="filled" _placeholder={{ opacity: 1, color: 'gray.600' }} type="password" name="userPassword"/>
                </FormControl>
                <Button className="mt-8 animate-pulse" type="submit">Login</Button>
            </form>
        </Flex>
    )
}


/*<Flex className="flex flex-col gap-8">
<h1 className="text-md">Faça seu Login</h1>
<form action="http://localhost:3000/api/auth/login" method="POST" className="space-y-4" name="userData">
    <FormControl isRequired>
        <FormLabel>E-mail</FormLabel>
        <Input placeholder="ex: user@domain.com" variant="filled" _placeholder={{ opacity: 1, color: 'gray.600' }} type="email" name="userEmail"/>
    </FormControl>
    <FormControl isRequired>
        <FormLabel>Senha</FormLabel>
        <Input placeholder="Sua senha" variant="filled" _placeholder={{ opacity: 1, color: 'gray.600' }} type="password" name="userPassword"/>
    </FormControl>
    <Button className="mt-8 animate-pulse" type="submit">Login</Button>
</form>
</Flex>