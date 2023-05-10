import { Box, Grid, Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import Bar from '../../../components/Bar';
import DataBox from '../../../components/DataBox';
import SideBar from '../SideBar';
import { DoughnutChart, LineChart } from './Charts';
import { useDispatch, useSelector } from 'react-redux';
import { getDashBoardStates } from '../../../redux/Actions/Admin';
import { useEffect } from 'react';
import Loader from '../../layout/Loader/Loader';

const Dashboard = () => {
  const dispatch = useDispatch();

  const {
    loading,

    stats,
    userCount,
    subscriptionCount,
    viewsCount,
    subscriptionPercentage,
    viewsPercentage,
    userPercentage,
    subscriptionProfit,
    userProfit,
    viewsProfit,
  } = useSelector(state => state.admin);

  useEffect(() => {
    // dispatch(getAllCourses())
    // if (error) {
    //   toast.error(error);
    //   dispatch({ type: 'clearError' });
    // }

    // if (message) {
    //   toast.success(message);
    //   dispatch({ type: 'clearMessage' });
    // }
    dispatch(getDashBoardStates());
  }, [dispatch]);
  return (
    <>
      <Grid
        minH={'100vh'}
        templateColumns={['1fr', '5fr 1fr']}
        css={{
          cursor: 'url(),default',
        }}
      >
        {loading || !stats ? (
          <Loader color="purple.500" />
        ) : (
          <>
            <Box boxSizing="border-box" py={'16'} px={['4', '0']}>
              <Text
                textAlign={'center'}
                opacity={0.5}
                children={`Last Change Was On ${
                  String(new Date(stats[11].createdAt)).split('G')[0]
                }`}
              />

              <Heading
                children={'Dashboard'}
                ml={['0', '16']}
                mb={'16'}
                textAlign={['center', 'left']}
              />

              <Stack
                direction={['column', 'row']}
                minH={'24'}
                justifyContent={'space-evenly'}
              >
                <DataBox
                  title={'Views'}
                  qty={viewsCount}
                  qtypercentage={viewsPercentage}
                  profit={viewsProfit}
                />
                <DataBox
                  title={'Users'}
                  qty={userCount}
                  qtypercentage={userPercentage}
                  profit={userProfit}
                />
                <DataBox
                  title={'Subscription'}
                  qty={subscriptionCount}
                  qtypercentage={subscriptionPercentage}
                  profit={subscriptionProfit}
                />
              </Stack>

              <Box
                m={['0', '16']}
                borderRadius={'lg'}
                p={['0', '16']}
                mt={['4', '16']}
                boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
              >
                <Heading
                  textAlign={['center', 'left']}
                  size={'md'}
                  children={'views Graph'}
                  pt={['8', '0']}
                  ml={['0', '16']}
                />

                {/* Line Graph Here */}
                <LineChart Views={stats.map(item  => item.views )} />
              </Box>

              <Grid templateColumns={['1fr', '2fr 1fr']}>
                <Box p={'4'}>
                  <Heading
                    textAlign={['center', 'left']}
                    size={'md'}
                    children={'Progress Bar'}
                    my={'8'}
                    ml={['0', '16']}
                  />

                  <Box>
                    <Bar profit={viewsProfit} title="Views" value={viewsPercentage} />
                    <Bar profit={userProfit} title="Users" value={userPercentage} />
                    <Bar profit={subscriptionProfit} title="Subscription" value={subscriptionPercentage} />
                  </Box>
                </Box>
                <Box p={['0', '16']} boxSizing="border-box" py={'4'}>
                  <Heading
                    textAlign={'center'}
                    size="md"
                    mb={'4'}
                    children="Users"
                  />

                  <DoughnutChart users={[subscriptionCount,userCount-subscriptionCount]}/>
                </Box>
              </Grid>
            </Box>
          </>
        )}
        <SideBar />
      </Grid>
    </>
  );
};

export default Dashboard;
