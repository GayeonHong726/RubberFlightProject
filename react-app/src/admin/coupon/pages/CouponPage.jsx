import React from 'react';
import CouponForm from '../components/CouponForm';
import CouponList from '../components/CouponList';
import { Box, Flex, Heading } from '@chakra-ui/react';

const CouponPage = () => {
    return (
        <Box 
            bg="#dde6f5d7" 
            minHeight="100vh" 
            p={5} 
            margin="0 auto" 
        >
            <Box margin="0 auto" width="50%"  >
                <Flex direction="column" align="flex-start">
                        <Heading as="h1" size="xl" mb={5}>Coupon</Heading>
                    <Flex direction="row" width="100%">
                        <CouponForm />
                        <CouponList />
                    </Flex>
                </Flex>
            </Box>
        </Box>
    );
};

export default CouponPage;
