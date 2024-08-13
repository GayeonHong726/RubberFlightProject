import { Box, Flex, Grid, Img, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Spacer, Stack, Text, useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { StarRating, TotalStarRating } from '../../../member/review/components/Rating';
import styles from '../css/AirLineReviewItem.module.css';
import { motion } from 'framer-motion';
import { Image, GridItem } from '@chakra-ui/react'
import Flight from "../../../assets/images/review/top1.webp";
import Stamp from "../../../assets/images/review/stamp.webp";

const AirlineReviewItem = ({review}) => {
  useEffect(() => {
    document.body.style.boxSizing = "border-box";
  });

  const totalRate = ((review.seat_rate + review.service_rate + review.procedure_rate
     + review.flightmeal_rate + review.lounge_rate + review.clean_rate) / 6).toFixed(1);
  
  const {onOpen, isOpen, onClose} = useDisclosure(); 
  const MotionBox = motion(Box);

    return (
        <>
          <MotionBox
            key={review.id} onClick={onOpen}
            initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            whileHover={{ scale: 1.02 }} exit={{ opacity: 0 }} 
            transition={{ default: { duration: 0.5 }, scale: { duration: 0.3 }, paddingBottom: { duration: 0.1 } }}
            position="relative"
            style={{ 
              maxWidth: '750px', minWidth: '750px', 
              margin: 'auto', width: '90%', height: '200px',
              borderWidth: '1px', borderRadius: '20px',
              padding: '16px',
              marginBottom: '40px',
              marginTop: '40px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              backgroundColor: 'white', cursor: 'pointer',
              transition: 'background-color 0.3s ease, transform 0.3s ease'
            }}
          >
            <Grid
              templateAreas={`"header header" "nav main" "nav footer"`}
              gridTemplateRows={'50px 40px 1fr'}
              gridTemplateColumns={'120px 1fr'}
              h='100%' gap='1' color='blackAlpha.700' fontWeight='bold'>
              <GridItem pl='3' mt='1 ' area={'header'}>
                <Flex>
                  <div><img src={Flight} className={styles.top}/></div>
                  <div className={styles.airlinename}>{review.airline.name}</div>
                  <Spacer/>
                  <div className={styles.writeDate}>
                  {new Date(review.date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d{1,2})\.$/, '$1')}</div>
                </Flex>
              </GridItem>
              <GridItem pl='2' area={'nav'}>
                <div className={styles.profileCon}>
                  <div className={styles.userImg}><Image src={review.flightInfo.reserve.user.image} className={styles.proFile}/></div>
                  <div className={styles.username}>{review.flightInfo.reserve.user.name}</div>
                </div>
              </GridItem>
              <GridItem pl='2' area={'main'}>
                <Flex>
                  <div className={styles.airlinerate}><TotalStarRating rate={totalRate} className={styles.stars}/></div>
                  <div className={styles.totalscore}>({totalRate})</div>
                </Flex>
              </GridItem>
              <GridItem pl='2' area={'footer'}>
                <div className={styles.cardtitle}>"{review.title}"</div>
              </GridItem>
            </Grid>          
          </MotionBox>

          <Modal isOpen={isOpen} onClose={onClose} size='3xl' isCentered>
            <ModalOverlay/>
            <ModalContent>
              <ModalCloseButton size='m' m={3} _hover='none'/>
              <ModalBody p='40px' >
                <div className={styles.writedate}>작성일:&nbsp;&nbsp;&nbsp;
                {new Date(review.date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d{1,2})\.$/, '$1')}</div>
                <div><img src={Stamp} className={styles.stamp}/></div>
                <Flex>
                <div className={styles.reviewtitle}>"{review.title}"</div>
                </Flex>  
                <hr className={styles.line}/>
                <Grid templateColumns='repeat(3, 1fr)' gap={4}>
                  <div className={styles.boarding}>
                  <div className={styles.subtitle}>Rate</div>
                  <div className={styles.reviewRate}><StarRating rate={totalRate} /></div>
                  <div className={styles.totalRate}>({totalRate})</div>
                  </div>
                  <div className={styles.boarding}>
                    <div className={styles.subtitle}>Airline</div>
                    <div className={styles.airlineName}>{review.flightInfo.airlineName}</div>
                  </div>
                  <div className={styles.boarding}>
                    <div className={styles.subtitle}>Date</div>
                    <div className={styles.boardingdate}>
                    {new Date(review.flightInfo.depSch).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d{1,2})\.$/, '$1')}
                    </div>
                  </div>    
                </Grid>
                <hr className={styles.line2}/>
                <div className={styles.reviewBody}>
                  {review.content && <div className={styles.content}>{review.content}</div>}
                  <div className={styles.rateBody}>
                    <Flex>
                      <Flex pl='67px' mb={5} gap='50px'>
                        <Text mr={3} fontFamily="PTBandocheB">라운지 :</Text>
                        <div className={styles.starRate}><StarRating rate={review.lounge_rate} /></div>
                      </Flex>
                      <Flex pl={10} ml='50px' mb={5} gap='40px'>
                      <Text mr={3} fontFamily="PTBandocheB">체크인 및 탑승 :</Text>
                        <div className={styles.starRate}><StarRating rate={review.procedure_rate} /></div>
                      </Flex>
                    </Flex>
                    <Flex>
                      <Flex pl='67px' mb={5} gap='50px'>
                        <Text mr={3} fontFamily="PTBandocheB">청결도 :</Text>
                        <div className={styles.starRate}><StarRating rate={review.clean_rate} /></div>
                      </Flex>
                      <Flex pl={10} mb={5} ml='50px' gap='5px'>
                        <Text mr={3} fontFamily="PTBandocheB">좌석 공간 및 편안함 :</Text>
                        <div className={styles.starRate}><StarRating rate={review.seat_rate} /></div>
                      </Flex>
                    </Flex>
                    <Flex>
                      <Flex pl='67px' mb={5} gap='15px'>
                        <Text mr={3} fontFamily="PTBandocheB">기내 서비스 :</Text>
                        <div className={styles.starRate}><StarRating rate={review.service_rate} /></div>
                      </Flex>
                      <Flex pl={10} mb={5} ml='50px' gap='40px'>
                        <Text mr={3} fontFamily="PTBandocheB">기내식 및 음료 :</Text>
                        <div className={styles.starRate}><StarRating rate={review.flightmeal_rate} /></div>
                      </Flex>
                    </Flex>
                  </div>
                </div>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
    );
};

export default AirlineReviewItem;