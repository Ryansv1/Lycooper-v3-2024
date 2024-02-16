import { Grid, Flex, GridItem, Heading} from '@chakra-ui/react'
import { verify } from 'crypto';
import dynamic from 'next/dynamic';

const DynamicGraphical = dynamic(() => import('@/components/chart'), { ssr: false })


export default function Sensores ({params} : { params : { slug: string } }) {

    const sensor = {
        name: 'Temperatura',
    }

    function verifyTemp(){
        if(1 > 0){
            return 'normal'
        }else{
            return 'anormal'
        }
    }

    return (
        <>
        <Grid className="text-white min-h-screen relative pt-28 bg-blue-900 grid-cols-1 grid-flow-row">
            <h1 className=" text-sm relative text-center text-white z-10 mt-4">Sensor {sensor.name}</h1>
            <Grid className="rounded-md m-4 p-4 grid-cols-1 sm:grid-cols-2 gap-4">
                <GridItem className="bg-green-400 rounded-md flex flex-col justify-center items-center">
                    <DynamicGraphical className="m-2" />
                </GridItem>
                <GridItem className="bg-green-400 rounded-md flex flex-col justify-center items-center">
                    <Flex>
                        <Heading className="text-white">Temperatura está {verifyTemp()}</Heading>
                        {params.slug}
                    </Flex>
                </GridItem>
            </Grid>
            <Grid className="rounded-md m-4 p-4 grid-cols-1 sm:grid-cols-2 gap-4">
                <GridItem className="bg-green-400 rounded-md flex flex-col justify-center items-center">
                    <DynamicGraphical className="m-2" />
                </GridItem>
                <GridItem className="bg-green-400 rounded-md flex flex-col justify-center items-center">
                    <DynamicGraphical className="m-2" />
                </GridItem>
            </Grid>
        </Grid>
        </>
    )
}